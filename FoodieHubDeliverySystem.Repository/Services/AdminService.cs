using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardDTO> GetDashboardSummaryAsync()
        {
            return new DashboardDTO
            {
                TotalUsers = await _context.Users.CountAsync(),
                ActiveUsers = await _context.Users.CountAsync(u => u.IsApproved),
                TotalOrders = await _context.FoodOrders.CountAsync(),
                TotalSales = await _context.FoodOrders.SumAsync(o => (double)o.TotalAmount),
                TopRestaurants = await _context.RestaurantDetails
                    .OrderByDescending(r => r.CreatedAt)
                    .Select(r => r.RestaurantName)
                    .ToListAsync(),

                PendingRestaurants = await _context.RestaurantDetails.CountAsync(r => r.Status == RestaurantStatus.Pending),

                FeedbackCount = await _context.RestaurantReviews.CountAsync(),
                UnreadNotifications = 0 // Placeholder since Notifications table doesn't exist yet
            };
        }

        //User--> get, update, delete
    }

    public class DashboardDTO
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int TotalOrders { get; set; }
        public double TotalSales { get; set; }
        public List<string> TopRestaurants { get; set; }
        public int PendingRestaurants { get; set; }
        public int FeedbackCount { get; set; }
        public int UnreadNotifications { get; set; }
    }
}