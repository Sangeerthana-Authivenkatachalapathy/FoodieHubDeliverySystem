using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }

        public string CustomerName { get; set; }

        public string CustomerPhone { get; set; }

        public string DeliveryAddress { get; set; } // from Address table

        public string RestaurantName { get; set; }

        public DateTime OrderTime { get; set; }

        public decimal TotalAmount { get; set; }

        public string Status { get; set; }
    }
}
