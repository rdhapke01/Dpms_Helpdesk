using CSharpCornerApi.Data;
using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using HelpdeskAPI.Models.DTO;
using Microsoft.AspNetCore.Authorization;
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
   // [Authorize]
    public class ContractorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContractorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contractor>>> GetContractors()
        {
            return await _context.Contractor.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contractor>> GetContractor(int id)
        {
            var contractor = await _context.Contractor.FindAsync(id);

            if (contractor == null)
            {
                return NotFound();
            }

            return contractor;
        }

        //[HttpPost]
        //public async Task<ActionResult<Contractor>> PostContractor(Contractor contractor)
        //{
        //    // Assuming you have some validation logic here

        //    contractor.Created_Date = DateTime.UtcNow;
        //    _context.Contractor.Add(contractor);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetContractor", new { id = contractor.Id }, contractor);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutContractor(int id, Contractor contractor)
        //{
        //    if (id != contractor.Id)
        //    {
        //        return BadRequest();
        //    }

        //    contractor.Updated_Date = DateTime.UtcNow;
        //    _context.Entry(contractor).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ContractorExists(id))
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
        public async Task<ActionResult<ContractorDTO>> PostContractor([FromBody] ContractorDTO contractorDTO)
        {
            // Check if the email already exists
            if (await _context.Contractor.AnyAsync(c => c.Email == contractorDTO.Email))
            {
                return BadRequest("Contractor with this email already exists");
            }

            // Map DTO properties to entity properties
            var contractor = new Contractor
            {
                First_Name = contractorDTO.First_Name,
                Last_Name = contractorDTO.Last_Name,
                Company_Name = contractorDTO.Company_Name,
                Email = contractorDTO.Email,
                Establish_Date = DateTime.SpecifyKind((DateTime)contractorDTO.Establish_Date, DateTimeKind.Utc),
                Status = contractorDTO.Status,
                Created_By =(int) contractorDTO.Created_By,
                Created_Date = DateTime.UtcNow 
            };

            _context.Contractor.Add(contractor);
            await _context.SaveChangesAsync();

            // Update DTO object with the generated ID
            contractorDTO.Id = contractor.Id;

            // Return the DTO object instead of the entity
            return CreatedAtAction(nameof(GetContractor), new { id = contractor.Id }, contractor);
        }

       [HttpPut("{id}")]
            public async Task<IActionResult> UpdateContractor(int id, ContractorDTO contractorDTO)
            {
                if (id != contractorDTO.Id)
                {
                    return BadRequest("Mismatched IDs");
                }

                // Check if the email already exists (excluding the current contractor being updated)
                if (await _context.Contractor.AnyAsync(c => c.Email == contractorDTO.Email && c.Id != id))
                {
                    return BadRequest("Contractor with this email already exists");
                }

                // Map DTO properties to entity properties
                var contractor = await _context.Contractor.FindAsync(id);

                if (contractor == null)
                {
                    return NotFound("Contractor not found");
                }

                contractor.First_Name = contractorDTO.First_Name;
                contractor.Last_Name = contractorDTO.Last_Name;
                contractor.Company_Name = contractorDTO.Company_Name;
                contractor.Email = contractorDTO.Email;
             //   contractor.Establish_Date = DateTime.SpecifyKind((DateTime)contractorDTO.Establish_Date, DateTimeKind.Utc);
                contractor.Status = contractorDTO.Status;
                contractor.Updated_By = (int)contractorDTO.Updated_By;
                contractor.Updated_Date = DateTime.UtcNow;

                try
                {
                    _context.Entry(contractor).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContractorExists(id))
                    {
                        return NotFound("Contractor not found");
                    }
                    else
                    {
                        throw;
                    }
                }

                var updatedMessage = $"Successfully updated";

               
                var responseData = new
                {
                    UpdatedContractor = contractor
                };
                return Ok(new { Message = updatedMessage, Data = responseData });
            }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContractor(int id)
        {
            var contractor = await _context.Contractor.FindAsync(id);

            if (contractor == null)
            {
                return NotFound("Contractor not found");
            }

            _context.Contractor.Remove(contractor);
            await _context.SaveChangesAsync();

            var deleteMessage = $"Deleted successfully";

            return Ok(new { Message = deleteMessage });
        }

        private bool ContractorExists(int id)
        {
            return _context.Contractor.Any(e => e.Id == id);
        }
    }
}
