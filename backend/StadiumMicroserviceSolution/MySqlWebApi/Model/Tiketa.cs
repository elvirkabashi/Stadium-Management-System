using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MySqlWebApi.Model
{
    public class Tiketa
    {
        [Key]
        public int TiketaId { get; set; }
        [ForeignKey("EventId")]
        public Events? Event { get; set; }
        public int EventId { get; set; }
        public string Ulsja { get; set; }
        public string? UserId { get; set; }
        public DateTime DataRezervimit { get; set; } = DateTime.Now;
    }
}
