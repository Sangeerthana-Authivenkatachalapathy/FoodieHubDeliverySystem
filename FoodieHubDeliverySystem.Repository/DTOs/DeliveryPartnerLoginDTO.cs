using System.ComponentModel.DataAnnotations;

namespace FoodieHubDeliverySystem.DTOs
{
    public class DeliveryPartnerLoginDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
