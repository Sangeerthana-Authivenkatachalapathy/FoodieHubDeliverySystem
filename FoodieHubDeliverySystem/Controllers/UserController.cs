using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
            private readonly IUserService _service;

            public UserController(IUserService service)
            {
                _service = service;
            }

            [HttpPost("generate-otp")]
            public async Task<IActionResult> GenerateOtp([FromBody] string phoneNumber)
            {
                var otp = await _service.GenerateOtpAsync(phoneNumber);
                return Ok(new { message = "OTP generated (demo).", otp });
            }

            [HttpPost("verify-otp")]
            public async Task<IActionResult> VerifyOtp(string phoneNumber, string otp)
            {
                var user = await _service.VerifyOtpAsync(phoneNumber, otp);
                if (user == null) return BadRequest("Invalid OTP.");
                return Ok(user);
            }

            [HttpPost("register")]
            public async Task<IActionResult> Register(User user)
            {
                var created = await _service.RegisterUserAsync(user);
                return Ok(created);
            }

            [HttpPost("set-digipin")]
            public async Task<IActionResult> SetDigiPin(string phoneNumber, string digiPin)
            {
                var success = await _service.SetDigiPinAsync(phoneNumber, digiPin);
                return success ? Ok("DigiPin set.") : BadRequest("User not found.");
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetUserById(Guid id)
            {
                var user = await _service.GetUserByIdAsync(id);
                if (user == null)
                return NotFound("User not found");

                return Ok(user);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UserUpdateDto userDto)
            {
                var result = await _service.UpdateUserAsync(id, userDto);
                if (!result)
                return BadRequest("Update failed");

                return Ok("User updated successfully");
            }

    }

}

