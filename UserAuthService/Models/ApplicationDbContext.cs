using Microsoft.EntityFrameworkCore;
using UserAuthService.Models;

namespace UserAuthService.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Define a DbSet for each entity you want to store in the database
        public DbSet<User> Users { get; set; }
    }
}
