using System.ComponentModel.DataAnnotations;

namespace FoodieHubDeliverySystem.DTOs
{
    public class DeliveryPartnerUpdateDTO
    {
        [Required]
        public string VehicleType { get; set; }

        [Required]
        public string LicenseNumber { get; set; }

        [Required]
        public string GovernmentIdNumber { get; set; }
        public string? LicenseDocumentUrl { get; set; }
        public string? GovernmentIdUrl { get; set; }
    }
}
