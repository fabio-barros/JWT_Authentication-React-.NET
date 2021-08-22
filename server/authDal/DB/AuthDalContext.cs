using authDal.Models;
using Microsoft.EntityFrameworkCore;

namespace authDal.DB
{
    public class AuthDalContext : DbContext
    {
        public AuthDalContext(DbContextOptions<AuthDalContext> options) : base(options)
        {

        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();

            });
        }
    }
}
