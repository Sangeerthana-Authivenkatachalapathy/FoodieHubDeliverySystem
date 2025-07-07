using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodieHubDeliverySystem.Repository.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}
