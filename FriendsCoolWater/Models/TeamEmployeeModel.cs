using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsCoolWater.Models
{
    [Table("TeamEmployees")]
    public class TeamEmployeeModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("Fk_TeamId")]
        public int TeamId { get; set; }

        [Required]
        [Column("Fk_EmployeeId")]
        [MaxLength(450)]
        public string EmployeeId { get; set; }

        [ForeignKey("TeamId")]
        public virtual TeamModel Team { get; set; }

        [ForeignKey("EmployeeId")]
        public IdentityUser Employee { get; set; }
    }
}
