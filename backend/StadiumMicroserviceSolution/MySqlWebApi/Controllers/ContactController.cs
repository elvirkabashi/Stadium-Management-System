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
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Contact
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContact()
        {
          if (_context.Contact == null)
          {
              return NotFound();
          }
            return await _context.Contact.OrderByDescending(c => c.DataKrijimit).ToListAsync();
        }

        // GET: api/Contact/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
          if (_context.Contact == null)
          {
              return NotFound();
          }
            var contact = await _context.Contact.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }


        // POST: api/Contact
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
          if (_context.Contact == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Contact'  is null.");
          }
            _context.Contact.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contact/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            if (_context.Contact == null)
            {
                return NotFound();
            }
            var contact = await _context.Contact.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contact.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return (_context.Contact?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
