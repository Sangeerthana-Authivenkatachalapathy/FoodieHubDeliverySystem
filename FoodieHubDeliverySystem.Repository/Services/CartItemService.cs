using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly ICartItemRepository _cartItemRepository;

        public CartItemService(ICartItemRepository cartItemRepository)
        {
            _cartItemRepository = cartItemRepository;
        }

        public Task<CartItem> AddItemAsync(CartItem item) =>
            _cartItemRepository.AddItemAsync(item);

        public Task<bool> UpdateQuantityAsync(int cartItemId, int quantity) =>
            _cartItemRepository.UpdateQuantityAsync(cartItemId, quantity);

        public Task<bool> RemoveItemAsync(int cartItemId) =>
            _cartItemRepository.RemoveItemAsync(cartItemId);

        public Task<CartItem> ApplyCouponAsync(int cartItemId, string couponCode) =>
            _cartItemRepository.ApplyCouponAsync(cartItemId, couponCode);

        public Task<IEnumerable<CartItem>> GetUserCartItemsAsync(int userId) =>
            _cartItemRepository.GetUserCartItemsAsync(userId);
    }

}
