using System.ComponentModel.DataAnnotations;

namespace FoodieHubDeliverySystem.DTOs
{
    public class DeliveryPartnerRegisterDTO
    {
            [Required]
            public string Name { get; set; }

            [Required]
            public string Email { get; set; }

            [Required]
            public string PhoneNumber { get; set; }

            [Required]
            public string Password { get; set; }

            [Required]
            public string VehicleType { get; set; }

            [Required]
            public string LicenseNumber { get; set; }

           [Required]
           public string GovernmentIdNumber { get; set; }

            // Optional 
            public string? LicenseDocumentUrl { get; set; }
            public string? GovernmentIdUrl { get; set; }
        
    }
}
