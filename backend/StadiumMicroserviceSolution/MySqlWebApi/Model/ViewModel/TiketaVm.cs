
namespace MySqlWebApi.Model.ViewModel
{
    public class TiketaVm
    {
        public int TiketaId { get; set; }
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int NrUlseve { get; set; }
        public string? UserId { get; set; }
        public DateTime DataRezervimit { get; set; }
    }
}
