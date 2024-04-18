using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Data;
using MySqlWebApi.Model;
using MySqlWebApi.Model.ViewModel;

namespace MySqlWebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public ProductsController(ApplicationDbContext context)
		{
			_context = context;
		}
		// GET: api/Products
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
		{
			var products = await _context.Products
				.Include(p => p.Category)
				.ToListAsync();

			return products;
		}

		// GET: api/Products/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Product>> GetProduct(int id)
		{
			var product = await _context.Products
				.Include(p => p.Category)
				.FirstOrDefaultAsync(p => p.Id == id);

			if (product == null)
			{
				return NotFound();
			}

			return product;
		}


		// PUT: api/Products/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutProduct(int id, ProductVm productVm)
		{
			if (id != productVm.Product.Id)
			{
				return BadRequest();
			}

			_context.Entry(productVm.Product).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ProductExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Products
		[HttpPost]
		public async Task<ActionResult<Product>> PostProduct(ProductVm productVm)
		{
			// Check if the specified category exists
			var existingCategory = await _context.Categories.FindAsync(productVm.Product.CategoryId);
			if (existingCategory == null)
			{
				// Handle the scenario where the category doesn't exist (optional)
				return BadRequest("The specified category does not exist.");
			}

			// Associate the existing category with the new product
			productVm.Product.Category = existingCategory;

			// Add the product to the database
			_context.Products.Add(productVm.Product);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetProduct", new { id = productVm.Product.Id }, productVm.Product);
		}

		// DELETE: api/Products/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteProduct(int id)
		{
			var product = await _context.Products.FindAsync(id);
			if (product == null)
			{
				return NotFound();
			}

			_context.Products.Remove(product);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool ProductExists(int id)
		{
			return _context.Products.Any(e => e.Id == id);
		}
	}
}
