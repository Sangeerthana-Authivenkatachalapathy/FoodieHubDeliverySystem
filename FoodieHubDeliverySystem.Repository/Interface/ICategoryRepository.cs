using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId);
    }

}
