using FoodieHubDeliverySystem.DTOs;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IDeliveryPartnerService
    {
        Task<DeliveryPartner> RegisterAsync(DeliveryPartnerRegisterDTO dto);
        Task<User?> ValidateCredentialsAsync(string email, string password);
        Task<DeliveryPartnerProfileDTO?> GetProfileAsync(int userId);
        Task<bool> UpdateProfileAsync(int userId, DeliveryPartnerUpdateDTO dto);
        Task<bool> ApproveDeliveryPartnerAsync(int userId);
        Task<bool> DeleteAsync(int userId);

        Task<IEnumerable<OrderDTO>> GetAssignedOrdersAsync(int deliveryPartnerId);
        Task<bool> AcceptOrderAsync(int orderId, int deliveryPartnerId);
        Task<bool> UpdateDeliveryStatusAsync(int orderId, string status);
        Task<IEnumerable<DeliveryHistoryDTO>> GetDeliveryHistoryAsync(int deliveryPartnerId);
    }
}
