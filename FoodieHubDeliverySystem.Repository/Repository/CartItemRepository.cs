using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Repository
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly AppDbContext _context;

        public CartItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CartItem> AddItemAsync(CartItem item)
        {
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateQuantityAsync(int cartItemId, int quantity)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item == null) return false;
            item.Quantity = quantity;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RemoveItemAsync(int cartItemId)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item == null) return false;
            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CartItem> ApplyCouponAsync(int cartItemId, string couponCode)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item == null) return null;
            // demo: assume fixed discount
            item.AppliedCoupon = couponCode;
            item.Discount = 10;
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<IEnumerable<CartItem>> GetUserCartItemsAsync(int userId)
        {
            return await _context.CartItems.Where(ci => ci.UserId == userId).ToListAsync();
        }
    }

}
