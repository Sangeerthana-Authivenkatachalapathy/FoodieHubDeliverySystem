using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Data
{
    public class AppDbContext: DbContext
    {
        public object Restaurant;

        public DbSet<Restaurant> RestaurantDetails { get; set; }
        public DbSet<RestaurantReview> restaurantReviews { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Restaurant>();
        } 
    }
}
