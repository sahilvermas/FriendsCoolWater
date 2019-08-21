﻿

namespace FriendsCoolWater.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Collections")]
    public class CollectionModel
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateTime { get; set; }

        [Required]
        public double CalculatedAmount { get; set; }

        [Required]
        public double CollectionAmount { get; set; }

        [MaxLength(100)]
        public string Comments { get; set; }

        [Required]
        [Column("Fk_CustomerId")]
        public int CustomerId { get; set; }       

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

        [ForeignKey("CustomerId")]
        public virtual CustomerModel Customer { get; set; }
    }
}