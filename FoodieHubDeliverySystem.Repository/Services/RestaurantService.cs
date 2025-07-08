using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly List<Restaurant> _restaurants = new();

        public async Task<Restaurant> CreateAsync(Restaurant restaurant)
        {
            restaurant.Id = _restaurants.Count + 1;
            restaurant.CreatedAt = DateTime.UtcNow;
            _restaurants.Add(restaurant);
            return await Task.FromResult(restaurant);
        }

        public async Task<IEnumerable<Restaurant>> GetAllAsync()
        {
            return await Task.FromResult(_restaurants);
        }

        public async Task<Restaurant> GetByIdAsync(int id)
        {
            var restaurant = _restaurants.FirstOrDefault(r => r.Id == id);
            return await Task.FromResult(restaurant);
        }

        public async Task<Restaurant> DeleteAsync(int id)
        {
            var restaurant = _restaurants.FirstOrDefault(r => r.Id == id);
            if (restaurant != null)
            {
                _restaurants.Remove(restaurant);
            }
            return await Task.FromResult(restaurant);
        }
    }
}
