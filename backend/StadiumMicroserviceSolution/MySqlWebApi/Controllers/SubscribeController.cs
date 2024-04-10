using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlWebApi.Data;
using MySqlWebApi.Model;
using Microsoft.EntityFrameworkCore;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscribeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Subscribe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscribe>>> GetSubscribe()
        {
            if (_context.Subscribe == null)
            {
                return NotFound();
            }
            return await _context.Subscribe.ToListAsync();
        }

        // GET: api/Subscribe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscribe>> GetSubscribe(int id)
        {
            if (_context.Subscribe == null)
            {
                return NotFound();
            }
            var subscribe = await _context.Subscribe.FindAsync(id);

            if (subscribe == null)
            {
                return NotFound();
            }

            return subscribe;
        }


        // POST: api/Subscribe
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subscribe>> PostContact(Subscribe subscribe)
        {
            if (_context.Subscribe == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Subscribe'  is null.");
            }
            _context.Subscribe.Add(subscribe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscribe", new { id = subscribe.Id }, subscribe);
        }

        // DELETE: api/Contact/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscribe(int id)
        {
            if (_context.Subscribe == null)
            {
                return NotFound();
            }
            var subscribe = await _context.Subscribe.FindAsync(id);
            if (subscribe == null)
            {
                return NotFound();
            }

            _context.Subscribe.Remove(subscribe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscribeExists(int id)
        {
            return (_context.Subscribe?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
