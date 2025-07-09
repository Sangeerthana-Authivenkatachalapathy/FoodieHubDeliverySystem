using FoodieHubDeliverySystem.DTOs;

using FoodieHubDeliverySystem.Repository.Interface;

using FoodieHubDeliverySystem.Repository.Models;

using Microsoft.EntityFrameworkCore;

using System;

using System.Collections.Generic;

using System.Linq;

using System.Text;

using System.Threading.Tasks;
using FoodieHubDeliverySystem.Data;

namespace FoodieHubDeliverySystem.Repository.Services

{

    public class MenuItemService : IMenuItemService

    {

        private readonly AppDbContext _context;

        public MenuItemService(AppDbContext context)

        {

            _context = context;

        }

        public async Task<IEnumerable<MenuItemDTO>> GetAllAsync()

        {

            var items = await _context.MenuItems.ToListAsync();

            return items.Select(item => new MenuItemDTO

            {

                MenuItemId = item.MenuItemId,

                Name = item.Name,

                Price = item.Price,

                Description = item.Description,

                ImageUrl = item.ImageUrl,

                CategoryId = item.CategoryId

            });

        }

        public async Task<MenuItemDTO> GetByIdAsync(int id)

        {

            var item = await _context.MenuItems.FindAsync(id);

            if (item == null) return null;

            return new MenuItemDTO

            {

                MenuItemId = item.MenuItemId,

                Name = item.Name,

                Price = item.Price,

                Description = item.Description,

                ImageUrl = item.ImageUrl,

                CategoryId = item.CategoryId

            };

        }

        public async Task<MenuItemDTO> CreateAsync(CreateMenuItemDto dto)

        {

            var item = new MenuItem

            {

                Name = dto.Name,

                Price = dto.Price,

                Description = dto.Description,

                ImageUrl = dto.ImageUrl,

                CategoryId = dto.CategoryId

            };

            _context.MenuItems.Add(item);

            await _context.SaveChangesAsync();

            return new MenuItemDTO

            {

                MenuItemId = item.MenuItemId,

                Name = item.Name,

                Price = item.Price,

                Description = item.Description,

                ImageUrl = item.ImageUrl,

                CategoryId = item.CategoryId

            };

        }

        public async Task<MenuItemDTO> UpdateAsync(int id, CreateMenuItemDto dto)

        {

            var item = await _context.MenuItems.FindAsync(id);

            if (item == null) return null;

            item.Name = dto.Name;

            item.Price = dto.Price;

            item.Description = dto.Description;

            item.ImageUrl = dto.ImageUrl;


            item.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();

            return new MenuItemDTO
            {
                MenuItemId = item.MenuItemId,
                Name = item.Name,
                Price = item.Price,
                Description = item.Description,
                ImageUrl = item.ImageUrl,
                CategoryId = item.CategoryId
            };
        }
        public async Task<bool> DeleteAsync(int id)

        {

            var item = await _context.MenuItems.FindAsync(id);

            if (item == null) return false;

            _context.MenuItems.Remove(item);

            await _context.SaveChangesAsync();

            return true;

        }

        Task<bool> IMenuItemService.DeleteAsync(int id)

        {

            throw new NotImplementedException();

        }
        public async Task<IEnumerable<MenuItemDTO>> GetItemsByCategoryAsync(string categoryName)
        {
            var items = await _context.MenuItems
                .Include(mi => mi.Category)
                .Where(mi => mi.Category.Name.ToLower().Contains(categoryName.ToLower()))
                .ToListAsync();

            return items.Select(item => new MenuItemDTO
            {
                MenuItemId = item.MenuItemId,
                Name = item.Name,
                Price = item.Price,
                Description = item.Description,
                ImageUrl = item.ImageUrl,
                CategoryId = item.CategoryId
            });
        }

        Task<IEnumerable<MenuItem>> IMenuItemService.GetItemsByCategoryAsync(string categoryName)
        {
            throw new NotImplementedException();
        }
    }
}



