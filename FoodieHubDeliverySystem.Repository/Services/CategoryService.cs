using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public Task<IEnumerable<Category>> GetAllCategoriesAsync() =>
            _categoryRepository.GetAllCategoriesAsync();

        public Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId) =>
            _categoryRepository.GetMenuItemsByCategoryIdAsync(categoryId);
    }

}
