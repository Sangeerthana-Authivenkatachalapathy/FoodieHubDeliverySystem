using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly AppDbContext _context;

        public CartItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CartItem> AddItemAsync(CartItem item)
        {
            item.AddedAt = DateTime.UtcNow;
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> UpdateQuantityAsync(int cartItemId, int quantity)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            if (item == null) return false;

            item.Quantity = quantity;
            item.UpdatedAt = DateTime.UtcNow;

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

            item.AppliedCoupon = couponCode;
            item.Discount = 10; // Example fixed discount
            item.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<IEnumerable<CartItem>> GetUserCartItemsAsync(int userId)
        {
            return await _context.CartItems
                .Where(ci => ci.UserId == userId && ci.IsActive)
                .Include(ci => ci.MenuItem)
                .ToListAsync();
        }
    }
}
