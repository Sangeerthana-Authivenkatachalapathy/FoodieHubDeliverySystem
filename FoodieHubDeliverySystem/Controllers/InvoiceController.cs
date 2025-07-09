using FoodieHubDeliverySystem.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FoodieHubDeliverySystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetInvoice(int orderId)
        {
            var invoice = await _invoiceService.GetInvoiceAsync(orderId);
            if (invoice == null)
                return NotFound("Invoice not found");

            return Ok(invoice);
        }
    }

}
