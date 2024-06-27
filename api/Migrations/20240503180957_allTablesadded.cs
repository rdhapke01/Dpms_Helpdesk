using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HelpdeskAPI.Migrations
{
    /// <inheritdoc />
    public partial class allTablesadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Type",
                table: "Type");

            migrationBuilder.RenameTable(
                name: "Type",
                newName: "UserType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserType",
                table: "UserType",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Contractor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    First_Name = table.Column<string>(type: "text", nullable: false),
                    Last_Name = table.Column<string>(type: "text", nullable: false),
                    Company_Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Establish_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Type_Id = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Designation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Designation_Name = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Display_Number = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Priority",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Response_Time = table.Column<int>(type: "integer", nullable: false),
                    Resolution_Time = table.Column<int>(type: "integer", nullable: false),
                    Display_Number = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priority", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Problem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Display_Number = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Display_Num = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type_Id = table.Column<int>(type: "integer", nullable: false),
                    Display_Sequence = table.Column<int>(type: "integer", nullable: false),
                    Status_Name = table.Column<string>(type: "text", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Problem_Id = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Caller_Id = table.Column<int>(type: "integer", nullable: false),
                    Requester_Email = table.Column<string>(type: "text", nullable: false),
                    Requester_Mobile = table.Column<string>(type: "text", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Type_Id = table.Column<int>(type: "integer", nullable: false),
                    Priority_Id = table.Column<int>(type: "integer", nullable: false),
                    Status_Id = table.Column<int>(type: "integer", nullable: false),
                    Assigned_To_User = table.Column<int>(type: "integer", nullable: false),
                    Closed_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_First_Name = table.Column<string>(type: "text", nullable: false),
                    User_Last_Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Mobile_Number = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Contractor_Id = table.Column<int>(type: "integer", nullable: false),
                    Designation_Id = table.Column<int>(type: "integer", nullable: false),
                    Role_Id = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    Created_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    Updated_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contractor");

            migrationBuilder.DropTable(
                name: "Designation");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropTable(
                name: "Problem");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "Ticket");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserType",
                table: "UserType");

            migrationBuilder.RenameTable(
                name: "UserType",
                newName: "Type");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Type",
                table: "Type",
                column: "Id");
        }
    }
}
