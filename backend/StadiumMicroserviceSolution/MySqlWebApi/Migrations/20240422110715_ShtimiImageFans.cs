using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySqlWebApi.Migrations
{
    public partial class ShtimiImageFans : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Fans");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Fans",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Fans");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Fans",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
