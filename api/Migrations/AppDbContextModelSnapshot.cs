﻿// <auto-generated />
using System;
using CSharpCornerApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HelpdeskAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.18")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CSharpCornerApi.Models.CSharpCornerArticle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Contractor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Company_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("Establish_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("First_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Last_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Type_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Contractor");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Designation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Designation_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Display_Number")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Designation");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.EscalationMatrics", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Priority")
                        .HasColumnType("integer");

                    b.Property<int>("Resolution_Time")
                        .HasColumnType("integer");

                    b.Property<int>("Response_Time")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Ticket_Type")
                        .HasColumnType("integer");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("EscalationMatrics");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Display_Number")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Resolution_Time")
                        .HasColumnType("integer");

                    b.Property<int?>("Response_Time")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Priority");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Problem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Display_Number")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Problem");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Display_Num")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Display_Sequence")
                        .HasColumnType("integer");

                    b.Property<string>("Status_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Status");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Assigned_To_User")
                        .HasColumnType("integer");

                    b.Property<int>("Caller_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Closed_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Priority_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Problem_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Requester_Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Requester_Mobile")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Ticket");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.Ticket_Type", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Display_Sequence")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Ticket_Type");
                });

            modelBuilder.Entity("HelpdeskAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Contractor_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Created_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Designation_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("First_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Last_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Mobile_Number")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Role_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Updated_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("Updated_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("User_Id")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("User");
                });
#pragma warning restore 612, 618
        }
    }
}
