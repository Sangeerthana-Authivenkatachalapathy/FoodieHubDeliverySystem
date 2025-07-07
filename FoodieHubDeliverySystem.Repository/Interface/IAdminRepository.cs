using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    internal interface IAdminRepository
    {
        
            Admin GetAdminByUsername(string username);
            IEnumerable<User> GetUsers();
            IEnumerable<Order> GetOrders();
            void SaveRestaurant(Restaurant restaurant);
            void SaveMenuItem(MenuItem menuItem);
        

    }
}
