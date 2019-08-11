using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsCoolWater.Models
{

    [Table("Customers")]
    public class CustomerModel
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string FirmName { get; set; }

        [MaxLength(30)]
        public string CustomerName { get; set; }

        [MaxLength(12)]
        public string MobileNumber { get; set; }

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

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }

        [Required]
        [MaxLength(50)]
        public string CreatedBy { get; set; }
    }
}

