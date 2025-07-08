using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodieHubDeliverySystem.Repository.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RestaurantReviews_Users_CustomerId",
                table: "RestaurantReviews");

            migrationBuilder.DropIndex(
                name: "IX_RestaurantReviews_CustomerId",
                table: "RestaurantReviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RestaurantReviews_CustomerId",
                table: "RestaurantReviews",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_RestaurantReviews_Users_CustomerId",
                table: "RestaurantReviews",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
