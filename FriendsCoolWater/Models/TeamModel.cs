using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FriendsCoolWater.Models
{
    public class TeamModel
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        [Required]
        public bool Active { get; set; }

        public virtual ICollection<TeamModel> Teams { get; set; }
    }
}
