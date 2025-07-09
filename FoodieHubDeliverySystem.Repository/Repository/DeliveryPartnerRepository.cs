using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
<<<<<<< HEAD
using Microsoft.EntityFrameworkCore;
namespace FoodieHubDeliverySystem.Repository.Repository
{
        public class DeliveryPartnerRepository : IDeliveryPartnerRepository
        {
            private readonly AppDbContext _context;

            public DeliveryPartnerRepository(AppDbContext context)
            {
                _context = context;
            }

            //Register
            public async Task<DeliveryPartner> RegisterAsync(DeliveryPartnerRegisterDTO dto)
            {
                var user = new User
                {
                    Name = dto.Name,
                    Email = dto.Email,
                    Password = dto.Password,
                    PhoneNumber = dto.PhoneNumber,
                    Role = Role.DeliveryPartner,
                    IsApproved = false
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                var partner = new DeliveryPartner
                {
                    UserId = user.UserId,
                    VehicleType = dto.VehicleType,
                    LicenseNumber = dto.LicenseNumber,
                    LicenseDocumentUrl = dto.LicenseDocumentUrl,
                    GovernmentIdNumber = dto.GovernmentIdNumber,
                    GovernmentIdUrl = dto.GovernmentIdUrl
                };

                await _context.DeliveryPartners.AddAsync(partner);
                await _context.SaveChangesAsync();

                return partner;
            }

            //Login
            public async Task<User?> ValidateCredentialsAsync(string email, string password)
            {
                return await _context.Users
    .FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.Role == Role.DeliveryPartner);
            }

            //Profile - Read
            public async Task<DeliveryPartnerProfileDTO?> GetProfileAsync(int userId)
            {
                return await _context.DeliveryPartners
                    .Where(d => d.UserId == userId)
                    .Select(d => new DeliveryPartnerProfileDTO
                    {
                        Name = d.User.Name,
                        PhoneNumber = d.User.PhoneNumber,
                        VehicleType = d.VehicleType,
                        LicenseNumber = d.LicenseNumber
                    })
                    .FirstOrDefaultAsync();
            }

            //Profile - Update
            public async Task<bool> UpdateProfileAsync(int userId, DeliveryPartnerUpdateDTO dto)
            {
                var partner = await _context.DeliveryPartners.FirstOrDefaultAsync(p => p.UserId == userId);
                if (partner == null) return false;

                partner.VehicleType = dto.VehicleType;
                partner.LicenseNumber = dto.LicenseNumber;
                partner.GovernmentIdNumber = dto.GovernmentIdNumber;
                partner.LicenseDocumentUrl = dto.LicenseDocumentUrl;
                partner.GovernmentIdUrl = dto.GovernmentIdUrl;

                await _context.SaveChangesAsync();
                return true;
            }

            //Admin Approval
            public async Task<bool> ApproveDeliveryPartnerAsync(int userId)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null || user.Role != Role.DeliveryPartner) return false;

