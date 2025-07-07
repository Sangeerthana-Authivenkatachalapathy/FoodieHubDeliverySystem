using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class DeliveryHistoryDTO
    {
        public int OrderId { get; set; }

        public string CustomerName { get; set; }

        public string RestaurantName { get; set; }

        public DateTime OrderTime { get; set; }

        public DateTime? DeliveredTime { get; set; }

        public decimal TotalAmount { get; set; }

        public string DeliveryAddress { get; set; }
    }
}
