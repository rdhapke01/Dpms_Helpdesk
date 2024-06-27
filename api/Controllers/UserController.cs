using CSharpCornerApi.Data;
using CSharpCornerApi.Models;
using HelpdeskAPI.Models;
using HelpdeskAPI.Models.DTO;
using HelpdeskAPI.Models.Helper;
using HelpdeskAPI.Repositories;
using HelpdeskAPI.Service;
using Microsoft.AspNetCore.Authorization;
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
 //    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService emailService;

        //private readonly IEmailSender _emailSender;


        public UserController(AppDbContext context,
            IEmailService emailService
            //,IEmailSender emailSender
            )
        {
            _context = context;
            this.emailService = emailService;
            //_emailSender = emailSender;
        }

       

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Assuming you have some validation logic here
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashedPassword;
            user.Created_Date = DateTime.UtcNow;
            //user.Status = "Pending";
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }




        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUser(int id, User user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //    user.Updated_Date = DateTime.UtcNow;
        //    _context.Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserExists(id))
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


        //[HttpPost("addNew")]
        //public async Task<ActionResult<UserDTO>> AddNewUser([FromBody] UserDTO updateUserDTO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    // Check if the user ID already exists
        //    if (await _context.User.AnyAsync(u => u.User_Id == updateUserDTO.User_Id))
        //    {
        //        ModelState.AddModelError("User_Id", "User ID already exists");
        //        return BadRequest(ModelState);
        //    }

        //    // Check if the email already exists
        //    if (await _context.User.AnyAsync(u => u.Email == updateUserDTO.Email))
        //    {
        //        ModelState.AddModelError("Email", "Email already exists");
        //        return BadRequest(ModelState);
        //    }

        //    // Check if the mobile number already exists
        //    if (await _context.User.AnyAsync(u => u.Mobile_Number == updateUserDTO.Mobile_Number))
        //    {
        //        ModelState.AddModelError("Mobile_Number", "Mobile number already exists");
        //        return BadRequest(ModelState);
        //    }

        //    // Create a new user entity and map properties
        //    var user = new User
        //    {
        //        First_Name = updateUserDTO.First_Name,
        //        Last_Name = updateUserDTO.Last_Name,
        //        Email = updateUserDTO.Email,
        //        User_Id = updateUserDTO.User_Id,
        //        Mobile_Number = updateUserDTO.Mobile_Number,
        //        Status = updateUserDTO.Status,
        //        Contractor_Id = updateUserDTO.Contractor_Id,
        //        Designation_Id = updateUserDTO.Designation_Id,
        //        Role_Id = updateUserDTO.Role_Id,
        //        Updated_By = updateUserDTO.Updated_By,
        //        Updated_Date = DateTime.UtcNow
        //    };

        //    // Assign password if provided
        //    if (updateUserDTO.Password != null)
        //    {
        //        // You may need to hash the password before assigning it to the user entity
        //        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
        //        user.Password = updateUserDTO.Password;
        //    }

        //    // Add user entity to context
        //    _context.User.Add(user);

        //    try
        //    {
        //        // Save changes
        //        await _context.SaveChangesAsync();
        //        return Ok(updateUserDTO); // Return the updated DTO upon successful addition
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        // Handle concurrency exception
        //        return StatusCode(500, "Error occurred while saving the user.");
        //    }
        //}





        [HttpPost("addNew")]
        public async Task<ActionResult<UserDTO>> AddNewUser([FromBody] UserDTO newUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the user ID already exists
            if (await _context.User.AnyAsync(u => u.User_Id == newUserDTO.User_Id))
            {
                ModelState.AddModelError("User_Id", "User ID already exists");
                return BadRequest(ModelState);
            }

            // Check if the email already exists
            if (await _context.User.AnyAsync(u => u.Email == newUserDTO.Email))
            {
                ModelState.AddModelError("Email", "Email already exists");
                return BadRequest(ModelState);
            }

            // Check if the mobile number already exists
            if (await _context.User.AnyAsync(u => u.Mobile_Number == newUserDTO.Mobile_Number))
            {
                ModelState.AddModelError("Mobile_Number", "Mobile number already exists");
                return BadRequest(ModelState);
            }

            // Create a new user entity and map properties
            var user = new User
            {
                First_Name = newUserDTO.First_Name,
                Last_Name = newUserDTO.Last_Name,
                Email = newUserDTO.Email,
                User_Id = newUserDTO.User_Id,
                Mobile_Number = newUserDTO.Mobile_Number,
                Status = newUserDTO.Status,
                Contractor_Id = newUserDTO.Contractor_Id,
                Designation_Id = newUserDTO.Designation_Id,
                Role_Id = newUserDTO.Role_Id,
                Created_By =(int) newUserDTO.Created_By,
                Created_Date = DateTime.UtcNow
            };

            // Assign password if provided
            if (!string.IsNullOrEmpty(newUserDTO.Password))
            {
                // Hash the password before assigning it to the user entity
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUserDTO.Password);
                user.Password = hashedPassword;
            }

            // Add user entity to context
            _context.User.Add(user);

            try
            {
                // Save changes
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency exception
                return StatusCode(500, "Error occurred while saving the user.");
            }
        }





        [HttpGet("send_email/{id}")]
        public async Task<ActionResult<User>> SendEmail(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            //_emailSender.SendEmail("okdoke2372@gmail.com", "Test email");

            try
            {
                MailRequest mailRequest = new MailRequest();
                mailRequest.to_email = user.Email;
                mailRequest.subject = "Test email";
                mailRequest.body = "Test mail body";
                await emailService.SendEmailAsync(mailRequest);

                return Ok("Email sent");
            }
            catch (Exception ex){
                BadRequest(ex);
            }
            return BadRequest();
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO updateUserDTO)
        {
            if (id != updateUserDTO.Id)
            {
                return BadRequest();
            }

            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.First_Name = updateUserDTO.First_Name;
            user.Last_Name = updateUserDTO.Last_Name;
            user.Email = updateUserDTO.Email;
            user.User_Id = updateUserDTO.User_Id;
            user.Mobile_Number = updateUserDTO.Mobile_Number;
            user.Status = updateUserDTO.Status;
            user.Contractor_Id = updateUserDTO.Contractor_Id;
            user.Designation_Id = updateUserDTO.Designation_Id;
            user.Role_Id = updateUserDTO.Role_Id;
            user.Updated_By = updateUserDTO.Updated_By;
            user.Updated_Date = DateTime.UtcNow;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllActiveUsers()
        {
            return await _context.User.Where(u => u.Status == "Active").ToListAsync();
        }
        [HttpGet("agent")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllAgentUsers()
        {
            return await _context.User.Where(u => u.Status == "Agent").ToListAsync();
        }
        [HttpGet("pending")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllPendingUsers()
        {
            return await _context.User.Where(u => u.Status == "Pending").ToListAsync();
        }
        [HttpGet("all_user_role")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {

            //var userRoleObj = await _context.Role.Where(r => r.Name == "User" && r.Status =="Active").ToListAsync();
            //if (userRoleObj == null)
            return await _context.User.Where(u => u.Status == "Active").ToListAsync();
            //else
            //    return await _context.User.Where(u => u.Status == "Active" && u.Role_Id == userRoleObj[0].Id).ToListAsync();

        }



        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }



    }
}
