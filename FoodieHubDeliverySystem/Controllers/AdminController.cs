using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodieHubDeliverySystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        private int GetCurrentAdminUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdClaim, out var userId) ? userId : 0;
        }

        #region Dashboard and Analytics

        [HttpGet("dashboard")]
        public async Task<ActionResult<DashboardSummaryDTO>> GetDashboardSummary()
        {
            var summary = await _adminService.GetDashboardSummaryAsync();
            return Ok(summary);
        }

        [HttpGet("financial-report")]
        public async Task<ActionResult<FinancialReportDTO>> GetFinancialReport(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var report = await _adminService.GetFinancialReportAsync(startDate, endDate);
            return Ok(report);
        }

        #endregion

        #region User Management

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserManagementDTO>>> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("users/{userId}")]
        public async Task<ActionResult<UserManagementDTO>> GetUserById(int userId)
        {
            var user = await _adminService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound("User not found");
            
            return Ok(user);
        }

        [HttpPut("users/status")]
        public async Task<ActionResult> UpdateUserStatus([FromBody] UpdateUserStatusDTO updateUserStatus)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.UpdateUserStatusAsync(updateUserStatus, adminUserId);
            
            if (!result)
                return BadRequest("Failed to update user status");
            
            return Ok("User status updated successfully");
        }

        [HttpDelete("users/{userId}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.DeleteUserAsync(userId, adminUserId);
            
            if (!result)
                return NotFound("User not found");
            
            return Ok("User deleted successfully");
        }

        #endregion

        #region Restaurant Management

        [HttpGet("restaurants")]
        public async Task<ActionResult<IEnumerable<RestaurantApprovalDTO>>> GetRestaurants()
        {
            var restaurants = await _adminService.GetRestaurantsAsync();
            return Ok(restaurants);
        }

        [HttpGet("restaurants/pending")]
        public async Task<ActionResult<IEnumerable<RestaurantApprovalDTO>>> GetPendingRestaurantApprovals()
        {
            var pendingRestaurants = await _adminService.GetPendingRestaurantApprovalsAsync();
            return Ok(pendingRestaurants);
        }

        [HttpPost("restaurants/approve")]
        public async Task<ActionResult> ApproveRestaurant([FromBody] RestaurantActionDTO actionDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.ApproveRestaurantAsync(actionDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to approve restaurant");
            
            return Ok("Restaurant approved successfully");
        }

        [HttpPost("restaurants/reject")]
        public async Task<ActionResult> RejectRestaurant([FromBody] RestaurantActionDTO actionDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.RejectRestaurantAsync(actionDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to reject restaurant");
            
            return Ok("Restaurant rejected successfully");
        }

        #endregion

        #region Delivery Partner Management

        [HttpGet("delivery-partners")]
        public async Task<ActionResult<IEnumerable<DeliveryPartnerApprovalDTO>>> GetAllDeliveryPartners()
        {
            var deliveryPartners = await _adminService.GetAllDeliveryPartnersAsync();
            return Ok(deliveryPartners);
        }

        [HttpGet("delivery-partners/pending")]
        public async Task<ActionResult<IEnumerable<DeliveryPartnerApprovalDTO>>> GetPendingDeliveryPartnerApprovals()
        {
            var pendingPartners = await _adminService.GetPendingDeliveryPartnerApprovalsAsync();
            return Ok(pendingPartners);
        }

        [HttpPost("delivery-partners/approve")]
        public async Task<ActionResult> ApproveDeliveryPartner([FromBody] DeliveryPartnerActionDTO actionDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.ApproveDeliveryPartnerAsync(actionDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to approve delivery partner");
            
            return Ok("Delivery partner approved successfully");
        }

        [HttpPost("delivery-partners/reject")]
        public async Task<ActionResult> RejectDeliveryPartner([FromBody] DeliveryPartnerActionDTO actionDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.RejectDeliveryPartnerAsync(actionDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to reject delivery partner");
            
            return Ok("Delivery partner rejected successfully");
        }

        #endregion

        #region Order Management

        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<AdminOrderDTO>>> GetOrdersByStatus([FromQuery] OrderStatus? status = null)
        {
            var orders = await _adminService.GetOrdersByStatusAsync(status);
            return Ok(orders);
        }

        [HttpGet("orders/{orderId}")]
        public async Task<ActionResult<AdminOrderDTO>> GetOrderById(int orderId)
        {
            var order = await _adminService.GetOrderByIdAsync(orderId);
            if (order == null)
                return NotFound("Order not found");
            
            return Ok(order);
        }

        #endregion

        #region Feedback Management

        [HttpGet("feedback")]
        public async Task<ActionResult<IEnumerable<FeedbackDTO>>> GetAllFeedback()
        {
            var feedback = await _adminService.GetAllFeedbackAsync();
            return Ok(feedback);
        }

        [HttpGet("feedback/unresolved")]
        public async Task<ActionResult<IEnumerable<FeedbackDTO>>> GetUnresolvedFeedback()
        {
            var unresolvedFeedback = await _adminService.GetUnresolvedFeedbackAsync();
            return Ok(unresolvedFeedback);
        }

        [HttpPost("feedback/respond")]
        public async Task<ActionResult> RespondToFeedback([FromBody] RespondToFeedbackDTO respondDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.RespondToFeedbackAsync(respondDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to respond to feedback");
            
            return Ok("Response sent successfully");
        }

        #endregion

        #region Notification Management

        [HttpGet("notifications")]
        public async Task<ActionResult<IEnumerable<NotificationDTO>>> GetNotifications([FromQuery] int? userId = null)
        {
            var notifications = await _adminService.GetNotificationsAsync(userId);
            return Ok(notifications);
        }

        [HttpPut("notifications/{notificationId}/mark-read")]
        public async Task<ActionResult> MarkNotificationAsRead(int notificationId)
        {
            var result = await _adminService.MarkNotificationAsReadAsync(notificationId);
            
            if (!result)
                return NotFound("Notification not found");
            
            return Ok("Notification marked as read");
        }

        [HttpDelete("notifications/{notificationId}")]
        public async Task<ActionResult> DeleteNotification(int notificationId)
        {
            var result = await _adminService.DeleteNotificationAsync(notificationId);
            
            if (!result)
                return NotFound("Notification not found");
            
            return Ok("Notification deleted successfully");
        }

        [HttpPost("notifications")]
        public async Task<ActionResult> CreateNotification([FromBody] CreateNotificationDTO notificationDto)
        {
            var adminUserId = GetCurrentAdminUserId();
            var result = await _adminService.CreateNotificationAsync(notificationDto, adminUserId);
            
            if (!result)
                return BadRequest("Failed to create notification");
            
            return Ok("Notification created successfully");
        }

        #endregion
    }
}