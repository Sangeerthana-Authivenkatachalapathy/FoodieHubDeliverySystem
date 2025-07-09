using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodieHubDeliverySystem.Jwt
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Requires valid JWT token
    public class SecuredController : ControllerBase
    {

            [HttpGet("profile")]
            public IActionResult GetUserProfile()
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var email = User.FindFirst(ClaimTypes.Email)?.Value;
                var role = User.FindFirst(ClaimTypes.Role)?.Value;

                return Ok(new
                {
                    Message = "Access granted to secured endpoint",
                    UserId = userId,
                    Email = email,
                    Role = role
                });
            }

            [HttpGet("admin")]
            [Authorize(Roles = "Admin")]
            public IActionResult AdminOnly()
            {
                return Ok("Hello Admin! You have access to this endpoint.");
            }
        }

    
}
