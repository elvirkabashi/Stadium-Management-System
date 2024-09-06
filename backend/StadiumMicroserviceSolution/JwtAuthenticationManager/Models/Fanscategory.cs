using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Fanscategory
    {
        public Fanscategory()
        {
            Fans = new HashSet<Fan>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Fan> Fans { get; set; }
    }
}
