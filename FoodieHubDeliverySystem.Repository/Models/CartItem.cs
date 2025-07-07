using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        [Required]
        public int MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; }
        [Required]
        public int Quantity { get; set; }
        public decimal Discount {  get; set; }
        public string? AppliedCoupon {  get; set; }
        public DateTime AddedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
