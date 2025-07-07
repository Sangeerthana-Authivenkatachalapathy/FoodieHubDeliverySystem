using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.DTOs;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<OrderSummaryDto> GetOrderSummaryAsync(int userId)
        {
            var cartItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .Include(c => c.MenuItem)
                .ToListAsync();

            if (!cartItems.Any())
                return null;

            var items = cartItems.Select(c => new OrderItemSummaryDto
            {
                ItemName = c.MenuItem.Name,
                Quantity = c.Quantity,
                PricePerUnit = c.MenuItem.Price,
                TotalPrice = c.Quantity * c.MenuItem.Price

            }).ToList();

            decimal grandTotal = items.Sum(i => i.TotalPrice);

            return new OrderSummaryDto
            {
                Items = items,
                TotalAmount = grandTotal,
            };


        }
        public async Task<OrderResultDto> PlaceOrderAsync(int userId, int paymentId)
        {
            var cartItems = await _context.CartItems
                .Where(ci => ci.UserId == userId)
                .Include(ci => ci.MenuItem)
                .ToListAsync();

            if (!cartItems.Any())
                return new OrderResultDto { IsSuccess = false, Message = "Cart is empty" };

            var foodOrder = new FoodOrder
            {
                UserId = userId,
                RestaurantId = cartItems.First().MenuItem.RestaurantId,
                OrderDate = DateTime.UtcNow,
                OrderStatus = OrderStatus.Placed,
                TotalAmount = cartItems.Sum(item => item.MenuItem.Price * item.Quantity),
                PaymentId = paymentId
            };

            var orderItems = cartItems.Select(ci => new OrderItem
            {
                MenuItemId = ci.MenuItemId,
                Quantity = ci.Quantity,
                Price = ci.MenuItem.Price
            }).ToList();

            foodOrder.OrderItems = orderItems;

            _context.FoodOrders.Add(foodOrder);
            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            return new OrderResultDto
            {
                IsSuccess = true,
                OrderId = foodOrder.OrderId,
                Message = "Order placed successfully"
            };
        }

        public async Task<List<OrderHistoryDto>> GetOrderHistoryAsync(int userId)
        {
            var orders = await _context.FoodOrders
                .Where(o => o.CustomerId == userId)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var result = orders.Select(o => new OrderHistoryDto
            {
                OrderId = o.OrderId,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                Status = o.Status.ToString(),
                Items = o.OrderItems.Select(oi => new OrderItemSummaryDto
                {
                    ItemName = oi.MenuItem.Name,
                    Quantity = oi.Quantity,
                    PricePerUnit = oi.Price,
                    TotalPrice = oi.Price * oi.Quantity
                }).ToList()
            }).ToList();

            return result;

        }
    }
}
