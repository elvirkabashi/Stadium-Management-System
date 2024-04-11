using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlWebApi.Data;
using MySqlWebApi.Model;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiketaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TiketaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tiketa
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tiketa>>> GetTiketat()
        {
          if (_context.Tiketat == null)
          {
              return NotFound();
          }
            return await _context.Tiketat.ToListAsync();
        }

        // GET: api/Tiketa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tiketa>> GetTiketa(int id)
        {
          if (_context.Tiketat == null)
          {
              return NotFound();
          }
            var tiketa = await _context.Tiketat.FindAsync(id);

            if (tiketa == null)
            {
                return NotFound();
            }

            return tiketa;
        }

        // PUT: api/Tiketa/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiketa(int id, Tiketa tiketa)
        {
            if (id != tiketa.TiketaId)
            {
                return BadRequest();
            }

            _context.Entry(tiketa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiketaExists(id))
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

        // POST: api/Tiketa
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tiketa>> PostTiketa(Tiketa tiketa)
        {
          if (_context.Tiketat == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Tiketat'  is null.");
          }
            _context.Tiketat.Add(tiketa);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiketa", new { id = tiketa.TiketaId }, tiketa);
        }

        // DELETE: api/Tiketa/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiketa(int id)
        {
            if (_context.Tiketat == null)
            {
                return NotFound();
            }
            var tiketa = await _context.Tiketat.FindAsync(id);
            if (tiketa == null)
            {
                return NotFound();
            }

            _context.Tiketat.Remove(tiketa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Tiketa/Exists/{label}
        [HttpGet("Exists/{label}")]
        public async Task<ActionResult<bool>> LabelExists(string label)
        {
            try
            {
                var tiketa = await _context.Tiketat.FirstOrDefaultAsync(t => t.Ulsja == label);
                return tiketa != null;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim gjatë kërkesës: {ex.Message}");
            }
        }

        private bool TiketaExists(int id)
        {
            return (_context.Tiketat?.Any(e => e.TiketaId == id)).GetValueOrDefault();
        }
    }
}