                user.IsApproved = true;
                await _context.SaveChangesAsync();
                return true;
            }

            //Delete
            public async Task<bool> DeleteAsync(int userId)
            {
                var user = await _context.Users.FindAsync(userId);
                var partner = await _context.DeliveryPartners.FirstOrDefaultAsync(p => p.UserId == userId);

                if (user != null)
                    _context.Users.Remove(user);
                if (partner != null)
                    _context.DeliveryPartners.Remove(partner);

                await _context.SaveChangesAsync();
                return true;
            }

            //Get Assigned Orders
            public async Task<IEnumerable<OrderDTO>> GetAssignedOrdersAsync(int deliveryPartnerId)
            {
                return await _context.FoodOrders
                    .Where(o => o.DeliveryPartnerId == deliveryPartnerId && o.OrderStatus == "Assigned")
                    .Select(o => new OrderDTO
                    {
                        OrderId = o.OrderId,
                        CustomerName = o.User.Name,
                        DeliveryAddress = o.DeliveryAddress.AddressLine + ", " + o.DeliveryAddress.City,
                        OrderTime = o.OrderDate,
                        TotalAmount = o.TotalAmount
                    })
                    .ToListAsync();
            }

            //Accept Order
            public async Task<bool> AcceptOrderAsync(int orderId, int deliveryPartnerId)
            {
                var order = await _context.FoodOrders.FindAsync(orderId);
                if (order == null || order.DeliveryPartnerId != deliveryPartnerId) return false;

                order.OrderStatus = "PickedUp";
                await _context.SaveChangesAsync();
                return true;
            }

            //Update Status
            public async Task<bool> UpdateDeliveryStatusAsync(int orderId, string status)
            {
                var order = await _context.FoodOrders.FindAsync(orderId);
                if (order == null) return false;

                order.OrderStatus = status;
                await _context.SaveChangesAsync();
                return true;
            }

            //Delivery History
            public async Task<IEnumerable<DeliveryHistoryDTO>> GetDeliveryHistoryAsync(int deliveryPartnerId)
            {
                return await _context.FoodOrders
                    .Where(o => o.DeliveryPartnerId == deliveryPartnerId && o.OrderStatus == "Delivered")
                    .Select(o => new DeliveryHistoryDTO
                    {
                        OrderId = o.OrderId,
                        DeliveredTime = o.DeliveryTime,
                        TotalAmount = o.TotalAmount
                    })
                    .ToListAsync();
            }

        Task<IEnumerable<OrderDTO>> IDeliveryPartnerRepository.GetAssignedOrdersAsync(int deliveryPartnerId)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<DeliveryHistoryDTO>> IDeliveryPartnerRepository.GetDeliveryHistoryAsync(int deliveryPartnerId)
        {
            throw new NotImplementedException();
        }
    }
=======
using FoodieHubDeliverySystem.Repository.Models.FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
namespace FoodieHubDeliverySystem.Repository.Repository
{
    //    public class DeliveryPartnerRepository : IDeliveryPartnerRepository
    //    {
    //        private readonly AppDbContext _context;

    //        public DeliveryPartnerRepository(AppDbContext context)
    //        {
    //            _context = context;
    //        }

    //        //Register
    //        public async Task<DeliveryPartner> RegisterAsync(DeliveryPartnerRegisterDTO dto)
    //        {
    //            var user = new User
    //            {
    //                Name = dto.Name,
    //                Email = dto.Email,
    //                Password = dto.Password,
    //                PhoneNumber = dto.PhoneNumber,
    //                Role = Role.DeliveryPartner,
    //                IsApproved = false
    //            };

    //            await _context.Users.AddAsync(user);
    //            await _context.SaveChangesAsync();

    //            var partner = new DeliveryPartner
    //            {
    //                UserId = user.UserId,
    //                VehicleType = dto.VehicleType,
    //                LicenseNumber = dto.LicenseNumber,
    //                LicenseDocumentUrl = dto.LicenseDocumentUrl,
    //                GovernmentIdNumber = dto.GovernmentIdNumber,
    //                GovernmentIdUrl = dto.GovernmentIdUrl
    //            };

    //            await _context.DeliveryPartners.AddAsync(partner);
    //            await _context.SaveChangesAsync();

    //            return partner;
    //        }

    //        //Login
    //        public async Task<User?> ValidateCredentialsAsync(string email, string password)
    //        {
    //            return await _context.Users
    //.FirstOrDefaultAsync(u => u.Email == email && u.Password == password && u.Role == Role.DeliveryPartner);
    //        }

    //        //Profile - Read
    //        public async Task<DeliveryPartnerProfileDTO?> GetProfileAsync(int userId)
    //        {
    //            return await _context.DeliveryPartners
    //                .Where(d => d.UserId == userId)
    //                .Select(d => new DeliveryPartnerProfileDTO
    //                {
    //                    Name = d.User.Name,
    //                    PhoneNumber = d.User.PhoneNumber,
    //                    VehicleType = d.VehicleType,
    //                    LicenseNumber = d.LicenseNumber
    //                })
    //                .FirstOrDefaultAsync();
    //        }

    //        //Profile - Update
    //        public async Task<bool> UpdateProfileAsync(int userId, DeliveryPartnerUpdateDTO dto)
    //        {
    //            var partner = await _context.DeliveryPartners.FirstOrDefaultAsync(p => p.UserId == userId);
    //            if (partner == null) return false;

