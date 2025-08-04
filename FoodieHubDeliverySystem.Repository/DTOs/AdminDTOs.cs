using FoodieHubDeliverySystem.Repository.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic; // Added for List<RestaurantRevenueDTO>

namespace FoodieHubDeliverySystem.Repository.DTOs
{
    // Dashboard Summary DTO
    public class DashboardSummaryDTO
    {
        public int TotalUsers { get; set; }
        public int TotalCustomers { get; set; }
        public int TotalRestaurants { get; set; }
        public int TotalDeliveryPartners { get; set; }
        public int PendingRestaurantApprovals { get; set; }
        public int PendingDeliveryPartnerApprovals { get; set; }
        public int TotalOrdersToday { get; set; }
        public decimal TotalRevenueToday { get; set; }
        public int ActiveOrders { get; set; }
        public int UnresolvedFeedbacks { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    // User Management DTOs
    public class UserManagementDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public UserRole Role { get; set; }
        public bool IsApproved { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public int TotalOrders { get; set; }
    }

    public class UpdateUserStatusDTO
    {
        [Required]
        public int UserId { get; set; }
        
        public bool? IsApproved { get; set; }
        
        public bool? IsActive { get; set; }
        
        public string? Reason { get; set; }
    }

    // Restaurant Management DTOs
    public class RestaurantApprovalDTO
    {
        public int RestaurantId { get; set; }
        public string RestaurantName { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        public string LicenseNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public string LicenseCertification { get; set; }
        public DateTime ApplicationDate { get; set; }
        public bool IsApproved { get; set; }
        public string? RejectionReason { get; set; }
    }

    public class RestaurantActionDTO
    {
        [Required]
        public int RestaurantId { get; set; }
        
        [Required]
        public bool IsApproved { get; set; }
        
        public string? Reason { get; set; }
    }

    // Delivery Partner Management DTOs
    public class DeliveryPartnerApprovalDTO
    {
        public int DeliveryPartnerId { get; set; }
        public string PartnerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string VehicleType { get; set; }
        public string LicenseNumber { get; set; }
        public string GovernmentIdNumber { get; set; }
        public string GovernmentIdUrl { get; set; }
        public string LicenseDocumentUrl { get; set; }
        public DateTime ApplicationDate { get; set; }
        public bool IsApproved { get; set; }
        public string? RejectionReason { get; set; }
    }

    public class DeliveryPartnerActionDTO
    {
        [Required]
        public int DeliveryPartnerId { get; set; }
        
        [Required]
        public bool IsApproved { get; set; }
        
        public string? Reason { get; set; }
    }

    // Financial Report DTOs
    public class FinancialReportDTO
    {
        public DateTime ReportDate { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalCommission { get; set; }
        public decimal TotalDeliveryFees { get; set; }
        public decimal TotalRefunds { get; set; }
        public int TotalOrders { get; set; }
        public int CompletedOrders { get; set; }
        public int CancelledOrders { get; set; }
        public decimal AverageOrderValue { get; set; }
        public List<RestaurantRevenueDTO> TopRestaurants { get; set; }
        public List<DailyRevenueDTO> DailyBreakdown { get; set; }
    }

    public class RestaurantRevenueDTO
    {
        public int RestaurantId { get; set; }
        public string RestaurantName { get; set; }
        public decimal Revenue { get; set; }
        public int OrderCount { get; set; }
    }

    public class DailyRevenueDTO
    {
        public DateTime Date { get; set; }
        public decimal Revenue { get; set; }
        public int OrderCount { get; set; }
    }

    // Feedback Management DTOs
    public class FeedbackDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Category { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsResolved { get; set; }
        public string? AdminResponse { get; set; }
        public DateTime? ResponseDate { get; set; }
        public string? RespondedByAdminName { get; set; }
        public int? OrderId { get; set; }
        public int? RestaurantId { get; set; }
        public string? RestaurantName { get; set; }
    }

    public class RespondToFeedbackDTO
    {
        [Required]
        public int FeedbackId { get; set; }
        
        [Required]
        public string Response { get; set; }
        
        public bool MarkAsResolved { get; set; } = true;
    }

    // Notification Management DTOs
    public class NotificationDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string NotificationType { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public string? RelatedEntityId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }

    public class CreateNotificationDTO
    {
        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Message { get; set; }
        
        public int? UserId { get; set; } // If null, send to all users
        
        public UserRole? TargetRole { get; set; } // If specified, send to all users with this role
        
        [Required]
        public string NotificationType { get; set; }
        
        public string? RelatedEntityId { get; set; }
    }

    // Order Management DTOs
    public class AdminOrderDTO
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string RestaurantName { get; set; }
        public string DeliveryPartnerName { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? EstimatedDeliveryTime { get; set; }
        public string DeliveryAddress { get; set; }
        public List<OrderItemSummaryDto> OrderItems { get; set; }
    }
}