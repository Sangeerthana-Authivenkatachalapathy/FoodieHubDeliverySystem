using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class AddressDTO
    {
        public string? AddressLine { get; set; }
        public string? City { get; set; }
        public string? Pincode { get; set; }
    }
}
