using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Enums;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Models.FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        #region User Management

        public async Task<IEnumerable<UserManagementDTO>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Select(u => new UserManagementDTO
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role,
                    IsApproved = u.IsApproved,
                    IsActive = true, // Assuming we need to track this separately or use IsApproved
                    CreatedDate = DateTime.UtcNow, // You might want to add this field to User model
                    LastLoginDate = null, // You might want to add this field to User model
                    TotalOrders = u.FoodOrders.Count()
                })
                .ToListAsync();

            return users;
        }

        public async Task<UserManagementDTO> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.FoodOrders)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                return null;

            return new UserManagementDTO
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                IsApproved = user.IsApproved,
                IsActive = true,
                CreatedDate = DateTime.UtcNow,
                LastLoginDate = null,
                TotalOrders = user.FoodOrders.Count()
            };
        }

        public async Task<bool> UpdateUserStatusAsync(UpdateUserStatusDTO updateUserStatus, int adminUserId)
        {
            var user = await _context.Users.FindAsync(updateUserStatus.UserId);
            if (user == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { user.IsApproved });

            if (updateUserStatus.IsApproved.HasValue)
                user.IsApproved = updateUserStatus.IsApproved.Value;

            var newValues = JsonSerializer.Serialize(new { user.IsApproved });

            await _context.SaveChangesAsync();

            // Log the action
            await LogAdminActionAsync(adminUserId, "UpdateUserStatus", "User", 
                user.UserId.ToString(), oldValues, newValues, updateUserStatus.Reason);

            return true;
        }

        public async Task<bool> DeleteUserAsync(int userId, int adminUserId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            var oldValues = JsonSerializer.Serialize(user);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            // Log the action
            await LogAdminActionAsync(adminUserId, "DeleteUser", "User", 
                userId.ToString(), oldValues, null, "User deleted by admin");

            return true;
        }

        #endregion

        #region Dashboard and Analytics

        public async Task<DashboardSummaryDTO> GetDashboardSummaryAsync()
        {
            var today = DateTime.Today;

            var summary = new DashboardSummaryDTO
            {
                TotalUsers = await _context.Users.CountAsync(),
                TotalCustomers = await _context.Users.CountAsync(u => u.Role == UserRole.Customer),
                TotalRestaurants = await _context.RestaurantDetails.CountAsync(),
                TotalDeliveryPartners = await _context.DeliveryPartners.CountAsync(),
                PendingRestaurantApprovals = await _context.RestaurantDetails
                    .Join(_context.Users, r => r.UserId, u => u.UserId, (r, u) => new { r, u })
                    .CountAsync(x => !x.u.IsApproved && x.u.Role == UserRole.Restaurant),
                PendingDeliveryPartnerApprovals = await _context.DeliveryPartners
                    .Join(_context.Users, dp => dp.UserId, u => u.UserId, (dp, u) => new { dp, u })
                    .CountAsync(x => !x.u.IsApproved && x.u.Role == UserRole.DeliveryPartner),
                TotalOrdersToday = await _context.FoodOrders.CountAsync(o => o.OrderDate.Date == today),
                TotalRevenueToday = await _context.FoodOrders
                    .Where(o => o.OrderDate.Date == today && o.OrderStatus == OrderStatus.Delivered)
                    .SumAsync(o => o.TotalAmount),
                ActiveOrders = await _context.FoodOrders.CountAsync(o => 
                    o.OrderStatus == OrderStatus.Placed || 
                    o.OrderStatus == OrderStatus.Preparing || 
                    o.OrderStatus == OrderStatus.OutForDelivery),
                UnresolvedFeedbacks = await _context.Feedbacks.CountAsync(f => !f.IsResolved),
                LastUpdated = DateTime.UtcNow
            };

            return summary;
        }

        public async Task<FinancialReportDTO> GetFinancialReportAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await _context.FoodOrders
                .Include(o => o.Restaurant)
                .Where(o => o.OrderDate >= startDate && o.OrderDate <= endDate)
                .ToListAsync();

            var completedOrders = orders.Where(o => o.OrderStatus == OrderStatus.Delivered).ToList();
            var cancelledOrders = orders.Where(o => o.OrderStatus != OrderStatus.Delivered).ToList();

            var totalRevenue = completedOrders.Sum(o => o.TotalAmount);
            var totalCommission = totalRevenue * 0.1m; // Assuming 10% commission
            var totalDeliveryFees = completedOrders.Count * 50m; // Assuming ₹50 delivery fee per order

            var topRestaurants = completedOrders
                .GroupBy(o => new { o.RestaurantId, o.Restaurant.RestaurantName })
                .Select(g => new RestaurantRevenueDTO
                {
                    RestaurantId = g.Key.RestaurantId,
                    RestaurantName = g.Key.RestaurantName,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderByDescending(r => r.Revenue)
                .Take(10)
                .ToList();

            var dailyBreakdown = completedOrders
                .GroupBy(o => o.OrderDate.Date)
                .Select(g => new DailyRevenueDTO
                {
                    Date = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();

            return new FinancialReportDTO
            {
                ReportDate = DateTime.UtcNow,
                TotalRevenue = totalRevenue,
                TotalCommission = totalCommission,
                TotalDeliveryFees = totalDeliveryFees,
                TotalRefunds = 0, // You might want to track refunds separately
                TotalOrders = orders.Count,
                CompletedOrders = completedOrders.Count,
                CancelledOrders = cancelledOrders.Count,
                AverageOrderValue = completedOrders.Any() ? completedOrders.Average(o => o.TotalAmount) : 0,
                TopRestaurants = topRestaurants,
                DailyBreakdown = dailyBreakdown
            };
        }

        #endregion

        #region Restaurant Management

        public async Task<IEnumerable<RestaurantApprovalDTO>> GetRestaurantsAsync()
        {
            var restaurants = await _context.RestaurantDetails
                .Include(r => r.User)
                .Select(r => new RestaurantApprovalDTO
                {
                    RestaurantId = r.Id,
                    RestaurantName = r.RestaurantName,
                    OwnerName = r.User.Name,
                    OwnerEmail = r.User.Email,
                    LicenseNumber = r.LicenseNumber,
                    Address = r.Address,
                    City = r.City,
                    Pincode = r.Pincode,
                    LicenseCertification = r.LicenseCretification,
                    ApplicationDate = r.CreatedAt,
                    IsApproved = r.User.IsApproved,
                    RejectionReason = null // You might want to track this
                })
                .ToListAsync();

            return restaurants;
        }

        public async Task<IEnumerable<RestaurantApprovalDTO>> GetPendingRestaurantApprovalsAsync()
        {
            var pendingRestaurants = await _context.RestaurantDetails
                .Include(r => r.User)
                .Where(r => !r.User.IsApproved && r.User.Role == UserRole.Restaurant)
                .Select(r => new RestaurantApprovalDTO
                {
                    RestaurantId = r.Id,
                    RestaurantName = r.RestaurantName,
                    OwnerName = r.User.Name,
                    OwnerEmail = r.User.Email,
                    LicenseNumber = r.LicenseNumber,
                    Address = r.Address,
                    City = r.City,
                    Pincode = r.Pincode,
                    LicenseCertification = r.LicenseCretification,
                    ApplicationDate = r.CreatedAt,
                    IsApproved = r.User.IsApproved,
                    RejectionReason = null
                })
                .ToListAsync();

            return pendingRestaurants;
        }

        public async Task<bool> ApproveRestaurantAsync(RestaurantActionDTO actionDto, int adminUserId)
        {
            var restaurant = await _context.RestaurantDetails
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == actionDto.RestaurantId);

            if (restaurant == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { restaurant.User.IsApproved });

            restaurant.User.IsApproved = actionDto.IsApproved;

            var newValues = JsonSerializer.Serialize(new { restaurant.User.IsApproved });

            await _context.SaveChangesAsync();

            // Create notification
            await CreateNotificationAsync(new CreateNotificationDTO
            {
                Title = "Restaurant Application Approved",
                Message = $"Your restaurant '{restaurant.RestaurantName}' has been approved and is now live on our platform!",
                UserId = restaurant.UserId,
                NotificationType = "Approval",
                RelatedEntityId = restaurant.Id.ToString()
            }, adminUserId);

            // Log the action
            await LogAdminActionAsync(adminUserId, "ApproveRestaurant", "Restaurant",
                actionDto.RestaurantId.ToString(), oldValues, newValues, actionDto.Reason);

            return true;
        }

        public async Task<bool> RejectRestaurantAsync(RestaurantActionDTO actionDto, int adminUserId)
        {
            var restaurant = await _context.RestaurantDetails
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == actionDto.RestaurantId);

            if (restaurant == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { restaurant.User.IsApproved });

            restaurant.User.IsApproved = false;

            var newValues = JsonSerializer.Serialize(new { restaurant.User.IsApproved });

            await _context.SaveChangesAsync();

            // Create notification
            await CreateNotificationAsync(new CreateNotificationDTO
            {
                Title = "Restaurant Application Rejected",
                Message = $"Your restaurant application has been rejected. Reason: {actionDto.Reason}",
                UserId = restaurant.UserId,
                NotificationType = "Rejection",
                RelatedEntityId = restaurant.Id.ToString()
            }, adminUserId);

            // Log the action
            await LogAdminActionAsync(adminUserId, "RejectRestaurant", "Restaurant",
                actionDto.RestaurantId.ToString(), oldValues, newValues, actionDto.Reason);

            return true;
        }

        #endregion

        #region Delivery Partner Management

        public async Task<IEnumerable<DeliveryPartnerApprovalDTO>> GetAllDeliveryPartnersAsync()
        {
            var deliveryPartners = await _context.DeliveryPartners
                .Include(dp => dp.User)
                .Select(dp => new DeliveryPartnerApprovalDTO
                {
                    DeliveryPartnerId = dp.Id,
                    PartnerName = dp.User.Name,
                    Email = dp.User.Email,
                    PhoneNumber = dp.User.PhoneNumber,
                    VehicleType = dp.VehicleType,
                    LicenseNumber = dp.LicenseNumber,
                    GovernmentIdNumber = dp.GovernmentIdNumber,
                    GovernmentIdUrl = dp.GovernmentIdUrl,
                    LicenseDocumentUrl = dp.LicenseDocumentUrl,
                    ApplicationDate = DateTime.UtcNow, // You might want to add this field
                    IsApproved = dp.User.IsApproved,
                    RejectionReason = null
                })
                .ToListAsync();

            return deliveryPartners;
        }

        public async Task<IEnumerable<DeliveryPartnerApprovalDTO>> GetPendingDeliveryPartnerApprovalsAsync()
        {
            var pendingPartners = await _context.DeliveryPartners
                .Include(dp => dp.User)
                .Where(dp => !dp.User.IsApproved && dp.User.Role == UserRole.DeliveryPartner)
                .Select(dp => new DeliveryPartnerApprovalDTO
                {
                    DeliveryPartnerId = dp.Id,
                    PartnerName = dp.User.Name,
                    Email = dp.User.Email,
                    PhoneNumber = dp.User.PhoneNumber,
                    VehicleType = dp.VehicleType,
                    LicenseNumber = dp.LicenseNumber,
                    GovernmentIdNumber = dp.GovernmentIdNumber,
                    GovernmentIdUrl = dp.GovernmentIdUrl,
                    LicenseDocumentUrl = dp.LicenseDocumentUrl,
                    ApplicationDate = DateTime.UtcNow,
                    IsApproved = dp.User.IsApproved,
                    RejectionReason = null
                })
                .ToListAsync();

            return pendingPartners;
        }

        public async Task<bool> ApproveDeliveryPartnerAsync(DeliveryPartnerActionDTO actionDto, int adminUserId)
        {
            var deliveryPartner = await _context.DeliveryPartners
                .Include(dp => dp.User)
                .FirstOrDefaultAsync(dp => dp.Id == actionDto.DeliveryPartnerId);

            if (deliveryPartner == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { deliveryPartner.User.IsApproved });

            deliveryPartner.User.IsApproved = actionDto.IsApproved;

            var newValues = JsonSerializer.Serialize(new { deliveryPartner.User.IsApproved });

            await _context.SaveChangesAsync();

            // Create notification
            await CreateNotificationAsync(new CreateNotificationDTO
            {
                Title = "Delivery Partner Application Approved",
                Message = "Congratulations! Your delivery partner application has been approved. You can now start accepting delivery orders.",
                UserId = deliveryPartner.UserId,
                NotificationType = "Approval",
                RelatedEntityId = deliveryPartner.Id.ToString()
            }, adminUserId);

            // Log the action
            await LogAdminActionAsync(adminUserId, "ApproveDeliveryPartner", "DeliveryPartner",
                actionDto.DeliveryPartnerId.ToString(), oldValues, newValues, actionDto.Reason);

            return true;
        }

        public async Task<bool> RejectDeliveryPartnerAsync(DeliveryPartnerActionDTO actionDto, int adminUserId)
        {
            var deliveryPartner = await _context.DeliveryPartners
                .Include(dp => dp.User)
                .FirstOrDefaultAsync(dp => dp.Id == actionDto.DeliveryPartnerId);

            if (deliveryPartner == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { deliveryPartner.User.IsApproved });

            deliveryPartner.User.IsApproved = false;

            var newValues = JsonSerializer.Serialize(new { deliveryPartner.User.IsApproved });

            await _context.SaveChangesAsync();

            // Create notification
            await CreateNotificationAsync(new CreateNotificationDTO
            {
                Title = "Delivery Partner Application Rejected",
                Message = $"Your delivery partner application has been rejected. Reason: {actionDto.Reason}",
                UserId = deliveryPartner.UserId,
                NotificationType = "Rejection",
                RelatedEntityId = deliveryPartner.Id.ToString()
            }, adminUserId);

            // Log the action
            await LogAdminActionAsync(adminUserId, "RejectDeliveryPartner", "DeliveryPartner",
                actionDto.DeliveryPartnerId.ToString(), oldValues, newValues, actionDto.Reason);

            return true;
        }

        #endregion

        #region Order Management

        public async Task<IEnumerable<AdminOrderDTO>> GetOrdersByStatusAsync(OrderStatus? status = null)
        {
            var query = _context.FoodOrders
                .Include(o => o.User)
                .Include(o => o.Restaurant)
                .Include(o => o.DeliveryPartner)
                .ThenInclude(dp => dp.User)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuItem)
                .AsQueryable();

            if (status.HasValue)
                query = query.Where(o => o.OrderStatus == status.Value);

            var orders = await query
                .Select(o => new AdminOrderDTO
                {
                    OrderId = o.OrderId,
                    CustomerName = o.User.Name,
                    CustomerEmail = o.User.Email,
                    RestaurantName = o.Restaurant.RestaurantName,
                    DeliveryPartnerName = o.DeliveryPartner != null ? o.DeliveryPartner.User.Name : "Not Assigned",
                    TotalAmount = o.TotalAmount,
                    Status = o.OrderStatus,
                    OrderDate = o.OrderDate,
                    EstimatedDeliveryTime = o.EstimatedDeliveryTime,
                    DeliveryAddress = o.DeliveryAddress != null ? 
                        $"{o.DeliveryAddress.AddressLine}, {o.DeliveryAddress.City}, {o.DeliveryAddress.Pincode}" : "N/A",
                    OrderItems = o.OrderItems.Select(oi => new OrderItemSummaryDto
                    {
                        MenuItemName = oi.MenuItem.Name,
                        Quantity = oi.Quantity,
                        Price = oi.Price
                    }).ToList()
                })
                .ToListAsync();

            return orders;
        }

        public async Task<AdminOrderDTO> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.FoodOrders
                .Include(o => o.User)
                .Include(o => o.Restaurant)
                .Include(o => o.DeliveryPartner)
                .ThenInclude(dp => dp.User)
                .Include(o => o.DeliveryAddress)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuItem)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
                return null;

            return new AdminOrderDTO
            {
                OrderId = order.OrderId,
                CustomerName = order.User.Name,
                CustomerEmail = order.User.Email,
                RestaurantName = order.Restaurant.RestaurantName,
                DeliveryPartnerName = order.DeliveryPartner?.User.Name ?? "Not Assigned",
                TotalAmount = order.TotalAmount,
                Status = order.OrderStatus,
                OrderDate = order.OrderDate,
                EstimatedDeliveryTime = order.EstimatedDeliveryTime,
                DeliveryAddress = order.DeliveryAddress != null ?
                    $"{order.DeliveryAddress.AddressLine}, {order.DeliveryAddress.City}, {order.DeliveryAddress.Pincode}" : "N/A",
                OrderItems = order.OrderItems.Select(oi => new OrderItemSummaryDto
                {
                    MenuItemName = oi.MenuItem.Name,
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            };
        }

        #endregion

        #region Feedback Management

        public async Task<IEnumerable<FeedbackDTO>> GetAllFeedbackAsync()
        {
            var feedbacks = await _context.Feedbacks
                .Include(f => f.User)
                .Include(f => f.Restaurant)
                .Include(f => f.RespondedByAdmin)
                .Select(f => new FeedbackDTO
                {
                    Id = f.Id,
                    UserName = f.User.Name,
                    UserEmail = f.User.Email,
                    Subject = f.Subject,
                    Message = f.Message,
                    Category = f.Category,
                    Rating = f.Rating,
                    CreatedAt = f.CreatedAt,
                    IsResolved = f.IsResolved,
                    AdminResponse = f.AdminResponse,
                    ResponseDate = f.ResponseDate,
                    RespondedByAdminName = f.RespondedByAdmin != null ? f.RespondedByAdmin.Name : null,
                    OrderId = f.OrderId,
                    RestaurantId = f.RestaurantId,
                    RestaurantName = f.Restaurant != null ? f.Restaurant.RestaurantName : null
                })
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();

            return feedbacks;
        }

        public async Task<IEnumerable<FeedbackDTO>> GetUnresolvedFeedbackAsync()
        {
            var unresolvedFeedbacks = await _context.Feedbacks
                .Include(f => f.User)
                .Include(f => f.Restaurant)
                .Where(f => !f.IsResolved)
                .Select(f => new FeedbackDTO
                {
                    Id = f.Id,
                    UserName = f.User.Name,
                    UserEmail = f.User.Email,
                    Subject = f.Subject,
                    Message = f.Message,
                    Category = f.Category,
                    Rating = f.Rating,
                    CreatedAt = f.CreatedAt,
                    IsResolved = f.IsResolved,
                    AdminResponse = f.AdminResponse,
                    ResponseDate = f.ResponseDate,
                    RespondedByAdminName = null,
                    OrderId = f.OrderId,
                    RestaurantId = f.RestaurantId,
                    RestaurantName = f.Restaurant != null ? f.Restaurant.RestaurantName : null
                })
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();

            return unresolvedFeedbacks;
        }

        public async Task<bool> RespondToFeedbackAsync(RespondToFeedbackDTO respondDto, int adminUserId)
        {
            var feedback = await _context.Feedbacks.FindAsync(respondDto.FeedbackId);
            if (feedback == null)
                return false;

            var oldValues = JsonSerializer.Serialize(new { feedback.AdminResponse, feedback.IsResolved });

            feedback.AdminResponse = respondDto.Response;
            feedback.ResponseDate = DateTime.UtcNow;
            feedback.RespondedByAdminId = adminUserId;
            
            if (respondDto.MarkAsResolved)
                feedback.IsResolved = true;

            var newValues = JsonSerializer.Serialize(new { feedback.AdminResponse, feedback.IsResolved });

            await _context.SaveChangesAsync();

            // Create notification for the user
            await CreateNotificationAsync(new CreateNotificationDTO
            {
                Title = "Feedback Response Received",
                Message = $"We have responded to your feedback: '{feedback.Subject}'",
                UserId = feedback.UserId,
                NotificationType = "FeedbackResponse",
                RelatedEntityId = feedback.Id.ToString()
            }, adminUserId);

            // Log the action
            await LogAdminActionAsync(adminUserId, "RespondToFeedback", "Feedback",
                respondDto.FeedbackId.ToString(), oldValues, newValues, "Admin responded to feedback");

            return true;
        }

        #endregion

        #region Notification Management

        public async Task<IEnumerable<NotificationDTO>> GetNotificationsAsync(int? userId = null)
        {
            var query = _context.Notifications
                .Include(n => n.User)
                .AsQueryable();

            if (userId.HasValue)
                query = query.Where(n => n.UserId == userId.Value);

            var notifications = await query
                .Select(n => new NotificationDTO
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    NotificationType = n.NotificationType,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt,
                    ReadAt = n.ReadAt,
                    RelatedEntityId = n.RelatedEntityId,
                    UserName = n.User.Name,
                    UserEmail = n.User.Email
                })
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return notifications;
        }

        public async Task<bool> MarkNotificationAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return false;

            notification.IsRead = true;
            notification.ReadAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteNotificationAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null)
                return false;

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CreateNotificationAsync(CreateNotificationDTO notificationDto, int adminUserId)
        {
            var notifications = new List<Notification>();

            if (notificationDto.UserId.HasValue)
            {
                // Send to specific user
                notifications.Add(new Notification
                {
                    Title = notificationDto.Title,
                    Message = notificationDto.Message,
                    UserId = notificationDto.UserId.Value,
                    NotificationType = notificationDto.NotificationType,
                    RelatedEntityId = notificationDto.RelatedEntityId,
                    CreatedAt = DateTime.UtcNow
                });
            }
            else if (notificationDto.TargetRole.HasValue)
            {
                // Send to all users with specific role
                var targetUsers = await _context.Users
                    .Where(u => u.Role == notificationDto.TargetRole.Value)
                    .ToListAsync();

                foreach (var user in targetUsers)
                {
                    notifications.Add(new Notification
                    {
                        Title = notificationDto.Title,
                        Message = notificationDto.Message,
                        UserId = user.UserId,
                        NotificationType = notificationDto.NotificationType,
                        RelatedEntityId = notificationDto.RelatedEntityId,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }
            else
            {
                // Send to all users
                var allUsers = await _context.Users.ToListAsync();
                foreach (var user in allUsers)
                {
                    notifications.Add(new Notification
                    {
                        Title = notificationDto.Title,
                        Message = notificationDto.Message,
                        UserId = user.UserId,
                        NotificationType = notificationDto.NotificationType,
                        RelatedEntityId = notificationDto.RelatedEntityId,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            _context.Notifications.AddRange(notifications);
            await _context.SaveChangesAsync();

            // Log the action
            await LogAdminActionAsync(adminUserId, "CreateNotification", "Notification",
                notifications.Count.ToString(), null, JsonSerializer.Serialize(notificationDto), 
                $"Created {notifications.Count} notifications");

            return true;
        }

        #endregion

        #region Audit and Logging

        public async Task<bool> LogAdminActionAsync(int adminUserId, string action, string entityType,
            string entityId, string? oldValues = null, string? newValues = null, string? reason = null)
        {
            var auditLog = new AdminAuditLog
            {
                AdminUserId = adminUserId,
                Action = action,
                EntityType = entityType,
                EntityId = entityId,
                OldValues = oldValues,
                NewValues = newValues,
                Reason = reason,
                Timestamp = DateTime.UtcNow,
                IpAddress = "127.0.0.1" // You might want to get this from HttpContext
            };

            _context.AdminAuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();

            return true;
        }

        #endregion
    }
}