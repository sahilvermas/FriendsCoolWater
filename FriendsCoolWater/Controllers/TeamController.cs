using FriendsCoolWater.Data;
using FriendsCoolWater.Models;
using FriendsCoolWater.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Controllers
{
    [Authorize(Policy = "RequiredLoggedIn")]
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<IdentityUser> _userManager;
        public TeamController(UserManager<IdentityUser> userManager, ApplicationDbContext db)
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpGet("[action]")]
        public IActionResult GetTeams()
        {
            var data = _db.Teams
                .Select(t => new TeamVM()
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    Active = t.Active,
                    TeamEmployees = t.TeamEmployees.ToList(),
                    CreatedBy = t.CreatedBy,
                    CreatedOn = t.CreatedOn,
                    ModifiedBy = t.ModifiedBy,
                    ModifiedOn = t.ModifiedOn,
                    CreatedByName = _db.Users.First(u => u.Id == t.CreatedBy).UserName,
                    ModifiedByName = _db.Users.FirstOrDefault(u => u.Id == t.ModifiedBy).UserName
                })
                .ToList();
            return Ok(data);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetTeam([FromRoute]int id)
        {
            return Ok(_db.Teams.Where(t => t.Id == id).ToList());
        }

        [HttpGet("[action]")]
        public IActionResult GetEmployeesInTeams()
        {
            var data = _db.TeamEmployees
                .Select(t => new TeamEmployeeVM
                {
                    Id = t.Id,
                    TeamId = t.TeamId,
                    EmployeeId = t.EmployeeId,
                    TeamName = t.Team.Name,
                    EmployeeName = t.Employee.UserName
                }).ToList();

            return Ok(data);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddTeam([FromBody]TeamModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_db.Teams.Any(t => t.Name.Equals(formData.Name, System.StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest(string.Format("Team with {0} name already exists", formData.Name));
            }

            var newTeam = new TeamModel()
            {
                Id = formData.Id,
                Name = formData.Name,
                Active = formData.Active,
                Description = formData.Description,
                CreatedBy = formData.CreatedBy,
                CreatedOn = formData.CreatedOn
            };

            await _db.Teams.AddAsync(newTeam);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateTeam([FromRoute]int id, [FromBody]TeamModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_db.Teams.Any(t => t.Name.Equals(formData.Name, System.StringComparison.OrdinalIgnoreCase) && t.Id != formData.Id))
            {
                return BadRequest(string.Format("Team with {0} name already exists", formData.Name));
            }

            var team = _db.Teams.FirstOrDefault(t => t.Id == id);
            if (team == null)
            {
                return NotFound();
            }

            team.Name = formData.Name;
            team.Description = formData.Description;
            team.Active = formData.Active;
            team.ModifiedBy = formData.ModifiedBy;
            team.ModifiedOn = formData.ModifiedOn;

            _db.Entry(team).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok(new JsonResult($"The Team with Id {id} updated sucessfully."));
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteTeam([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _db.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _db.Teams.Remove(team);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult($"Team with Id {id} deleted sucessfully."));
        }
    }
}
