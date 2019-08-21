using System;
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

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }

        [Required]
        [MaxLength(50)]
        public string CreatedBy { get; set; }
        
        [DataType(DataType.DateTime)]
        public DateTime? ModifiedOn { get; set; }
        
        [MaxLength(50)]
        public string ModifiedBy { get; set; }

        public virtual ICollection<TeamEmployeeModel> TeamEmployees { get; set; }
    }
}
