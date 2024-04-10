using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Model;

namespace MySqlWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Contact> Contact {  get; set; }
        public DbSet<Category> Categories {  get; set; }
        public DbSet<Product> Products {  get; set; }
        public DbSet<Tiketa> Tiketat { get; set; }
    }
}
