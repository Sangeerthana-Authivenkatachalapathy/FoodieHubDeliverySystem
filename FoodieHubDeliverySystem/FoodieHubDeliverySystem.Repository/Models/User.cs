using FoodieHubDeliverySystem.Repository.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class User
    {
        public int UserId {  get; set; }
        [Required]
        public string Name { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash {  get; set; }
        public string PhoneNumber {  get; set; }
        public bool IsPhoneVerified { get; set; }
        public string DigiPin {  get; set; }
        public UserRole Role { get; set; }
        public bool IsApproved {  get; set; } = false;
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public ICollection<FoodOrder> FoodOrders { get; set; } = new List<FoodOrder>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public ICollection<DeliveryAddress> DeliveryAddresses { get; set; } = new List<DeliveryAddress>();

    }
}
