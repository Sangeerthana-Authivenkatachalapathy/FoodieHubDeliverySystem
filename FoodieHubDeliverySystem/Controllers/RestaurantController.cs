using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        // GET: api/Restaurant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
            var restaurants = await _restaurantService.GetAllAsync();
            return Ok(restaurants);
        }

        // GET: api/Restaurant/bypincode/{pincode}
        [HttpGet("bypincode/{pincode}")]
        public async Task<IActionResult> GetByPincode(string pincode)
        {
            var restaurants = await _restaurantService.GetRestaurantsByPincodeAsync(pincode);
            if (restaurants == null || !restaurants.Any())
                return NotFound("No restaurants found for the given pincode.");

            return Ok(restaurants);
        }

        // GET: api/Restaurant/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurantById(int id)
        {
            var restaurant = await _restaurantService.GetByIdAsync(id);
            if (restaurant == null)
                return NotFound();

            return Ok(restaurant);
        }

        // POST: api/Restaurant
        [HttpPost]
        public async Task<ActionResult<Restaurant>> CreateRestaurant(Restaurant restaurant)
        {
            var createdRestaurant = await _restaurantService.CreateAsync(restaurant);
            return CreatedAtAction(nameof(GetRestaurantById), new { id = createdRestaurant.Id }, createdRestaurant);
        }

        // PUT: api/Restaurant/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRestaurant(int id, Restaurant restaurant)
        {
            if (id != restaurant?.Id)
                return BadRequest("Restaurant ID mismatch.");

            var updated = await _restaurantService.UpdateAsync(id, restaurant);
            if (!updated)
                return NotFound("Restaurant not found.");

            return NoContent();
        }

        // DELETE: api/Restaurant/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurant(int id)
        {
            var restaurant = await _restaurantService.GetByIdAsync(id);
            if (restaurant == null)
                return NotFound("Restaurant not found.");

            await _restaurantService.DeleteAsync(id);
            return NoContent();
        }
    }
}
