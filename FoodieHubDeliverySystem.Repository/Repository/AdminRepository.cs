
using FoodieHubDeliverySystem.Repository.Interface;

using FoodieHubDeliverySystem.Repository.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Repository
{
    public class AdminRepository : IAdminRepository
    {
        // Simulated data store
        private List<User> admins = new List<User>
    {
        new User { Id = 1, Username = "admin", PasswordHash = "YWRtaW4=", Email = "admin@example.com" ,Role="Admin",IsActive=true}
    };

        //private List<User> users = new List<User>();
        private List<Order> orders = new List<Order>();
        private List<Restaurant> restaurants = new List<Restaurant>();
        private List<MenuItem> menuItems = new List<MenuItem>();

        public User GetAdminByUsername(string username) =>
            users.FirstOrDefault(a => a.Username == username && uint.Role == "Admin");

        public IEnumerable<User> GetUsers() => users;

        public IEnumerable<Order> GetOrders() => orders;

        public void SaveRestaurant(Restaurant restaurant) => restaurants.Add(restaurant);

        public void SaveMenuItem(MenuItem menuItem) => menuItems.Add(menuItem);
    }

}

