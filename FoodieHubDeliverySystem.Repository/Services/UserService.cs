using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public Task<string> GenerateOtpAsync(string phoneNumber) =>
            _userRepo.GenerateOtpAsync(phoneNumber);

        public Task<User> VerifyOtpAsync(string phoneNumber, string otp) =>
            _userRepo.VerifyOtpAsync(phoneNumber, otp);

        public Task<User> RegisterUserAsync(User user) =>
            _userRepo.RegisterUserAsync(user);

        public Task<bool> SetDigiPinAsync(string phoneNumber, string digiPin) =>
            _userRepo.SetDigiPinAsync(phoneNumber, digiPin);
    }

}
