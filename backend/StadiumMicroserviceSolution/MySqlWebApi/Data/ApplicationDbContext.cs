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
<<<<<<< HEAD
        public DbSet<Tiketa> Tiketat { get; set; }
=======

        public DbSet<Subscribe> Subscribe { get; set; }
>>>>>>> 4b242fbe9da9500957f8f4fe12a8042725974504
    }
}
