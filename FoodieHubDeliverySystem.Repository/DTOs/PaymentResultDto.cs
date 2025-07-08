using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class PaymentResultDto
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public int OrderId { get; set; }
    }
}
