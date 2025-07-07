using FoodieHubDeliverySystem.DTOs;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class DeliveryPartnerService : IDeliveryPartnerService
    {
        private readonly IDeliveryPartnerRepository _repository;

        public DeliveryPartnerService(IDeliveryPartnerRepository repository)
        {
            _repository = repository;
        }

        public async Task<DeliveryPartner> RegisterAsync(DeliveryPartnerRegisterDTO dto)
        {
            return await _repository.RegisterAsync(dto);
        }

        public async Task<User?> ValidateCredentialsAsync(string email, string password)
        {
            return await _repository.ValidateCredentialsAsync(email, password);
        }

        public async Task<DeliveryPartnerProfileDTO?> GetProfileAsync(int userId)
        {
            return await _repository.GetProfileAsync(userId);
        }

        public async Task<bool> UpdateProfileAsync(int userId, DeliveryPartnerUpdateDTO dto)
        {
            return await _repository.UpdateProfileAsync(userId, dto);
        }

        public async Task<bool> ApproveDeliveryPartnerAsync(int userId)
        {
            return await _repository.ApproveDeliveryPartnerAsync(userId);
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            return await _repository.DeleteAsync(userId);
        }

        public async Task<IEnumerable<OrderDTO>> GetAssignedOrdersAsync(int deliveryPartnerId)
        {
            return await _repository.GetAssignedOrdersAsync(deliveryPartnerId);
        }

        public async Task<bool> AcceptOrderAsync(int orderId, int deliveryPartnerId)
        {
            return await _repository.AcceptOrderAsync(orderId, deliveryPartnerId);
        }

        public async Task<bool> UpdateDeliveryStatusAsync(int orderId, string status)
        {
            return await _repository.UpdateDeliveryStatusAsync(orderId, status);
        }

        public async Task<IEnumerable<DeliveryHistoryDTO>> GetDeliveryHistoryAsync(int deliveryPartnerId)
        {
            return await _repository.GetDeliveryHistoryAsync(deliveryPartnerId);
        }
    }
}

