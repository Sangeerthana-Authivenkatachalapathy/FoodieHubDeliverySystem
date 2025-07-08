using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.ExternalServices;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Enums;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _context;
        private readonly IOrderService _orderService;
        private readonly IConfiguration _config;

        public PaymentService(AppDbContext context, IOrderService orderService, IConfiguration config)
        {
            _context = context;
            _orderService = orderService;
            _config = config;
        }

        public async Task<PaymentResultDto> VerifyAndProcessPaymentAsync(PaymentVerificationRequestDto dto)
        {
            var razorSecret = _config["Razorpay:Secret"];

            bool isValid = RazorpayHelper.IsSignatureValid(dto.RazorpayOrderId, dto.RazorpayPaymentId, dto.RazorpaySignature, razorSecret);
            if (!isValid)
            {
                return new PaymentResultDto { IsSuccess = false, Message = "Invalid signature" };
            }

            var payment = new Payment
            {
                UserId = dto.UserId,
                Amount = dto.Amount,
                PaymentMethod = "Razorpay",
                PaymentStatus = PaymentStatus.Paid,
                PaidDate = DateTime.Now,
                RazorpayOrderId = dto.RazorpayOrderId,
                RazorpayPaymentId = dto.RazorpayPaymentId,
                RazorpaySignature = dto.RazorpaySignature
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            var orderResult = await _orderService.PlaceOrderAsync(dto.UserId, payment.PaymentId);

            if (!orderResult.IsSuccess)
            {
                return new PaymentResultDto
                {
                    IsSuccess = false,
                    Message = "Payment saved but order failed"
                };
            }

            return new PaymentResultDto
            {
                IsSuccess = true,
                Message = "Payment verified & order placed",
                OrderId = orderResult.OrderId
            };
        }
    }
}
