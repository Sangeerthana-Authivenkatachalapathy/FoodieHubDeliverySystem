using FoodieHubDeliverySystem.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface ICartItemService
    {
        Task<CartItem> AddItemAsync(CartItem item);
        Task<bool> UpdateQuantityAsync(int cartItemId, int quantity);
        Task<bool> RemoveItemAsync(int cartItemId);
        Task<CartItem> ApplyCouponAsync(int cartItemId, string couponCode);
        Task<IEnumerable<CartItem>> GetUserCartItemsAsync(int userId);
    }
}
