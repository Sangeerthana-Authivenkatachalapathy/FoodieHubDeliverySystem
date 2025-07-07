using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;
        public CategoryRepository(AppDbContext context) { _context = context; }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync() =>
            await _context.Categories.ToListAsync();

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId) =>
            await _context.MenuItems.Where(mi => mi.CategoryId == categoryId).ToListAsync();
    }

}
