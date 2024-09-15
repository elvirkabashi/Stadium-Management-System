using System.ComponentModel.DataAnnotations;

namespace MySqlWebApi.Model
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        public string GroupName {  get; set; }
        public string Description {  get; set; }
    }
}
