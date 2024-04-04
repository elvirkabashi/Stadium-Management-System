using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySqlWebApi.Migrations
{
    public partial class Rregullimi_Category : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Emri",
                table: "Categories",
                newName: "Name");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDateTime",
                table: "Categories",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDateTime",
                table: "Categories");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Categories",
                newName: "Emri");
        }
    }
}
