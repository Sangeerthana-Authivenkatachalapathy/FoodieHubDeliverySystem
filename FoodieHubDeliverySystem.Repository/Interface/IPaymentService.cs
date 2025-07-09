using FoodieHubDeliverySystem.Repository.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
     public interface IPaymentService
    {
        Task<PaymentResultDto> VerifyAndProcessPaymentAsync(PaymentVerificationRequestDto dto);
    }
}
