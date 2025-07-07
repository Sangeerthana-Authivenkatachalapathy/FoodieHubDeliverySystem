using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IRestaurantReviewService
    {
       Task <RestaurantReview> CreateAsync(RestaurantReview review);
       Task <IEnumerable<RestaurantReview>> GetAllAsync();
        Task <RestaurantReview> GetByIdAsync(int id);
        Task<RestaurantReview> DeleteAsync(int id);
    }
}
