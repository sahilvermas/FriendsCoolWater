using FriendsCoolWater.Data;
using FriendsCoolWater.Models;
using FriendsCoolWater.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Controllers
{
    [Route("api/[controller]")]
    public class CollectionController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<IdentityUser> _userManager;

        public CollectionController(UserManager<IdentityUser> userManager, ApplicationDbContext db)
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpGet("[action]/{startDate}/{endDate}")]
        public IActionResult GetCollection([FromRoute]DateTime startDate, DateTime endDate)
        {
            var data = (from coll in _db.Collections
                        join team in _db.TeamEmployees on coll.CreatedBy equals team.EmployeeId
                        join userCreated in _db.Users on coll.CreatedBy equals userCreated.Id into colC
                        join userModified in _db.Users on coll.ModifiedBy equals userModified.Id into colM
                        from userCreated in colM.DefaultIfEmpty()
                        where coll.DateTime.Date >= startDate.Date && coll.DateTime.Date <= endDate.Date
                        select new CollectionVM
                        {
                            Id = coll.Id,
                            TeamId = team.Id,
                            TeamName = team.Team.Name,
                            TeamActive = team.Team.Active,
                            DateTime = coll.DateTime,
                            CustomerId = coll.CustomerId,
                            FirmName = coll.Customer.FirmName,
                            CustomerName = coll.Customer.CustomerName,
                            CustomerActive = coll.Customer.Active,
                            CalculatedAmount = coll.Customer.UnitPerDay * coll.Customer.UnitPrice,
                            CollectionAmount = coll.CollectionAmount,
                            Comments = coll.Comments,
                            CreatedBy = coll.CreatedBy,
                            EmployeeByName = colC.FirstOrDefault().UserName,
                            CreatedOn = coll.CreatedOn,
                            ModifiedBy = coll.ModifiedBy,
                            ModifiedByName = colM.FirstOrDefault() == null ? string.Empty : colM.First().UserName,
                            ModifiedOn = coll.ModifiedOn
                        }).ToList();

            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveCollection([FromBody]CollectionModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _db.Collections.AddAsync(formData);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateCollection([FromRoute]int id, [FromBody]CollectionModel formData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collection = _db.Collections.First(c => c.Id == id);
            if (collection == null)
            {
                return NotFound();
            }
            
            collection.CollectionAmount = formData.CollectionAmount;
            collection.Comments = formData.Comments;
            collection.ModifiedBy = formData.ModifiedBy;
            collection.ModifiedOn = formData.ModifiedOn;

            _db.Entry(collection).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok(new JsonResult($"Collection with Id {id} updated sucessfully."));
        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteCollection([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collection = await _db.Collections.FindAsync(id);
            if (collection == null)
            {
                return NotFound();
            }

            _db.Collections.Remove(collection);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult($"Collection with Id {id} deleted sucessfully."));
        }
    }
}