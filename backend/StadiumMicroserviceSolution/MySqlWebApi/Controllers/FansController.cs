using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Data;
using MySqlWebApi.Model;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Fans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fans>>> GetFans()
        {
            var fans = await _context.Fans
                .Include(p => p.FansCategory)
                .ToListAsync();
            return fans;
        }

        // GET: api/Fans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Fans>> GetFans(int id)
        {
            var fans = await _context.Fans
                .Include(p => p.FansCategory)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (fans == null)
            {
                return NotFound();
            }

            return fans;
        }




        // POST: api/Fans
        [HttpPost]
        public async Task<ActionResult<Fans>> PostFans(Fans fans)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Fans.Add(fans);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFans), new { id = fans.Id }, fans);
        }

        // PUT: api/Fans/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFans(int id, Fans fans)
        {
            if (id != fans.Id)
            {
                return BadRequest("ID in the URL does not match the ID in the product data.");
            }

            // Check if the product with the specified ID exists
            var existingFans = await _context.Fans.FindAsync(id);
            if (existingFans == null)
            {
                return NotFound();
            }

            // Update only the modifiable properties
            existingFans.Title = fans.Title;
            existingFans.TitleDescription = fans.TitleDescription;
            existingFans.PriceDescription = fans.PriceDescription;
            existingFans.Price = fans.Price;
            existingFans.Description = fans.Description;
            existingFans.ImageUrl = fans.ImageUrl;
            existingFans.FansCategoryId = fans.FansCategoryId;

            try
            {
                _context.Entry(existingFans).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FansExists(id))
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

        // DELETE: api/Fans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFans(int id)
        {
            var fans = await _context.Fans.FindAsync(id);
            if (fans == null)
            {
                return NotFound();
            }

            _context.Fans.Remove(fans);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FansExists(int id)
        {
            return _context.Fans.Any(e => e.Id == id);
        }
    }
}
