using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MySqlWebApi.Model
{
	public class Product
	{

		[Key]
		public int Id { get; set; }

		[Required]
		public string Title { get; set; }

		[Required]
		public string Description { get; set; }

		[Required]
		public string Company { get; set; }

		[Required]
		[Display(Name = "Price")]
		[Range(1, 200)]
		public double Price { get; set; }

		public int CategoryId { get; set; }

		[ForeignKey("CategoryId")]
		[ValidateNever]
		public Category Category { get; set; }


		[ValidateNever]
		public string ImageUrl { get; set; }


	}
}
