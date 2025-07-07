using FoodieHubDeliverySystem.Data;
using FoodieHubDeliverySystem.Repository.Interface;
using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private static Dictionary<string, string> otpStore = new(); // In-memory OTP store

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
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
                var user = await GetUserByPhoneNumberAsync(phoneNumber);
                if (user != null)
                {
                    user.IsPhoneVerified = true;
                    await _context.SaveChangesAsync();
                    otpStore.Remove(phoneNumber); // clear OTP after successful verification
                    return user;
                }
            }
            return null;
        }

        public Task<bool> SetDigiPinAsync(string phoneNumber, string digiPin)
        {
            var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
            if (user != null)
            {
                user.DigiPin = digiPin;
                _context.SaveChanges();
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        // Helper to generate OTP
        public Task<string> GenerateOtpAsync(string phoneNumber)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            otpStore[phoneNumber] = otp;
            // In real: send OTP via SMS
            return Task.FromResult(otp);
        }
    }
}