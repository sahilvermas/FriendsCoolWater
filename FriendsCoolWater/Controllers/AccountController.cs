using FriendsCoolWater.Email;
using FriendsCoolWater.Helpers;
using FriendsCoolWater.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FriendsCoolWater.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private UserManager<IdentityUser> _userManager { get; set; }
        private SignInManager<IdentityUser> _signInManager { get; set; }
        private readonly IEmailSender _emailSender;
        private readonly AppSettings _appSettings;

        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IOptions<AppSettings> appSettings,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _emailSender = emailSender;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel formData)
        {
            // Will hold all the errors
            List<string> errorList = new List<string>();

            var user = new IdentityUser
            {
                Email = formData.Email,
                UserName = formData.Username,
                SecurityStamp = Guid.NewGuid().ToString() // Look for any kind for changes in the model
            };

            var result = await _userManager.CreateAsync(user, password: formData.Password);
            if (result.Succeeded)
            {
                // Add new user as Customer Role always
                await _userManager.AddToRoleAsync(user, "Customer");

                // Sending Confirmation Email
                var confirmationCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                // Create the callback Url for the confirmation email
                var callbackUrl = Url.Action("ConfirmEmail", "Account",
                    new { userId = user.Id, confirmationCode = confirmationCode },
                    protocol: HttpContext.Request.Scheme);

                // Send email to user for confirmation
                await _emailSender.SendEmailAsync(user.Email, "Techhowdy.com - Confirm Your Email", "Please confirm your e-mail by clicking this link: <a href=\"" + callbackUrl + "\">click here</a>");

                return Ok(new { Username = user.UserName, Email = user.Email, Status = 1, Message = "Registration Successfull" });
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errorList.Add(error.Description);
                }
            }

            return BadRequest(new JsonResult(errorList));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel formData)
        {
            var user = await _userManager.FindByNameAsync(formData.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, formData.Password))
            {
                // THen Check If Email Is confirmed
                if (!await _userManager.IsEmailConfirmedAsync(user))
                {
                    ModelState.AddModelError(string.Empty, "User Has not Confirmed Email.");
                    return Unauthorized(new { LoginError = "We sent you an Confirmation Email. Please Confirm Your Registration With FriendsCoolWater.com To Log in." });
                }

                var roles = await _userManager.GetRolesAsync(user);
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                var tokenExpiryTime = Convert.ToDouble(_appSettings.ExpireTime);               

                // Generate JWT Token
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim( JwtRegisteredClaimNames.Sub, formData.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                        new Claim("LoggedOn", DateTime.Now.ToString())
                    }),
                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _appSettings.Site,
                    Audience = _appSettings.Audience,
                    Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime)

                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    expiration = token.ValidTo,
                    userName = user.UserName,
                    userRole = roles.FirstOrDefault()
                });
            }

            ModelState.AddModelError("", "Username/Password was not found");
            return Unauthorized(new { LoginError = "Please Check Login Credentials - Invalid Username/Password was entered" });
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string confirmationCode)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(confirmationCode))
            {
                ModelState.AddModelError("", "User Id and Confirmation Code are required");
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new JsonResult("ERROR");
            }

            if (user.EmailConfirmed)
            {
                return Redirect("/login");
            }

            var result = await _userManager.ConfirmEmailAsync(user, confirmationCode);
            if (result.Succeeded)
            {
                return RedirectToAction("EmailConfirmed", "Notifications", new { userId, confirmationCode });
            }
            else
            {
                List<string> errors = new List<string>();
                foreach (var error in result.Errors)
                {
                    errors.Add(error.ToString());
                }
                return new JsonResult(errors);
            }
        }
    }
}
