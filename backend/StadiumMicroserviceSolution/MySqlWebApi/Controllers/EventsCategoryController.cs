using Microsoft.AspNetCore.Mvc;
using MySqlWebApi.Data;
using MySqlWebApi.Model;
using System.Collections.Generic;
using System.Linq;

namespace MySqlWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventsCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<EventsCategory>> GetAllEventCategories()
        {
            return _context.EventsCategories.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<EventsCategory> GetEventCategoryById(int id)
        {
            var category = _context.EventsCategories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        [HttpPost]
        public ActionResult<EventsCategory> AddEventCategory(EventsCategory category)
        {
            _context.EventsCategories.Add(category);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEventCategoryById), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEventCategory(int id, EventsCategory category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }
            _context.Entry(category).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEventCategory(int id)
        {
            var category = _context.EventsCategories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            _context.EventsCategories.Remove(category);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
