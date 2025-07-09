using FoodieHubDeliverySystem.DTOs;
using FoodieHubDeliverySystem.Repository.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IOrderService
    {
        Task<OrderSummaryDto> GetOrderSummaryAsync(int userId);
        Task<OrderResultDto> PlaceOrderAsync(int userId, int paymentId);
        Task<List<OrderHistoryDto>> GetOrderHistoryAsync(int userId);

        
    }
}
