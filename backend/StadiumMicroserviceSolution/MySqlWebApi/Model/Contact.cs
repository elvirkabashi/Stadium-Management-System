using System.ComponentModel.DataAnnotations;

namespace MySqlWebApi.Model
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Emri { get; set; }
        [Required]
        public string Mbiemri { get; set; }
        [Required]
        public string Mesazhi { get; set; }
        public string Tel { get; set; }
        public bool Status { get; set; } = true;
        public DateTime DataKrijimit { get; set; } = DateTime.Now;
    }
}
