using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class InvoiceDto
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string RestaurantName { get; set; }
        public string DeliveryAddress { get; set; }

        public DateTime OrderedAt { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }

        public List<InvoiceItemDto> Items { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
