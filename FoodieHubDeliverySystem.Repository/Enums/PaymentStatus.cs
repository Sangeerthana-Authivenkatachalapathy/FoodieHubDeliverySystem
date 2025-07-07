using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Enums
{

    public class RestaurantService : IRestaurantService
    {
        private readonly List<Restaurant> _restaurants;
        public Restaurant Create(Restaurant restaurant)
        {
            restaurant.Id = _restaurants.Count + 1;
            _restaurants.Add(restaurant);
            return restaurant;
        }
        public IEnumerable<Restaurant> GetAll()
        {
            return _restaurants;
        }
        public Restaurant GetById(int id)
        {
            return _restaurants.FirstOrDefault(r => r.Id == id);
        }
        public void Delete(int id)
        {
            var restaurant = GetById(id);
            if (restaurant != null)
            {
                _restaurants.Remove(restaurant);
            }
        }


        public enum PaymentStatus
        {
            Pending,
            Paid,
            Failed

        }
    }
}
