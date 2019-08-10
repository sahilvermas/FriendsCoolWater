using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsCoolWater.Models
{

    [Table("Customers")]
    public class Customer
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string FirmName { get; set; }

        [MaxLength(30)]
        public string CustomerName { get; set; }

        [MaxLength(80)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string Description { get; set; }

        [Required]
        public sbyte UnitPerDay { get; set; }

        [Required]
        public sbyte UnitPrice { get; set; }

        [Required]
        public bool Active { get; set; }
    }
}

