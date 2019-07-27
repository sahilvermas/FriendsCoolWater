using FriendsCoolWater.Helpers;
using FriendsCoolWater.Models;
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
        public object JwtRegisteredClaimName { get; private set; }

        private readonly AppSettings _appSettings;

        public AccountController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
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

                // Sending Confirmation Email :: Do that later

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
                var roles = await _userManager.GetRolesAsync(user);
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                var tokenExpiryTime = Convert.ToDouble(_appSettings.ExpireTime);
                // Confirmation Email :: Do that later

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
                    username = user.UserName,
                    userRole = roles.FirstOrDefault()
                });
            }

            ModelState.AddModelError("", "Username/Password was not found");
            return Unauthorized(new { LoginError = "Please Check Login Credentials - Invalid Username/Password was entered" });
        }
    }
}
