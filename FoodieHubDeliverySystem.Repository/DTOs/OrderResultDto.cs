using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    public class OrderResultDto
    {
        public bool IsSuccess { get; set; }   
        public int OrderId { get; set; }    
        public string Message { get; set; }  
    }
}
