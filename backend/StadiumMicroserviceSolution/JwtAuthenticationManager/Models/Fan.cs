using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Fan
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string TitleDescription { get; set; } = null!;
        public string PriceDescription { get; set; } = null!;
        public double Price { get; set; }
        public string Description { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public int FansCategoryId { get; set; }

        public virtual Fanscategory FansCategory { get; set; } = null!;
    }
}
