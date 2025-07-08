using Microsoft.OpenApi.MicrosoftExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class RestaurantReview
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Restaurant")]
        public int RestaurantId { get; set; }
        [Required]
        [ForeignKey("User")]
        public int CustomerId { get; set; }
        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public string Rating { get; set; }
        [MaxLength(1000)]
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Restaurant Restaurant { get; set; }
        //public User User { get; set; }

    }
}
       