using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
        public class DeliveryAddress
        {
            [Key]
            public int Id { get; set; }

            [Required]
            public string AddressLine { get; set; }

            [Required]
            public string City { get; set; }

            [Required]
            public string Pincode { get; set; }

            // Foreign key to User
            public int UserId { get; set; }

            [ForeignKey("UserId")]
            public User User { get; set; }
        }
    }


