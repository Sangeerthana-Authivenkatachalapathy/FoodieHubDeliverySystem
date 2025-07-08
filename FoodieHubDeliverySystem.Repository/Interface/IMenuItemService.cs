using FoodieHubDeliverySystem.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Interface
{
    public interface IMenuItemService
    {
        Task<IEnumerable<MenuItemDTO>> GetAllAsync();
        Task<MenuItemDTO> GetByIdAsync(int id);
        Task<MenuItemDTO> CreateAsync(CreateMenuItemDto dto);
        Task<MenuItemDTO> UpdateAsync(int id, CreateMenuItemDto dto);
        Task<bool> DeleteAsync(int id);


    }
}
