using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IUserRepository
    {
        Task<User> GetUserByPhoneNumberAsync(string phoneNumber);
        Task<User> RegisterUserAsync(User user);
        Task<User> VerifyOtpAsync(string phoneNumber,string otp);
        Task<bool> SetDigiPinAsync(string phoneNumber,string digiPin);
        Task<string> GenerateOtpAsync(string phoneNumber);
    }
}
