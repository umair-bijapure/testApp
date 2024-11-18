using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAuthService.Migrations
{
    /// <inheritdoc />
    public partial class AddPendingOtpToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PendingOtp",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PendingOtp",
                table: "Users");
        }
    }
}
