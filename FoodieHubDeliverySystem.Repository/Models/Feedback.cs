using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        public int? OrderId { get; set; }

        [ForeignKey("OrderId")]
        public FoodOrder? Order { get; set; }

        public int? RestaurantId { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant? Restaurant { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string Category { get; set; } // "Order", "Restaurant", "Delivery", "App", "Other"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? AdminResponse { get; set; }

        public DateTime? ResponseDate { get; set; }

        public int? RespondedByAdminId { get; set; }

        [ForeignKey("RespondedByAdminId")]
        public User? RespondedByAdmin { get; set; }

        public bool IsResolved { get; set; } = false;
    }
}