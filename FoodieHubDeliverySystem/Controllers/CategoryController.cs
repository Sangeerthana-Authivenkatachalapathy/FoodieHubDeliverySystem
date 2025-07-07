using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoryController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Categories.ToList());

        [HttpPost]
        public IActionResult Create(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Category updated)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();

            category.Name = updated.Name;
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound();

            _context.Categories.Remove(category);
            _context.SaveChanges();
            return Ok("Deleted successfully");
        }
    }
}
