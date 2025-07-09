using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class RestaurantReviewService : IRestaurantReviewService
    {
        // Simulated in-memory data store
        private readonly List<RestaurantReview> reviews = new();

        // Create a new review
        public async Task<RestaurantReview> CreateAsync(RestaurantReview review)
        {
            review.Id = reviews.Count + 1;
            review.CreatedAt = DateTime.UtcNow;
            reviews.Add(review);
            return await Task.FromResult(review);
        }

        // Get all reviews
        public async Task<IEnumerable<RestaurantReview>> GetAllAsync()
        {
            return await Task.FromResult(reviews);
        }

        // Get a review by ID
        public async Task<RestaurantReview> GetByIdAsync(int id)
        {
            var review = reviews.FirstOrDefault(r => r.Id == id);
            return await Task.FromResult(review);
        }

        // Delete a review by ID
        public async Task<RestaurantReview> DeleteAsync(int id)
        {
            var review = reviews.FirstOrDefault(r => r.Id == id);
            if (review != null)
            {
                reviews.Remove(review);
            }
            return await Task.FromResult(review);
        }
    }
}
