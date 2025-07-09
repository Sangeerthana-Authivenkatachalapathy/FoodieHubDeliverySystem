using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.DTOs;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private static Dictionary<string, string> otpStore = new(); // In-memory OTP store

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> VerifyOtpAsync(string phoneNumber, string otp)
        {
            if (otpStore.TryGetValue(phoneNumber, out string storedOtp) && storedOtp == otp)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
                if (user != null)
                {
                    user.IsPhoneVerified = true;
                    await _context.SaveChangesAsync();
                    otpStore.Remove(phoneNumber);
                    return user;
                }
            }
            return null;
        }

        public async Task<bool> SetDigiPinAsync(string phoneNumber, string digiPin)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
            if (user == null) return false;

            user.DigiPin = digiPin;
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<string> GenerateOtpAsync(string phoneNumber)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            otpStore[phoneNumber] = otp;
            // In real-world: send OTP via SMS
            return Task.FromResult(otp);
        }

        // ✅ User Profile Management

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UpdateUserAsync(Guid id, UserUpdateDto userDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.Name = userDto.Name;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.Phone;
            user.Address = userDto.Address;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
