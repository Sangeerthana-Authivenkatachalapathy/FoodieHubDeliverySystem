using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.ExternalServices
{
    public class RazorpayHelper
    {
        public static bool IsSignatureValid(string orderId, string paymentId, string signature, string secret)
        {
            var generatedSignature = GenerateSignature(orderId + "|" + paymentId, secret);
            return generatedSignature == signature;
        }

        private static string GenerateSignature(string data, string key)
        {
            var encoding = new System.Text.UTF8Encoding();
            byte[] keyByte = encoding.GetBytes(key);
            byte[] messageBytes = encoding.GetBytes(data);

            using (var hmacsha256 = new System.Security.Cryptography.HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                return BitConverter.ToString(hashmessage).Replace("-", "").ToLower();
            }
        }
    }
}
