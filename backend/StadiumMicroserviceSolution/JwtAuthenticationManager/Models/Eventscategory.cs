using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Eventscategory
    {
        public Eventscategory()
        {
            Events = new HashSet<Event>();
        }

        public int Id { get; set; }
        public string Emri { get; set; } = null!;

        public virtual ICollection<Event> Events { get; set; }
    }
}
