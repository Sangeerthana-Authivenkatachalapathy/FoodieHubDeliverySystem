using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IRestaurantService
    {
        Task<IEnumerable<Restaurant>> GetRestaurantsByPincodeAsync(string pincode);
        Task<Restaurant> CreateAsync(Restaurant restaurant);
        Task<IEnumerable<Restaurant>> GetAllAsync();
        Task<Restaurant> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, Restaurant restaurant);
        Task  DeleteAsync(int  id);

    }
}
