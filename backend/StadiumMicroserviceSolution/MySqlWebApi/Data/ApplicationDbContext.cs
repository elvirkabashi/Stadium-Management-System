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
        public DbSet<Subscribe> Subscribe { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<EventsCategory> EventsCategories { get; set; }
        public DbSet<Fans> Fans { get; set; }
    }
}
