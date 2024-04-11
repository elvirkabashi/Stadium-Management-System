using System.ComponentModel.DataAnnotations;

namespace MySqlWebApi.Model
{
    public class EventsCategory
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Category name is required")]
        public string Emri { get; set; }
    }
}


