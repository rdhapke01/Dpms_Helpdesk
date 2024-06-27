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
using System.Xml.Linq;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class ProblemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProblemController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Problem>>> GetProblems()
        {
            return await _context.Problem.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Problem>> GetProblem(int id)
        {
            var problem = await _context.Problem.FindAsync(id);

            if (problem == null)
            {
                return NotFound();
            }

            return problem;
        }

        //[HttpPost]
        //public async Task<ActionResult<Problem>> PostProblem(Problem problem)
        //{
        //    // Assuming you have some validation logic here

        //    problem.Created_Date = DateTime.UtcNow;
        //    _context.Problem.Add(problem);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProblem", new { id = problem.Id }, problem);
        //}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProblem(int id, Problem problem)
        //{
        //    if (id != problem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    problem.Updated_Date = DateTime.UtcNow;
        //    _context.Entry(problem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProblemExists(id))
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
        public async Task<ActionResult<Problem>> PostProblem([FromBody] ProblemDTO problemDTO)
        {
            // Check if the name already exists
            if (await _context.Problem.AnyAsync(p => p.Name == problemDTO.Name))
            {
                return BadRequest(new {message= "Issue with this name already exists" });
            }

            // Map DTO properties to entity properties
            var problem = new Problem
            {
                Name = problemDTO.Name,
                Status = problemDTO.Status,
                Created_By = (int)problemDTO.Created_By,
                Created_Date = DateTime.UtcNow // Set the creation date
            };

            _context.Problem.Add(problem);
            await _context.SaveChangesAsync();

            // Return the DTO object instead of the entity
            return CreatedAtAction(nameof(GetProblem), new { id = problem.Id }, problem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProblem(int id, ProblemDTO problemDTO)
        {
            if (id != problemDTO.Id)
            {
                return BadRequest("Mismatched IDs");
            }

            // Check if the name already exists (excluding the current problem being updated)
            if (await _context.Problem.AnyAsync(p => p.Name == problemDTO.Name && p.Id != id))
            {
                return BadRequest("Issue with this name already exists");
            }

            // Map DTO properties to entity properties
            var problem = await _context.Problem.FindAsync(id);

            if (problem == null)
            {
                return NotFound("Issue not found");
            }

            problem.Name = problemDTO.Name;
            problem.Status = problemDTO.Status;
            problem.Updated_By = (int)problemDTO.Updated_By;
            problem.Updated_Date = DateTime.UtcNow; // Set the update date

            try
            {
                _context.Entry(problem).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProblemExists(id))
                {
                    return NotFound("Problem not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProblem(int id)
        {
            var problem = await _context.Problem.FindAsync(id);

            if (problem == null)
            {
                return NotFound(new { message = $"No record found with id {id} " }); // Return custom message for Not Found
            }

            _context.Problem.Remove(problem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProblemExists(int id)
        {
            return _context.Problem.Any(e => e.Id == id);
        }
    }
}
