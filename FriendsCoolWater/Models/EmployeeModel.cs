namespace FriendsCoolWater.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Employees")]
    public class EmployeeModel
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        [Column("Fk_TeamId")]
        public int TeamId { get; set; }

        [Required]
        [Column("Fk_EmployeeId")]
        [MaxLength(450)]
        public string EmployeeId { get; set; }

        [Required]
        [MaxLength(40)]
        public string FirstName { get; set; }

        [MaxLength(40)]
        public string LastName { get; set; }

        [ForeignKey("TeamId")]
        public virtual TeamModel Team { get; set; }

        [ForeignKey("EmployeeId")]
        public virtual IdentityUser Employee { get; set; }
    }
}
