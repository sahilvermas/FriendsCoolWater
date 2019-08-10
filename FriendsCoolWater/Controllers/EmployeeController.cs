using FriendsCoolWater.Data;
using FriendsCoolWater.Models;
using FriendsCoolWater.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Controllers
{
    //[Authorize(Policy = "RequiredLoggedIn")]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _db;
        public EmployeeController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        public IActionResult GetEmployees()
        {
            var data = _db.Employees.Select(e => new EmployeeVM
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Active = e.Active,
                TeamId = e.TeamId,
                TeamName = e.Teams.Name
            }).ToList<EmployeeVM>();

            return Ok(data);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetEmployee([FromRoute]int id)
        {
            return Ok(_db.Employees.Where(e => e.Id == id).ToList());
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetEmployeesByTeamId([FromRoute] int id)
        {
            return Ok(_db.Employees.Where(e => e.TeamId == id).ToList());
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddEmployee([FromBody]EmployeeModel formData)
        {
            if (formData == null)
            {
                return BadRequest("No data passed");
            }

            var newEmployee = new EmployeeModel()
            {
                Id = formData.Id,
                FirstName = formData.FirstName,
                LastName = formData.LastName,
                Active = formData.Active,
                TeamId = formData.TeamId
            };

            await _db.Employees.AddAsync(newEmployee);
            await _db.SaveChangesAsync();
            return Ok();
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute]int id, [FromBody]EmployeeModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = _db.Employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.FirstName = formData.FirstName;
            employee.LastName = formData.LastName;
            employee.Active = formData.Active;
            employee.TeamId = formData.TeamId;

            _db.Entry(employee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok(new JsonResult($"The Employee with Id {id} updated sucessfully."));
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var employee = await _db.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _db.Employees.Remove(employee);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult($"Employee with Id {id} deleted sucessfully."));
        }
    }
}