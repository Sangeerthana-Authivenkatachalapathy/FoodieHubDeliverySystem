using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class AdminAuditLog
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AdminUserId { get; set; }

        [ForeignKey("AdminUserId")]
        public User AdminUser { get; set; }

        [Required]
        public string Action { get; set; } // "ApproveRestaurant", "UpdateUserStatus", etc.

        public string EntityType { get; set; } // "User", "Restaurant", "DeliveryPartner", etc.

        public string EntityId { get; set; }

        public string? OldValues { get; set; } // JSON string of previous values

        public string? NewValues { get; set; } // JSON string of new values

        public string? Reason { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public string IpAddress { get; set; }
    }
}