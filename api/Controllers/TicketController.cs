using CSharpCornerApi.Data;
using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using HelpdeskAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await _context.Ticket.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        //[HttpPost]
        //public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        //{
        //    // Assuming you have some validation logic here

        //    ticket.Created_Date = DateTime.UtcNow;
        //    _context.Ticket.Add(ticket);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        //{
        //    if (id != ticket.Id)
        //    {
        //        return BadRequest();
        //    }

        //    ticket.Updated_Date = DateTime.UtcNow;
        //    _context.Entry(ticket).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TicketExists(id))
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
        public async Task<ActionResult<Ticket>> PostTicket([FromBody] TicketDTO ticketDTO)
        {
            // Check if the problem ID exists
            if (!await _context.Problem.AnyAsync(p => p.Id == ticketDTO.Problem_Id))
            {
                return BadRequest("Problem with this ID does not exist");
            }

            // Map DTO properties to entity properties
            var ticket = new Ticket
            {
                Problem_Id = ticketDTO.Problem_Id,
                Description = ticketDTO.Description,
                Caller_Id =(int) ticketDTO.Caller_Id,
                Requester_Email = ticketDTO.Requester_Email,
                Requester_Mobile = ticketDTO.Requester_Mobile,
                Subject = ticketDTO.Subject,
                Type_Id = ticketDTO.Type_Id,
                Priority_Id = ticketDTO.Priority_Id,
                Status_Id = ticketDTO.Status_Id,
                Assigned_To_User = ticketDTO.Assigned_To_User,
                Closed_Date = ticketDTO.Closed_Date,
                Created_By =(int) ticketDTO.Created_By,
                Created_Date = DateTime.UtcNow // Set the creation date
            };

            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            // Return the DTO object instead of the entity
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, TicketDTO ticketDTO)
        {
            if (id != ticketDTO.Id)
            {
                return BadRequest("Mismatched IDs");
            }

            // Check if the problem ID exists
            if (!await _context.Problem.AnyAsync(p => p.Id == ticketDTO.Problem_Id))
            {
                return BadRequest("Problem with this ID does not exist");
            }

            // Map DTO properties to entity properties
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            ticket.Problem_Id = ticketDTO.Problem_Id;
            ticket.Description = ticketDTO.Description;
            ticket.Caller_Id =(int) ticketDTO.Caller_Id;
            ticket.Requester_Email = ticketDTO.Requester_Email;
            ticket.Requester_Mobile = ticketDTO.Requester_Mobile;
            ticket.Subject = ticketDTO.Subject;
            ticket.Type_Id = ticketDTO.Type_Id;
            ticket.Priority_Id = ticketDTO.Priority_Id;
            ticket.Status_Id = ticketDTO.Status_Id;
            ticket.Assigned_To_User = ticketDTO.Assigned_To_User;
            ticket.Closed_Date = ticketDTO.Closed_Date;
            ticket.Updated_By =(int) ticketDTO.Updated_By;
            ticket.Updated_Date = DateTime.UtcNow; // Set the update date

            try
            {
                _context.Entry(ticket).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound("Ticket not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        //[HttpGet("all")]
        //public async Task<ActionResult<IEnumerable<Ticket>>> GetAllActivTicket()
        //{
        //    return await _context.Ticket.Where(u => u.Status == "active").ToListAsync();
        //}



        private bool TicketExists(int id)
        {
            return _context.Ticket.Any(e => e.Id == id);
        }
    }
}
