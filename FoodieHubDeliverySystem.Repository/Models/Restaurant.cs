using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public string RestaurantName { get; set; }
        public string Description { get; set; }
        [Required]
        public string LicenseNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Pincode { get; set; }
        [Required]
        public string? LicenseCretification { get; set; }
        //[ForeignKey("UserId")]
        //public User User { get; set; }



    }
}
