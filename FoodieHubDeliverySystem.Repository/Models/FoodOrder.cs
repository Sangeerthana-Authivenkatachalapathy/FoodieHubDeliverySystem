using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Models.FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class FoodOrder

    {

        [Key]

        public int OrderId { get; set; }

        [Required]

        public int UserId { get; set; } // FK to User

        [ForeignKey("UserId")]

        public User User { get; set; }

        [Required]

        public int RestaurantId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]

        public decimal TotalAmount { get; set; }

        [Required]

        [MaxLength(20)]

        public OrderStatus OrderStatus { get; set; } // e.g., "Confirmed", "Cancelled"

        public int PaymentId { get; set; }

        [ForeignKey("PaymentId")]

        public Payment Payment { get; set; }

        //One Order has many OrderItems

        public List<OrderItem> OrderItems { get; set; }

        public int? DeliveryAddressId { get; set; }

        [ForeignKey("DeliveryAddressId")]

        public DeliveryAddress DeliveryAddress { get; set; }

        public int? DeliveryPartnerId { get; set; }

        [ForeignKey("DeliveryPartnerId")]

        public DeliveryPartner DeliveryPartner { get; set; }

        public DateTime? EstimatedDeliveryTime { get; set; }

    }

}
