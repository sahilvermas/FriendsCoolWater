using FriendsCoolWater.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FriendsCoolWater.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private UserManager<IdentityUser> _userManager { get; set; }
        private SignInManager<IdentityUser> _signInManager { get; set; }

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("action")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel register)
        {
            // Will hold all the errors
            List<string> errorList = new List<string>();

            var user = new IdentityUser
            {
                Email = register.Email,
                UserName = register.Username,
                SecurityStamp = Guid.NewGuid().ToString() // Look for any kind for changes in the model
            };

            var result = await _userManager.CreateAsync(user, password: register.Password);
            if (result.Succeeded)
            {
                // Add new user as Customer Role always
                await _userManager.AddToRoleAsync(user, "Customer");

                // Sending Confirmation Email :: Do that later

                return Ok(new { Username = user.UserName, Email = user.Email, Status = 1, Message = "Registration Successful" });
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
    }
}
