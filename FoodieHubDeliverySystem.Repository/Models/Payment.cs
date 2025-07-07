using FoodieHubDeliverySystem.Repository.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static FoodieHubDeliverySystem.Repository.Enums.RestaurantService;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class Payment

    {

        [Key]
        public int PaymentId { get; set; }

        [Required]
        public int UserId { get; set; } // FK to User

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]

        [MaxLength(20)]
        public string PaymentMethod { get; set; } // e.g., upi, gpay, card

        [Required]

        [MaxLength(20)]
        public PaymentStatus PaymentStatus { get; set; } // Pending, Success, Failed
        public DateTime? PaidDate { get; set; }

        // Razorpay tracking fields
        public string RazorpayOrderId { get; set; }
        public string RazorpayPaymentId { get; set; }
        public string RazorpaySignature { get; set; }


    }

}
