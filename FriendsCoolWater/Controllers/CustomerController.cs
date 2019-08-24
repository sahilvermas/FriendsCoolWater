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
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _db;
        private UserManager<IdentityUser> _userManager;

        public CustomerController(UserManager<IdentityUser> userManager, ApplicationDbContext db)
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpGet("[action]")]
        public IActionResult GetCustomers()
        {
            var data = _db.Customers.Select(c => new CustomerVM
            {
                Id = c.Id,
                FirmName = c.FirmName,
                CustomerName = c.CustomerName,
                MobileNumber = c.MobileNumber,
                Address = c.Address,
                Description = c.Description,
                Active = c.Active,
                UnitPerDay = c.UnitPerDay,
                UnitPrice = c.UnitPrice,
                CreatedOn = c.CreatedOn,
                CreatedBy = c.CreatedBy,
                ModifiedBy = c.ModifiedBy,
                ModifiedOn = c.ModifiedOn,
                CreatedByName = _db.Users.First(u => u.Id == c.CreatedBy).UserName,
                ModifiedByName = _db.Users.FirstOrDefault(u => u.Id == c.ModifiedBy).UserName
            }).ToList<CustomerVM>();

            return Ok(data);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetCustomer([FromRoute]int id)
        {
            return Ok(_db.Customers.Where(c => c.Id == id).ToList());
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("[action]")]
        public async Task<IActionResult> AddCustomer([FromBody]CustomerModel formData)
        {
            if (formData == null)
            {
                return BadRequest("No data passed");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCustomer = new CustomerModel()
            {
                Id = formData.Id,
                FirmName = formData.FirmName,
                MobileNumber = formData.MobileNumber,
                CustomerName = formData.CustomerName,
                Address = formData.Address,
                Description = formData.Description,
                Active = formData.Active,
                UnitPerDay = formData.UnitPerDay,
                UnitPrice = formData.UnitPrice,
                CreatedBy = formData.CreatedBy,
                CreatedOn = formData.CreatedOn
            };

            await _db.Customers.AddAsync(newCustomer);
            await _db.SaveChangesAsync();
            return Ok();
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute]int id, [FromBody]CustomerModel formData)
        {
            var customer = _db.Customers.FirstOrDefault(e => e.Id == id);
            if (customer == null)
            {
                return NotFound();
            }
            customer.FirmName = formData.FirmName;
            customer.CustomerName = formData.CustomerName;
            customer.Address = formData.Address;
            customer.Description = formData.Description;
            customer.UnitPrice = formData.UnitPrice;
            customer.UnitPerDay = formData.UnitPerDay;
            customer.Active = formData.Active;
            customer.ModifiedBy = formData.ModifiedBy;
            customer.ModifiedOn = formData.ModifiedOn ?? DateTime.UtcNow;

            _db.Entry(customer).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _db.SaveChangesAsync();

            return Ok(new JsonResult($"The Customer with Id {id} updated sucessfully."));
        }

        //[Authorize(Policy = "RequiredAdminRole")]
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Customer = await _db.Customers.FindAsync(id);
            if (Customer == null)
            {
                return NotFound();
            }

            _db.Customers.Remove(Customer);
            await _db.SaveChangesAsync();
            return Ok(new JsonResult($"Customer with Id {id} deleted sucessfully."));
        }
    }
}