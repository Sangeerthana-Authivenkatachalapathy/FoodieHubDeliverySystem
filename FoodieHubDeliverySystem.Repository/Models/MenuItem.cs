using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class MenuItem
    {
        public int MenuItemId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl {  get; set; }
        public int CategoryId {  get; set; }
        public Category Category { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    }
}
