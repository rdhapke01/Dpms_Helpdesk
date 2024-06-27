using CSharpCornerApi.Data;
using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using HelpdeskAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TypeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket_Type>>> GetTicketType()
        {
            return await _context.Ticket_Type.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket_Type>> GetTicket(int id)
        {
            var ticket_type_record = await _context.Ticket_Type.FindAsync(id);

            if (ticket_type_record == null)
            {
                return NotFound();
            }

            return ticket_type_record;
        }

        //[HttpPost]
        //public async Task<ActionResult<Ticket_Type>> PostTicketType(Ticket_Type ticket_type_record)
        //{
        //    ticket_type_record.Created_Date = DateTime.UtcNow;
        //    //ticket_type_record.CreatedAt = DateTime.Now;
        //    _context.Ticket_Type.Add(ticket_type_record);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTicket", new { id = ticket_type_record.Id }, ticket_type_record);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTicketType(int id, Ticket_Type ticket_type_record)
        //{
        //    if (id != ticket_type_record.Id)
        //    {
        //        return BadRequest();
        //    }
        //    ticket_type_record.Updated_Date = DateTime.UtcNow;
        //    _context.Entry(ticket_type_record).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ArticleExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPost]
        public async Task<ActionResult<TicketTypeDTO>> PostTicketType([FromBody] TicketTypeDTO ticketTypeDTO)
        {
            // Check if the name already exists
            if (await _context.Ticket_Type.AnyAsync(t => t.Name == ticketTypeDTO.Name))
            {
                return BadRequest("Ticket type with this name already exists");
            }

            // Map DTO properties to entity properties
            var ticketType = new Ticket_Type
            {
                Name = ticketTypeDTO.Name,
                Status = ticketTypeDTO.Status,
                Created_By = (int)ticketTypeDTO.Created_By
            };

            _context.Ticket_Type.Add(ticketType);
            await _context.SaveChangesAsync();

            // Update DTO object with the generated ID
            ticketTypeDTO.Id = ticketType.Id;

            // Return the DTO object instead of the entity
            return CreatedAtAction(nameof(GetTicketType), new { id = ticketType.Id }, ticketType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicketType(int id,  TicketTypeDTO ticketTypeDTO)
        {
            if (id != ticketTypeDTO.Id)
            {
                return BadRequest("Mismatched IDs");
            }

            // Check if the name already exists (excluding the current ticket type being updated)
            if (await _context.Ticket_Type.AnyAsync(t => t.Name == ticketTypeDTO.Name && t.Id != id))
            {
                return BadRequest("Ticket type with this name already exists");
            }

            // Map DTO properties to entity properties
            var ticketType = await _context.Ticket_Type.FindAsync(id);

            if (ticketType == null)
            {
                return NotFound("Ticket type not found");
            }

            ticketType.Name = ticketTypeDTO.Name;
            ticketType.Status = ticketTypeDTO.Status;
            ticketType.Updated_By = (int) ticketTypeDTO.Updated_By;
            ticketType.Updated_Date = DateTime.UtcNow;

            try
            {
                _context.Entry(ticketType).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketTypeExists(id))
                {
                    return NotFound("Ticket type not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicketType(int id)
        {
            var ticket_type_record = await _context.Ticket_Type.FindAsync(id);

            if (ticket_type_record == null)
            {
                return NotFound();
            }

            _context.Ticket_Type.Remove(ticket_type_record);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketTypeExists(int id)
        {
            return _context.Ticket_Type.Any(e => e.Id == id);
        }
    }

}
