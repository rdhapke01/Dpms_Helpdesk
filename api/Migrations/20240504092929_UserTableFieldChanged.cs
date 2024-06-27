using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpdeskAPI.Migrations
{
    /// <inheritdoc />
    public partial class UserTableFieldChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "User",
                newName: "User_Name");

            migrationBuilder.AlterColumn<int>(
                name: "Type_Id",
                table: "Contractor",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "User_Name",
                table: "User",
                newName: "Username");

            migrationBuilder.AlterColumn<int>(
                name: "Type_Id",
                table: "Contractor",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
