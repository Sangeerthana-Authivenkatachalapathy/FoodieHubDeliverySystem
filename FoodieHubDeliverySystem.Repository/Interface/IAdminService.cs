using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Models;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IAdminService
    {
        // User Management
        Task<IEnumerable<UserManagementDTO>> GetAllUsersAsync();
        Task<UserManagementDTO> GetUserByIdAsync(int userId);
        Task<bool> UpdateUserStatusAsync(UpdateUserStatusDTO updateUserStatus, int adminUserId);
        Task<bool> DeleteUserAsync(int userId, int adminUserId);

        // Dashboard and Analytics
        Task<DashboardSummaryDTO> GetDashboardSummaryAsync();
        Task<FinancialReportDTO> GetFinancialReportAsync(DateTime startDate, DateTime endDate);

        // Restaurant Management
        Task<IEnumerable<RestaurantApprovalDTO>> GetRestaurantsAsync();
        Task<IEnumerable<RestaurantApprovalDTO>> GetPendingRestaurantApprovalsAsync();
        Task<bool> ApproveRestaurantAsync(RestaurantActionDTO actionDto, int adminUserId);
        Task<bool> RejectRestaurantAsync(RestaurantActionDTO actionDto, int adminUserId);

        // Delivery Partner Management
        Task<IEnumerable<DeliveryPartnerApprovalDTO>> GetAllDeliveryPartnersAsync();
        Task<IEnumerable<DeliveryPartnerApprovalDTO>> GetPendingDeliveryPartnerApprovalsAsync();
        Task<bool> ApproveDeliveryPartnerAsync(DeliveryPartnerActionDTO actionDto, int adminUserId);
        Task<bool> RejectDeliveryPartnerAsync(DeliveryPartnerActionDTO actionDto, int adminUserId);

        // Order Management
        Task<IEnumerable<AdminOrderDTO>> GetOrdersByStatusAsync(OrderStatus? status = null);
        Task<AdminOrderDTO> GetOrderByIdAsync(int orderId);

        // Feedback Management
        Task<IEnumerable<FeedbackDTO>> GetAllFeedbackAsync();
        Task<IEnumerable<FeedbackDTO>> GetUnresolvedFeedbackAsync();
        Task<bool> RespondToFeedbackAsync(RespondToFeedbackDTO respondDto, int adminUserId);

        // Notification Management
        Task<IEnumerable<NotificationDTO>> GetNotificationsAsync(int? userId = null);
        Task<bool> MarkNotificationAsReadAsync(int notificationId);
        Task<bool> DeleteNotificationAsync(int notificationId);
        Task<bool> CreateNotificationAsync(CreateNotificationDTO notificationDto, int adminUserId);

        // Audit and Logging
        Task<bool> LogAdminActionAsync(int adminUserId, string action, string entityType, 
            string entityId, string? oldValues = null, string? newValues = null, string? reason = null);
    }
}