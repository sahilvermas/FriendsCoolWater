using FriendsCoolWater.Data;
using FriendsCoolWater.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Controllers
{
    //[Authorize(Policy = "RequiredLoggedIn")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _db;

        public AdminController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext db)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
        }

        [HttpGet("[action]")]
        public IActionResult GetAllUsers()
        {
            return Ok(_userManager.Users.ToList());
        }


        [HttpGet("[action]")]
        public IActionResult GetUserById([FromRoute]string userId)
        {
            return Ok(_userManager.Users.First(u => u.Id.Equals(userId, System.StringComparison.OrdinalIgnoreCase)));
        }

        [HttpGet("[action]")]
        public IActionResult GetUserByName([FromRoute]string userName)
        {
            return Ok(_userManager.Users.First(u => u.UserName.Equals(userName, System.StringComparison.OrdinalIgnoreCase)));
        }

        [HttpGet("[action]")]
        public IActionResult GetAllRoles()
        {
            return Ok(_roleManager.Roles.ToList());
        }

        [HttpGet("[action]")]
        public IActionResult GetUsersWithRoles()
        {
            var data = (from user in _userManager.Users
                        select new UserRoleVM
                        {
                            UserId = user.Id,
                            Username = user.UserName,
                            Email = user.Email,
                            RoleNames = GetUserRoles(user).Result.ToArray()
                        }).ToList();

            return Ok(data);
        }
        
        public async Task<List<string>> GetUserRoles(IdentityUser user)
        {
            return new List<string>(await _userManager.GetRolesAsync(user));
        }
    }
}