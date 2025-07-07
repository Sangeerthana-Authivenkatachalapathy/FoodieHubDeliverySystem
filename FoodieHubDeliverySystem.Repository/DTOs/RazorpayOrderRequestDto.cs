using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class RazorpayOrderRequestDto
    {
        public int Amount { get; set; }
        public string SelectedMethod { get; set; }
    }
}
