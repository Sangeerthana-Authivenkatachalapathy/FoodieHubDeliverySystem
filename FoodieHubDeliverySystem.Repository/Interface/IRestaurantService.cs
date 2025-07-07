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
        Restaurant Create(Restaurant restaurant);
        IEnumerable<Restaurant> GetAll();
        Restaurant GetById(int id);
        void Delete(int  id);
    }
}
