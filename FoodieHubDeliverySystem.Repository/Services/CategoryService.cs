using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Include(c => c.MenuItems)
                .ToListAsync();
        }

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId)
        {
            return await _context.MenuItems
                .Where(mi => mi.CategoryId == categoryId)
                .ToListAsync();
        }
    }
}
