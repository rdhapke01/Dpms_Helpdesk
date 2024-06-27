using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpdeskAPI.Migrations
{
    /// <inheritdoc />
    public partial class Typeisremovedfromstatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type_Id",
                table: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type_Id",
                table: "Status",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
