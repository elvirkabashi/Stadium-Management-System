using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Company { get; set; } = null!;
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public string ImageUrl { get; set; } = null!;

        public virtual Category Category { get; set; } = null!;
    }
}
