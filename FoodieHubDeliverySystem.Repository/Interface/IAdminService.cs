using FoodieHubDeliverySystem.Repository.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IAdminService
    {
        Task<DashboardDTO> GetDashboardSummaryAsync();
    }
}