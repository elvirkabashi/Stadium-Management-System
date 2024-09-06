using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Subscribe
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public bool Status { get; set; }
    }
}
