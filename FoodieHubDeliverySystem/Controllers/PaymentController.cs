using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FoodieHubDeliverySystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IRazorpayService _razorpayService;


        public PaymentController(IPaymentService paymentService, IRazorpayService razorpayService)
        {
            _paymentService = paymentService;
            _razorpayService = razorpayService;
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerificationRequestDto dto)
        {
            var result = await _paymentService.VerifyAndProcessPaymentAsync(dto);

            if (!result.IsSuccess)
                return BadRequest(result.Message);

            return Ok(new { result.OrderId, result.Message });
        }

        [HttpPost("create-order-id")]
        public IActionResult CreateOrder([FromBody] RazorpayOrderRequestDto dto)
        {
            var response = _razorpayService.CreateOrder(dto);
            return Ok(response);
        }
    }
}
