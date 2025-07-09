using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly AppDbContext _context;

        public InvoiceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<InvoiceDto?> GetInvoiceAsync(int orderId)
        {
            var order = await _context.FoodOrders
                .Include(o => o.User)
                .Include(o => o.Restaurant)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem)
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null) return null;

            return new InvoiceDto
            {
                OrderId = order.OrderId,
                CustomerName = order.User.Name,
                RestaurantName = order.Restaurant.RestaurantName,
                DeliveryAddress = $"{order.DeliveryAddress.AddressLine}, {order.DeliveryAddress.City}, {order.DeliveryAddress.Pincode}",
                OrderedAt = order.OrderDate,
                PaymentMethod = order.Payment?.PaymentMethod,
                PaymentStatus = order.Payment?.PaymentStatus.ToString(),
                Items = order.OrderItems.Select(oi => new InvoiceItemDto
                {
                    ItemName = oi.MenuItem.Name,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.Price
                }).ToList(),
                TotalAmount = order.OrderItems.Sum(oi => oi.Price * oi.Quantity)
            };
        }
    }

}
