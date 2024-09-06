using System;
using System.Collections.Generic;

namespace JwtAuthenticationManager.Models
{
    public partial class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Emri { get; set; } = null!;
        public string Mbiemri { get; set; } = null!;
        public string Mesazhi { get; set; } = null!;
        public string Tel { get; set; } = null!;
        public bool Status { get; set; }
        public DateTime DataKrijimit { get; set; }
    }
}
