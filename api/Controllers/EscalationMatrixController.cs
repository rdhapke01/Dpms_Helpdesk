using CSharpCornerApi.Data;
using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class EscalationMatrixController : Controller
    {
      
        
            private readonly AppDbContext _context;

            public EscalationMatrixController(AppDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<EscalationMatrics>>> GetMatrix()
            {
                return await _context.EscalationMatrics.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<EscalationMatrics>> MatrixByID(int id)
            {
                var escalationMatrics = await _context.EscalationMatrics.FindAsync(id);

                if (escalationMatrics == null)
                {
                    return NotFound();
                }

                return escalationMatrics;
            }

            [HttpPost]
            public async Task<ActionResult<EscalationMatrics>> PostMatrix(EscalationMatrics newMatrixRecord)
            {
                // Assuming you have some validation logic here
                if (await _context.EscalationMatrics.AnyAsync(p => p.Ticket_Type == newMatrixRecord.Ticket_Type && p.Priority == newMatrixRecord.Priority))
                {
                    return BadRequest(new { message = "Matrix already already exists" });
                }
                newMatrixRecord.Created_Date = DateTime.UtcNow;
                _context.EscalationMatrics.Add(newMatrixRecord);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMatrix", new { id = newMatrixRecord.Id }, newMatrixRecord);
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> PutMatrix(int id, EscalationMatrics matrix)
            {
                if (id != matrix.Id)
                {
                    return BadRequest();
                }
                if (await _context.EscalationMatrics.AnyAsync(m => m.Ticket_Type == matrix.Ticket_Type && m.Priority == matrix.Priority && m.Resolution_Time == matrix.Resolution_Time && m.Response_Time == matrix.Response_Time))
                {
                    return BadRequest(new { message = "Matrix already exists" });
                }


                matrix.Updated_Date = DateTime.UtcNow;
                _context.Entry(matrix).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MatrixExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                // Construct the message with updated data
                var updatedMessage = $"Escalation matrix record with ID {id} has been successfully updated.";

                // Optionally, you can return the updated data in the response
                var responseData = new
                {
                    UpdatedPriority = matrix
                };

                // Return the message with the updated data
                return Ok(new { Message = updatedMessage, Data = responseData });
            }


            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteMatrix(int id)
            {
                var matrics = await _context.EscalationMatrics.FindAsync(id);

                if (matrics == null)
                {
                    return NotFound();
                }

                _context.EscalationMatrics.Remove(matrics);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Deleted successfully", Data = matrics });
            }

            private bool MatrixExists(int id)
            {
                return _context.EscalationMatrics.Any(m => m.Id == id);
           }
        
    }
}
