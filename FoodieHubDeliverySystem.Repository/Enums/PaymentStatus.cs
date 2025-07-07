<<<<<<< HEAD
﻿using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
=======
﻿using System;
>>>>>>> 87cda9004bb817b7e4b1671514eb4b02eefd9943
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Enums
{
<<<<<<< HEAD
<<<<<<<< HEAD:FoodieHubDeliverySystem.Repository/Services/RestaurantService.cs
    public class RestaurantService : IRestaurantService
    {
        private readonly List<Restaurant> _restaurants;
        public Restaurant Create (Restaurant restaurant)
        {
            restaurant.Id = _restaurants.Count+1;
            _restaurants.Add(restaurant);
            return restaurant;
        }
        public IEnumerable<Restaurant> GetAll ()
        {
            return _restaurants;
        }
        public Restaurant GetById (int id)
        {
            return _restaurants.FirstOrDefault(r => r.Id == id);
        }
        public void Delete (int id)
        {
            var restaurant = GetById(id);
            if (restaurant != null)
            {
                _restaurants.Remove(restaurant);
            }
        }

========
=======
>>>>>>> 87cda9004bb817b7e4b1671514eb4b02eefd9943
    public enum PaymentStatus
    {
        Pending,
        Paid,
        Failed
<<<<<<< HEAD
>>>>>>>> 87cda9004bb817b7e4b1671514eb4b02eefd9943:FoodieHubDeliverySystem.Repository/Enums/PaymentStatus.cs
=======
>>>>>>> 87cda9004bb817b7e4b1671514eb4b02eefd9943
    }
}
