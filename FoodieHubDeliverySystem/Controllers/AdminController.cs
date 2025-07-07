using FoodieHubDeliverySystem.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodieHubDeliverySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // Admin Dashboard
        public IActionResult Index()
        {
            return View();
        }

        // Admin Login
        [HttpPost]
        public IActionResult Login(AdminDTO dto)
        {
            bool isAuthenticated = _adminService.Login(dto.Username, dto.Password);
            if (isAuthenticated)
            {
                // Set session or token here
                return RedirectToAction("Dashboard");
            }
            ModelState.AddModelError("", "Invalid credentials");
            return View("Login");
        }

        // View All Users
        public IActionResult Users()
        {
            var users = _adminService.GetAllUsers();
            return View(users);
        }

        // View All Orders
        public IActionResult Orders()
        {
            var orders = _adminService.GetAllOrders();
            return View(orders);
        }

        // Add Restaurant
        [HttpGet]
        public IActionResult AddRestaurant()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddRestaurant(RestaurantDTO dto)
        {
            _adminService.AddRestaurant(dto);
            return RedirectToAction("Index");
        }

        // Add Menu Item
        [HttpGet]
        public IActionResult AddMenuItem()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddMenuItem(MenuItemDTO dto)
        {
            _adminService.AddMenuItem(dto);
            return RedirectToAction("Index");
        }
    }

}

