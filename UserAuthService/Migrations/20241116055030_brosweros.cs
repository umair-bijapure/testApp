using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAuthService.Migrations
{
    /// <inheritdoc />
    public partial class brosweros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BrowserName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OperatingSystem",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrowserName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OperatingSystem",
                table: "Users");
        }
    }
}
