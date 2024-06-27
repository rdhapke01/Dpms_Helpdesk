// Data/AppDbContext.cs

using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CSharpCornerApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<CSharpCornerArticle> Articles { get; set; }
        public DbSet<Ticket_Type> Ticket_Type { get; set; }
        public DbSet<Contractor> Contractor { get; set; }
        public DbSet<Designation> Designation { get; set; }
        public DbSet<Priority> Priority { get; set; }
        public DbSet<Problem> Problem { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<EscalationMatrics> EscalationMatrics { get; set; }







    }
}