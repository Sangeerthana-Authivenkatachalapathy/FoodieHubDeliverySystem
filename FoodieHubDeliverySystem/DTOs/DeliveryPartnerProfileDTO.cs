using System.ComponentModel.DataAnnotations;

namespace FoodieHubDeliverySystem.DTOs
{
    public class DeliveryPartnerProfileDTO
    {
        
        public string Name { get; set; }

       
        public string PhoneNumber { get; set; }

        
        public string VehicleType { get; set; }

        
        public string LicenseNumber { get; set; }

        
        public bool IsApproved { get; set; }
    }
}
