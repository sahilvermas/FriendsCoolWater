using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsCoolWater.Models
{
    [Table("Teams")]
    public class TeamModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        [Required]
        public bool Active { get; set; }

        public virtual ICollection<EmployeeModel> Employees { get; set; }
    }
}
