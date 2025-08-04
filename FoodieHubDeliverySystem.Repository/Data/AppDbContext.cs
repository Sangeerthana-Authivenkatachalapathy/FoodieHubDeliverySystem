using FoodieHubDeliverySystem.Repository.Models;
using FoodieHubDeliverySystem.Repository.Models.FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Existing DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<FoodOrder> FoodOrders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Restaurant> RestaurantDetails { get; set; }
        public DbSet<DeliveryPartner> DeliveryPartners { get; set; }
        public DbSet<RestaurantReview> RestaurantReviews { get; set; }
        public DbSet<DeliveryAddress> DeliveryAddresses { get; set; }

        // New Admin DbSets
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<AdminAuditLog> AdminAuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // CartItem ↔ User
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.User)
                .WithMany(u => u.CartItems)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // CartItem ↔ MenuItem
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.MenuItem)
                .WithMany()
                .HasForeignKey(c => c.MenuItemId)
                .OnDelete(DeleteBehavior.NoAction);

            // MenuItem ↔ Category
            modelBuilder.Entity<MenuItem>()
                .HasOne(m => m.Category)
                .WithMany(c => c.MenuItems)
                .HasForeignKey(m => m.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            // FoodOrder ↔ OrderItems
            modelBuilder.Entity<FoodOrder>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.FoodOrder)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.NoAction);

            // FoodOrder ↔ DeliveryAddress
            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.DeliveryAddress)
                .WithMany()
                .HasForeignKey(o => o.DeliveryAddressId)
                .OnDelete(DeleteBehavior.NoAction);

            // FoodOrder ↔ User
            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.User)
                .WithMany(u => u.FoodOrders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Payment ↔ User
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // FoodOrder ↔ Payment
            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.Payment)
                .WithOne()
                .HasForeignKey<FoodOrder>(o => o.PaymentId)
                .OnDelete(DeleteBehavior.NoAction);

            // FoodOrder ↔ DeliveryPartner
            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.DeliveryPartner)
                .WithMany(dp => dp.DeliveredOrders)
                .HasForeignKey(o => o.DeliveryPartnerId)
                .OnDelete(DeleteBehavior.NoAction);

            // OrderItem ↔ MenuItem
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.MenuItem)
                .WithMany()
                .HasForeignKey(oi => oi.MenuItemId)
                .OnDelete(DeleteBehavior.NoAction);

            // DeliveryAddress ↔ User
            modelBuilder.Entity<DeliveryAddress>()
                .HasOne(da => da.User)
                .WithMany(u => u.DeliveryAddresses)
                .HasForeignKey(da => da.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // DeliveryPartner ↔ User
            modelBuilder.Entity<DeliveryPartner>()
                .HasOne(dp => dp.User)
                .WithMany()
                .HasForeignKey(dp => dp.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // New Admin Model Configurations

            // Notification ↔ User
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Feedback ↔ User
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Feedback ↔ Order
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Order)
                .WithMany()
                .HasForeignKey(f => f.OrderId)
                .OnDelete(DeleteBehavior.NoAction);

            // Feedback ↔ Restaurant
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Restaurant)
                .WithMany()
                .HasForeignKey(f => f.RestaurantId)
                .OnDelete(DeleteBehavior.NoAction);

            // Feedback ↔ RespondedByAdmin
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.RespondedByAdmin)
                .WithMany()
                .HasForeignKey(f => f.RespondedByAdminId)
                .OnDelete(DeleteBehavior.NoAction);

            // AdminAuditLog ↔ AdminUser
            modelBuilder.Entity<AdminAuditLog>()
                .HasOne(a => a.AdminUser)
                .WithMany()
                .HasForeignKey(a => a.AdminUserId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}