    //            partner.VehicleType = dto.VehicleType;
    //            partner.LicenseNumber = dto.LicenseNumber;
    //            partner.GovernmentIdNumber = dto.GovernmentIdNumber;
    //            partner.LicenseDocumentUrl = dto.LicenseDocumentUrl;
    //            partner.GovernmentIdUrl = dto.GovernmentIdUrl;

    //            await _context.SaveChangesAsync();
    //            return true;
    //        }

    //        //Admin Approval
    //        public async Task<bool> ApproveDeliveryPartnerAsync(int userId)
    //        {
    //            var user = await _context.Users.FindAsync(userId);
    //            if (user == null || user.Role != Role.DeliveryPartner) return false;

    //            user.IsApproved = true;
    //            await _context.SaveChangesAsync();
    //            return true;
    //        }

    //        //Delete
    //        public async Task<bool> DeleteAsync(int userId)
    //        {
    //            var user = await _context.Users.FindAsync(userId);
    //            var partner = await _context.DeliveryPartners.FirstOrDefaultAsync(p => p.UserId == userId);

    //            if (user != null)
    //                _context.Users.Remove(user);
    //            if (partner != null)
    //                _context.DeliveryPartners.Remove(partner);

    //            await _context.SaveChangesAsync();
    //            return true;
    //        }

    //        //Get Assigned Orders
    //        public async Task<IEnumerable<OrderDTO>> GetAssignedOrdersAsync(int deliveryPartnerId)
    //        {
    //            return await _context.FoodOrders
    //                .Where(o => o.DeliveryPartnerId == deliveryPartnerId && o.OrderStatus == "Assigned")
    //                .Select(o => new OrderDTO
    //                {
    //                    OrderId = o.OrderId,
    //                    CustomerName = o.User.Name,
    //                    DeliveryAddress = o.DeliveryAddress.AddressLine + ", " + o.DeliveryAddress.City,
    //                    OrderTime = o.OrderDate,
    //                    TotalAmount = o.TotalAmount
    //                })
    //                .ToListAsync();
    //        }

    //        //Accept Order
    //        public async Task<bool> AcceptOrderAsync(int orderId, int deliveryPartnerId)
    //        {
    //            var order = await _context.FoodOrders.FindAsync(orderId);
    //            if (order == null || order.DeliveryPartnerId != deliveryPartnerId) return false;

    //            order.OrderStatus = "PickedUp";
    //            await _context.SaveChangesAsync();
    //            return true;
    //        }

    //        //Update Status
    //        public async Task<bool> UpdateDeliveryStatusAsync(int orderId, string status)
    //        {
    //            var order = await _context.FoodOrders.FindAsync(orderId);
    //            if (order == null) return false;

    //            order.OrderStatus = status;
    //            await _context.SaveChangesAsync();
    //            return true;
    //        }

    //        //Delivery History
    //        public async Task<IEnumerable<DeliveryHistoryDTO>> GetDeliveryHistoryAsync(int deliveryPartnerId)
    //        {
    //            return await _context.FoodOrders
    //                .Where(o => o.DeliveryPartnerId == deliveryPartnerId && o.OrderStatus == "Delivered")
    //                .Select(o => new DeliveryHistoryDTO
    //                {
    //                    OrderId = o.OrderId,
    //                    DeliveredTime = o.DeliveryTime,
    //                    TotalAmount = o.TotalAmount
    //                })
    //                .ToListAsync();
    //        }

    //    Task<IEnumerable<OrderDTO>> IDeliveryPartnerRepository.GetAssignedOrdersAsync(int deliveryPartnerId)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    Task<IEnumerable<DeliveryHistoryDTO>> IDeliveryPartnerRepository.GetDeliveryHistoryAsync(int deliveryPartnerId)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    Task<DeliveryPartner> IDeliveryPartnerRepository.RegisterAsync(DeliveryPartnerRegisterDTO dto)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    Task<DeliveryPartner> IDeliveryPartnerRepository.RegisterAsync(DeliveryPartnerRegisterDTO dto)
    //    {
    //        throw new NotImplementedException();
    //    }
    //}
>>>>>>> master
    }

