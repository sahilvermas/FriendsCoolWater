using FriendsCoolWater.Data;
using FriendsCoolWater.Models;
using Microsoft.AspNetCore.Authorization;
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
        public TeamController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        public IActionResult GetTeams()
        {
            return Ok(_db.Teams.ToList());
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetTeam([FromRoute]int id)
        {
            return Ok(_db.Teams.Where(t => t.Id == id).ToList());
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddTeam([FromBody]TeamModel formData)
        {
            var newTeam = new TeamModel()
            {
                Id = formData.Id,
                Name = formData.Name,
                Active = formData.Active,
                Description = formData.Description
            };

            await _db.Teams.AddAsync(newTeam);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("[action]/{id}")]
        public async Task<IActionResult> UpdateTeam([FromRoute]int id, [FromBody]TeamModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = _db.Teams.FirstOrDefault(t => t.Id == id);
            if (team == null)
            {
                return NotFound();
            }

            team.Name = formData.Name;
            team.Description = formData.Description;
            team.Active = formData.Active;

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
