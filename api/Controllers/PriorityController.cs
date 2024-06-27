using CSharpCornerApi.Data;
using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql.Replication.PgOutput.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class PriorityController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PriorityController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Priority>>> GetPriorities()
        {
            return await _context.Priority.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Priority>> GetPriority(int id)
        {
            var priority = await _context.Priority.FindAsync(id);

            if (priority == null)
            {
                return NotFound();
            }

            return priority;
        }

        [HttpPost]
        public async Task<ActionResult<Priority>> PostPriority(Priority priority)
        {
            // Assuming you have some validation logic here
            if (await _context.Priority.AnyAsync(p => p.Name == priority.Name))
            {
                return BadRequest(new { message = "Priority with the same name already exists" });
            }
            priority.Created_Date = DateTime.UtcNow;
            _context.Priority.Add(priority);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPriority", new { id = priority.Id }, priority);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPriority(int id, Priority priority)
        {
            if (id != priority.Id)
            {
                return BadRequest();
            }
            if (await _context.Priority.AnyAsync(p => p.Name == priority.Name))
            {
                return BadRequest(new { message = "Priority with the same name already exists" });
            }


            priority.Updated_Date = DateTime.UtcNow;
            _context.Entry(priority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriorityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Construct the message with updated data
            var updatedMessage = $"Priority with ID {id} has been successfully updated.";

            // Optionally, you can return the updated data in the response
            var responseData = new
            {
                UpdatedPriority = priority
            };

            // Return the message with the updated data
            return Ok(new { Message = updatedMessage, Data = responseData });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePriority(int id)
        {
            var priority = await _context.Priority.FindAsync(id);

            if (priority == null)
            {
                return NotFound();
            }

            _context.Priority.Remove(priority);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Deleted successfully", Data = priority});
        }

        private bool PriorityExists(int id)
        {
            return _context.Priority.Any(e => e.Id == id);
        }
    }
}
