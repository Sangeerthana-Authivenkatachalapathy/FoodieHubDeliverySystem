using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Models;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IUserService
    {
        Task<string> GenerateOtpAsync(string phoneNumber);
        Task<User> VerifyOtpAsync(string phoneNumber, string otp);
        Task<User> RegisterUserAsync(User user);
        Task<bool> SetDigiPinAsync(string phoneNumber, string digiPin);
        Task<User> GetUserByIdAsync(Guid id);
        Task<bool> UpdateUserAsync(Guid id, UserUpdateDto userDto);


    }
}
