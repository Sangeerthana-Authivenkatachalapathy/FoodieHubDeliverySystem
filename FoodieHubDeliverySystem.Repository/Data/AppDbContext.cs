using FoodieHubDeliverySystem.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodieHubDeliverySystem.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<FoodOrder> FoodOrders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FoodOrder>() // One order has many items
                .HasMany(o => o.OrderItems)
                .WithOne(i => i.FoodOrder)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Restrict); // When order is deleted,delete items too

            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.DeliveryAddress)
                .WithMany()
                .HasForeignKey(o => o.DeliveryAddressId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FoodOrder>() //User table , customer role
                .HasOne(o => o.User)
                .WithMany(u=>u.FoodOrders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);//keep order even user is deactivated

            modelBuilder.Entity<Payment>() //one user can have many payments
                .HasOne(p => p.User)
                .WithMany(u=>u.Payments)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);//keep payments even if user removed
                        
            modelBuilder.Entity<FoodOrder>()
                .HasOne(o => o.DeliveryPartner)
                .WithMany(dp => dp.DeliveredOrders)
                .HasForeignKey(o => o.DeliveryPartnerId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.MenuItem)
                .WithMany()
                .HasForeignKey(oi => oi.MenuItemId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}