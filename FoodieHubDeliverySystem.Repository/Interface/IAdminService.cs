using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    internal interface IAdminService
    {
        bool Login(string username, string password);
        IEnumerable<User> GetAllUsers();
        IEnumerable<FoodOrder> GetAllOrders();
        void AddRestaurant(RestaurantDTO restaurant);
        void AddMenuItem(MenuItemDTO menuItem);
    }
}
