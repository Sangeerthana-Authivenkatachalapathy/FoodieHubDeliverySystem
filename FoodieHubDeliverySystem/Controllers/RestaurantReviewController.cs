using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodieHubDeliverySystem.Repository.Interface;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantReviewController : ControllerBase
    {
        private readonly IRestaurantReviewService _reviewService;

        // ✅ Store the injected service in a private field
        public RestaurantReviewController(IRestaurantReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // ✅ Use RestaurantReview model, not service
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RestaurantReview review)
        {
            var created = await _reviewService.CreateAsync(review);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _reviewService.GetAllAsync();
            return Ok(reviews);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var review = await _reviewService.GetByIdAsync(id);
            if (review == null) return NotFound();
            return Ok(review);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _reviewService.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted); // or return NoContent() if you don't want to return the deleted item
        }
    }
}
