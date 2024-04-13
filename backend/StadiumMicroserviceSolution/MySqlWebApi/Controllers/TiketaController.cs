using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MySqlWebApi.Data;
using MySqlWebApi.Model;
using MySqlWebApi.Model.ViewModel;

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
        public async Task<ActionResult<IEnumerable<TiketaVm>>> GetTiketat()
        {

            var tiketatByUser = await _context.Tiketat
                .Include(t => t.Event)  
                .OrderByDescending(t => t.DataRezervimit)
                .GroupBy(t => t.UserId  )
                .Select(group => new TiketaVm
                {
                    TiketaId = group.First().TiketaId,
                    UserId = group.Key,
                    EventId = group.First().EventId,
                    EventName = group.First().Event.Titulli,
                    NrUlseve = group.Count(),
                    DataRezervimit = group.First().DataRezervimit
                })
                .ToListAsync();

            if (!tiketatByUser.Any())
            {
                return NotFound();
            }

            return tiketatByUser;
        }

        // GET: api/Tiketa/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiketaVm>> GetTiketa(int id)
        {
            if (_context.Tiketat == null)
            {
                return NotFound();
            }

            var tiketaVm = await _context.Tiketat
                .Where(t => t.TiketaId == id)
                .Include(t => t.Event)
                .Select(t => new TiketaVm
                {
                    TiketaId = t.TiketaId,
                    UserId = t.UserId,
                    EventId = t.EventId,
                    EventName = t.Event.Titulli,
                    Ulset = _context.Tiketat
                                .Where(x => x.UserId == t.UserId && x.EventId == t.EventId)
                                .Select(x => x.Ulsja)
                                .ToList(),
                    DataRezervimit = t.DataRezervimit
                })
                .FirstOrDefaultAsync();

            if (tiketaVm == null)
            {
                return NotFound();
            }

            return tiketaVm;
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

            var category = _context.Events.Find(tiketa.EventId);
            if (category == null)
            {
                return BadRequest("Invalid Event Id");
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
