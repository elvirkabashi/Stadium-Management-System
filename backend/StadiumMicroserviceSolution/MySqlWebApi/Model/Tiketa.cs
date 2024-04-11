using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MySqlWebApi.Model
{
    public class Tiketa
    {
        public int TiketaId { get; set; }
        public string? Eventi { get; set; }
        public string Ulsja { get; set; }
        public string? UserId { get; set; }
        public DateTime DataRezervimit { get; set; } = DateTime.Now;
    }
}
