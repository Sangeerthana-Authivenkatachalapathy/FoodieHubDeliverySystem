using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CartItemController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll() => Ok(_context.CartItems.Include(c => c.User).ToList());

        [HttpPost]
        public IActionResult Add(CartItem item)
        {
            _context.CartItems.Add(item);
            _context.SaveChanges();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CartItem updated)
        {
            var item = _context.CartItems.Find(id);
            if (item == null) return NotFound();

            item.Quantity = updated.Quantity;
            _context.SaveChanges();
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.CartItems.Find(id);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            _context.SaveChanges();
            return Ok("Deleted successfully");
        }
    }
}