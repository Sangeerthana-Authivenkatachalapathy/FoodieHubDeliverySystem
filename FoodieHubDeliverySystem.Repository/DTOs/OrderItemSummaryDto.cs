using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace FoodieHubDeliverySystem.DTOs
{
    public class OrderItemSummaryDto
    {
        public string ItemName { get;set; } 
        public int Quantity { get; set; }
        public decimal PricePerUnit {  get; set; }
        public decimal TotalPrice { get; set; }
    }
}
