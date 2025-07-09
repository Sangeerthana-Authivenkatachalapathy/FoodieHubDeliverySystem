using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.DTOs;
namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IDeliveryPartnerRepository
    {

        // Profile Management (CRUD)
        Task<DeliveryPartner> RegisterAsync(DeliveryPartnerRegisterDTO dto);
        Task<User?> ValidateCredentialsAsync(string email, string password);
        Task<DeliveryPartnerProfileDTO?> GetProfileAsync(int userId);
        Task<bool> UpdateProfileAsync(int userId, DeliveryPartnerUpdateDTO dto);
        Task<bool> ApproveDeliveryPartnerAsync(int userId);
        Task<bool> DeleteAsync(int userId);

        // Delivery Operations
        Task<IEnumerable<OrderDTO>> GetAssignedOrdersAsync(int deliveryPartnerId);
        Task<bool> AcceptOrderAsync(int orderId, int deliveryPartnerId);
        Task<bool> UpdateDeliveryStatusAsync(int orderId, string status);
        Task<IEnumerable<DeliveryHistoryDTO>> GetDeliveryHistoryAsync(int deliveryPartnerId);
    }

    
}

