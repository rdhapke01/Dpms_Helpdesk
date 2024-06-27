using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpdeskAPI.Migrations
{
    /// <inheritdoc />
    public partial class FieldNameChanged2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "User_Name",
                table: "User",
                newName: "User_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "User_Id",
                table: "User",
                newName: "User_Name");
        }
    }
}
