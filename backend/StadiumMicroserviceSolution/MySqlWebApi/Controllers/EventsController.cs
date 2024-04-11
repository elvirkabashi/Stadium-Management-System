using Microsoft.AspNetCore.Mvc;
using MySqlWebApi.Data;
using MySqlWebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Events>> GetAllEvents()
        {
            return _context.Events.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Events> GetEventById(int id)
        {
            var events = _context.Events.Find(id);
            if (events == null)
            {
                return NotFound();
            }
            return events;
        }

        [HttpPost]
        public ActionResult<Events> AddEvent(Events events, int eventCategoryId)
        {
            var category = _context.EventsCategories.Find(eventCategoryId);
            if (category == null)
            {
                return BadRequest("Invalid Event Category Id");
            }

            events.EventsCategory = category; // Associate Events with the specified EventsCategory
            _context.Events.Add(events);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEventById), new { id = events.Id }, events);
        }



        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, Events events)
        {
            if (id != events.Id)
            {
                return BadRequest();
            }
            _context.Entry(events).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var events = _context.Events.Find(id);
            if (events == null)
            {
                return NotFound();
            }
            _context.Events.Remove(events);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
