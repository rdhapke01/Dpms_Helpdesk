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
    public class StatusController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatusController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatus()
        {
            return await _context.Status.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            var status = await _context.Status.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }

        [HttpPost]
        public async Task<ActionResult<Status>> PostStatus(Status status)
        {
            // Assuming you have some validation logic here

            if (await _context.Status.AnyAsync(p => p.Status_Name == status.Status_Name))

            {
                return BadRequest(new { message = "Status already exists ...check it" });
               
            }
            status.Created_Date = DateTime.UtcNow;
            _context.Status.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatus", new { id = status.Id }, status);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatus(int id, Status status)
        {
            if (id != status.Id)
            {
                return BadRequest(new { message = "ID mismatched" });

            }
             if (await _context.Status.AnyAsync(p => p.Status_Name == status.Status_Name))
                {
                    return BadRequest(new { message = "Status  already exists ...check it" });

                }

                status.Updated_Date = DateTime.UtcNow;
            _context.Entry(status).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = "updated Successfully", Data = status });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatus(int id)
        {
            var status = await _context.Status.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            _context.Status.Remove(status);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Successfully Deleted", Data = status });
        }

        private bool StatusExists(int id)
        {
            return _context.Status.Any(e => e.Id == id);
        }
    }
}
