﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using MySqlWebApi.Model;

namespace MySqlWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Contact> Contact { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Subscribe> Subscribe { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<EventsCategory> EventsCategories { get; set; }
        public DbSet<FansCategory> FansCategory { get; set; }
        public DbSet<Fans> Fans { get; set; }
        public DbSet<Group> Groups { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
