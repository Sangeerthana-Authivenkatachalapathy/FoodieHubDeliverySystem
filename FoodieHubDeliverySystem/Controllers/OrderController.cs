using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FoodieHubDeliverySystem.Controllers
{
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("order/summary/{userId}")]
        public async Task<IActionResult> GetOrderSummary(int userId)
        {
            var summary = await _orderService.GetOrderSummaryAsync(userId);
            if (summary == null)
                return BadRequest("Cart is empty.");
            return Ok(summary);
        }

        [HttpGet("history/{userId}")]
        public async Task<IActionResult> GetOrderHistory(int userId)
        {
            var history = await _orderService.GetOrderHistoryAsync(userId);
            return Ok(history);
        }

    }
  
    
    }

