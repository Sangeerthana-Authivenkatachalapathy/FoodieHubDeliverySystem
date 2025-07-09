using FoodieHubDeliverySystem.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IUserService
    {
        Task<string> GenerateOtpAsync(string phoneNumber);
        Task<User> VerifyOtpAsync(string phoneNumber, string otp);
        Task<User> RegisterUserAsync(User user);
        Task<bool> SetDigiPinAsync(string phoneNumber, string digiPin);
    }

}
