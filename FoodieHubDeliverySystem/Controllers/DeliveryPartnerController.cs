using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryPartnerController : ControllerBase
    {
        private readonly IDeliveryPartnerService _service;

        public DeliveryPartnerController(IDeliveryPartnerService service)
        {
            _service = service;
        }

        // Register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] DeliveryPartnerRegisterDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (dto == null)
            {
                return BadRequest("DTO is null");
            }
            var result = await _service.RegisterAsync(dto);
            return Ok(result);
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] DeliveryPartnerLoginDTO dto)
        {
            var user = await _service.ValidateCredentialsAsync(dto.Email, dto.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");
            return Ok(user);
        }

        //  Get Profile
        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetProfile(int userId)
        {
            var profile = await _service.GetProfileAsync(userId);
            return profile == null ? NotFound() : Ok(profile);
        }

        // Update Profile
        [HttpPut("profile/{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, [FromBody] DeliveryPartnerUpdateDTO dto)
        {
            var success = await _service.UpdateProfileAsync(userId, dto);
            return success ? Ok("Updated") : NotFound();
        }

        //  Approve Partner (Admin)
        [HttpPut("approve/{userId}")]
        public async Task<IActionResult> Approve(int userId)
        {
            var approved = await _service.ApproveDeliveryPartnerAsync(userId);
            return approved ? Ok("Approved") : NotFound("Partner not found");
        }

        // Assigned Orders
        [HttpGet("{partnerId}/orders")]
        public async Task<IActionResult> GetAssignedOrders(int partnerId)
        {
            var orders = await _service.GetAssignedOrdersAsync(partnerId);
            return Ok(orders);
        }

        //  Accept Order
        [HttpPut("orders/{orderId}/accept")]
        public async Task<IActionResult> AcceptOrder(int orderId, [FromQuery] int partnerId)
        {
            var accepted = await _service.AcceptOrderAsync(orderId, partnerId);
            return accepted ? Ok("Order accepted") : BadRequest("Cannot accept");
        }

        //  Update Delivery Status
        [HttpPut("orders/{orderId}/status")]
        public async Task<IActionResult> UpdateStatus(int orderId, [FromQuery] string status)
        {
            var updated = await _service.UpdateDeliveryStatusAsync(orderId, status);
            return updated ? Ok("Status updated") : BadRequest("Update failed");
        }

        //  Delivery History
        [HttpGet("{partnerId}/history")]
        public async Task<IActionResult> GetDeliveryHistory(int partnerId)
        {
            var history = await _service.GetDeliveryHistoryAsync(partnerId);
            return Ok(history);
        }
    }
}
