using System.ComponentModel.DataAnnotations;

namespace MySqlWebApi.Model
{
    public class FansCategory
    {

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Fans Category name is required")]
        public string Name { get; set; }

        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}
