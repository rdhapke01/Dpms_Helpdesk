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
    public class DesignationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DesignationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Designation>>> GetDesignations()
        {
            return await _context.Designation.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Designation>> GetDesignation(int id)
        {
            var designation = await _context.Designation.FindAsync(id);

            if (designation == null)
            {
                return NotFound();
            }

            return designation;
        }

     [HttpPost]
        public async Task<ActionResult<Designation>> PostDesignation(Designation designation)
        {
            // Check if a designation with the same name already exists
            if (await _context.Designation.AnyAsync(d => d.Designation_Name == designation.Designation_Name))
            {
                return BadRequest(new { message = "Designation with the same name already exists" });
            }

            // Assuming you have some validation logic here

            designation.Created_Date = DateTime.UtcNow;
            _context.Designation.Add(designation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDesignation", new { id = designation.Id }, designation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignation(int id, Designation designation)
        {
            if (id != designation.Id)
            {
                return BadRequest();
            }
            if (await _context.Designation.AnyAsync(d => d.Designation_Name == designation.Designation_Name))
            {
                return BadRequest(new { message = "Designation with the same name already exists" });
            }


            designation.Updated_Date = DateTime.UtcNow;
            _context.Entry(designation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignationExists(id))
                {
                    return Ok(new { Message = "Id not found" });
                }
                else
                {
                    throw;
                }
            }

            var updatedMessage = $"Designation successfully updated.";

            var responseData = new
            {
                UpdatedDesignation = designation
            };


            return Ok(new { Message = updatedMessage, Data = responseData });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesignation(int id)
        {
            var designation = await _context.Designation.FindAsync(id);

            if (designation == null)
            {
                return NotFound();
            }

            _context.Designation.Remove(designation);
            await _context.SaveChangesAsync();

            var deletedData = new
            {
                DeletedDesignation = designation
            };

            // Return the message with the deleted data
            return Ok(new { Message = "Successfully deleted", Data = deletedData });
        }


        private bool DesignationExists(int id)
        {
            return _context.Designation.Any(e => e.Id == id);
        }
    }
}
