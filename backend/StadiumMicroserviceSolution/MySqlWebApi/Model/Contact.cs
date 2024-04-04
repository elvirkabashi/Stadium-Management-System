namespace MySqlWebApi.Model
{
    public class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public string Mesazhi { get; set; }
        public string Tel { get; set; }
        public bool Status { get; set; }
    }
}
