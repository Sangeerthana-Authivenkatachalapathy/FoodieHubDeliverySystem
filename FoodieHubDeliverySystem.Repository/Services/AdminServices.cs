
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class AdminService : IAdminService
    {
        public readonly IAdminRepository _repository;

        public AdminService(IAdminRepository repository)
        {
            _repository = repository;
        }

        public bool Login(string username, string password)
        {
            var admin = _repository.GetAdminByUsername(username);
            return admin != null && admin.PasswordHash == HashPassword(password);
        }

        public IEnumerable<User> GetAllUsers() => _repository.GetUsers();

        public IEnumerable<Order> GetAllOrders() => _repository.GetOrders();

        public void AddRestaurant(RestaurantDTO dto)
        {
            var restaurant = new Restaurant { Name = dto.Name, Location = dto.Location };
            _repository.SaveRestaurant(restaurant);
        }

        public void AddMenuItem(MenuItemDTO dto)
        {
            var item = new MenuItem { Name = dto.Name, Price = dto.Price, RestaurantId = dto.RestaurantId };
            _repository.SaveMenuItem(item);
        }

        private string HashPassword(string password)
        {
            // Simplified hash for example
            return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}
