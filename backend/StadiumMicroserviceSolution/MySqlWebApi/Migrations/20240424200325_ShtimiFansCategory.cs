using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySqlWebApi.Migrations
{
    public partial class ShtimiFansCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FansCategoryId",
                table: "Fans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FansCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FansCategory", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Fans_FansCategoryId",
                table: "Fans",
                column: "FansCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fans_FansCategory_FansCategoryId",
                table: "Fans",
                column: "FansCategoryId",
                principalTable: "FansCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fans_FansCategory_FansCategoryId",
                table: "Fans");

            migrationBuilder.DropTable(
                name: "FansCategory");

            migrationBuilder.DropIndex(
                name: "IX_Fans_FansCategoryId",
                table: "Fans");

            migrationBuilder.DropColumn(
                name: "FansCategoryId",
                table: "Fans");
        }
    }
}
