using System.ComponentModel.DataAnnotations;


namespace MySqlWebApi.Model
{
    public class Subscribe
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        
        public bool Status { get; set; } = true;

    }
}
