using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class RazorpayOrderResponseDto
    {
        public string Key { get; set; }
        public int Amount { get; set; }
        public string OrderId { get; set; }
        public string SelectedMethod { get; set; }
    }
}
