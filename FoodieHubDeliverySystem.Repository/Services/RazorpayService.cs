using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.DTOs;
using Microsoft.Extensions.Configuration;
using Razorpay.Api;

namespace FoodieHubDeliverySystem.Repository.Services
{
   

    public class RazorpayService : IRazorpayService
    {
        private readonly IConfiguration _config;

        public RazorpayService(IConfiguration config)
        {
            _config = config;
        }

        public RazorpayOrderResponseDto CreateOrder(RazorpayOrderRequestDto dto)
        {
            var key = _config["Razorpay:Key"];
            var secret = _config["Razorpay:Secret"];

            RazorpayClient client = new RazorpayClient(key, secret);

            var options = new Dictionary<string, object>
        {
            { "amount", dto.Amount * 100 },
            { "currency", "INR" },
            { "receipt", $"receipt_{Guid.NewGuid()}" },
            { "payment_capture", 1 }
        };

            var order = client.Order.Create(options);

            return new RazorpayOrderResponseDto
            {
                Key = key,
                Amount = (int)order["amount"],
                OrderId = order["id"].ToString(),
                SelectedMethod = dto.SelectedMethod
            };
        }
    }

}
