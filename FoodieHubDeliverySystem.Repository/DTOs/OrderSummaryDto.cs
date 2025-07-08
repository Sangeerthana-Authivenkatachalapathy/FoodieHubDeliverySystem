namespace FoodieHubDeliverySystem.DTOs
{
    public class OrderSummaryDto
    {
        public List<OrderItemSummaryDto> Items { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
