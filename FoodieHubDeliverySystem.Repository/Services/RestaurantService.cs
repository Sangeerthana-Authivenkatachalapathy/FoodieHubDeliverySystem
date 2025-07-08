using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly AppDbContext _context;

        public RestaurantService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Restaurant> CreateAsync(Restaurant restaurant)
        {
            restaurant.Id = _context.RestaurantDetails.Count() + 1;
            restaurant.CreatedAt = DateTime.UtcNow;
            _context.RestaurantDetails.Add(restaurant);
            await _context.SaveChangesAsync();
            return restaurant;
        }

        public async Task<IEnumerable<Restaurant>> GetAllAsync()
        {
            return await _context.RestaurantDetails.ToListAsync();
        }

        public async Task<Restaurant> GetByIdAsync(int id)
        {
            return await _context.RestaurantDetails.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task DeleteAsync(int id)
        {
            var restaurant = await _context.RestaurantDetails.FirstOrDefaultAsync(r => r.Id == id);
            if (restaurant != null)
            {
                _context.RestaurantDetails.Remove(restaurant);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Restaurant>> GetRestaurantsByPincodeAsync(string pincode)
        {
            return await _context.RestaurantDetails
                .Where(r => r.Pincode == pincode)
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(int id, Restaurant restaurant)
        {
            var existing = await _context.RestaurantDetails.FindAsync(id);
            if (existing == null)
            {
                return false;
            }

            existing.RestaurantName = restaurant.RestaurantName;
            existing.Address = restaurant.Address;
            existing.Pincode = restaurant.Pincode;
            existing.CreatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
