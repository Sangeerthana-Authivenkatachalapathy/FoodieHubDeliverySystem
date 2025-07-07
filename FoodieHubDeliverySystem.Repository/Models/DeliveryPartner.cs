using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    namespace FoodieHubDeliverySystem.Repository.Models

    {

        public class DeliveryPartner

        {

            [Key]
            public int Id { get; set; }

            [Required]

            [ForeignKey("User")]
            public int UserId { get; set; }

            [Required]
            public string VehicleType { get; set; }

            [Required]
            public string LicenseNumber { get; set; }

            [Required]
            public string GovernmentIdNumber { get; set; }
            public string GovernmentIdUrl { get; set; }
            public string LicenseDocumentUrl { get; set; }
            public User User { get; set; } // Navigation property
            public ICollection<FoodOrder> DeliveredOrders { get; set; } = new List<FoodOrder>();


        }

    }


}
