using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FriendsCoolWater.Models
{
    [Table("Employees")]
    public class EmployeeModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("Fk_TeamId")]
        public int TeamId { get; set; }

        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; }
        
        [MaxLength(30)]
        public string LastName { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        [ForeignKey("TeamId")]
        public virtual TeamModel Teams { get; set; }
    }
}
