using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Data;
using MySqlWebApi.Model;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FansCategoryController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public FansCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FansCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FansCategory>>> GetFansCategory()
        {
            if (_context.FansCategory == null)
            {
                return NotFound();
            }
            return await _context.FansCategory.ToListAsync();
        }

        // GET: api/FansCategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FansCategory>> GetFansCategory(int id)
        {
            if (_context.FansCategory == null)
            {
                return NotFound();
            }
            var fansCategory = await _context.FansCategory.FindAsync(id);

            if (fansCategory == null)
            {
                return NotFound();
            }

            return fansCategory;
        }

        // PUT: api/FansCategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFansCategory(int id, FansCategory fansCategory)
        {
            if (id != fansCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(fansCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FansCategoryExists(id))
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

        // POST: api/FansCategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FansCategory>> PostFansCategory(FansCategory fansCategory)
        {
            if (_context.FansCategory == null)
            {
                return Problem("Entity set 'ApplicationDbContext.FansCategory'  is null.");
            }
            _context.FansCategory.Add(fansCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFansCategory", new { id = fansCategory.Id }, fansCategory);
        }

        // DELETE: api/FansCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFansCategory(int id)
        {
            if (_context.FansCategory == null)
            {
                return NotFound();
            }
            var fansCategory = await _context.FansCategory.FindAsync(id);
            if (fansCategory == null)
            {
                return NotFound();
            }

            _context.FansCategory.Remove(fansCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FansCategoryExists(int id)
        {
            return (_context.FansCategory?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
