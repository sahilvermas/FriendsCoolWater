using FriendsCoolWater.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FriendsCoolWater.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Create roles for application
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(
                new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = "2", Name = "Employee", NormalizedName = "EMPLOYEE" },
                new { Id = "3", Name = "Customer", NormalizedName = "CUSTOMER" }
            );
        }

        public DbSet<TeamModel> Teams { get; set; }
        public DbSet<CustomerModel> Customers { get; set; }
        public DbSet<CollectionModel> Collections { get; set; }

    }
}
