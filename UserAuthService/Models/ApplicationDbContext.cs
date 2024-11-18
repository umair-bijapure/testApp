using Microsoft.EntityFrameworkCore;
using UserAuthService.Models;

namespace UserAuthService.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

    
        public DbSet<User> Users { get; set; }
    }
}
