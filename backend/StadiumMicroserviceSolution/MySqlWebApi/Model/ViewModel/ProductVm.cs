using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace MySqlWebApi.Model.ViewModel
{
	public class ProductVm
	{
		public Product Product { get; set; }

		[ValidateNever]
		public IEnumerable<SelectListItem> CategoryList { get; set; }

	}
}
