using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Event
    {
        public int Id { get; set; }
        public string Titulli { get; set; } = null!;
        public DateTime Date { get; set; }
        public string Location { get; set; } = null!;
        public string EventType { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int EventCategoryId { get; set; }

        public virtual Eventscategory EventCategory { get; set; } = null!;
    }
}
