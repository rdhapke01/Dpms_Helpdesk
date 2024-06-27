using HelpdeskAPI.Models.DTO;
using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CSharpCornerApi.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using HelpdeskAPI.Repositories;
using System.Xml.Linq;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace HelpdeskAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ITokenRepository tokenRepository;
        private object username;

        public AuthController(AppDbContext context,ITokenRepository tokenRepository)
        {
            _context = context;
            this.tokenRepository = tokenRepository;
        }

        public object JsonConvert { get; private set; }

        [HttpGet]
        [Route("contractor")]
        //public async Task<ActionResult<IEnumerable<SignUpContractorDTO>>> GetContractor()
        //{


        //    var activeContractors = await _context.Contractor
        //  .Where(c => c.Status == "Active")
        //  .Select(c => new SignUpContractorDTO
        //  {
        //      Id = c.Id,
        //      Name =  $@"{c.First_Name} {c.Last_Name}"
        //  })
        //  .ToListAsync();

        //    return activeContractors;
        //}
        public async Task<ActionResult<IEnumerable<SignUpContractorDTO>>> GetContractor()
        {
            var activeContractors = await _context.Contractor
                .Where(c => c.Status == "Active")
                .Select(c => new SignUpContractorDTO
                {
                    Id = c.Id,
                    Name = $@"{c.First_Name} {c.Last_Name}"
                })
                .ToListAsync();

            if (activeContractors.Count == 0)
            {
                // If no active contractors found, return a message
                return NotFound("No active contractors found.");
            }

            return activeContractors;
        }


        [HttpGet]
        [Route("designation")]
        public async Task<ActionResult<IEnumerable<SignUpDesignationDTO>>> GetDesignation()
        {
            var activeDesignation = await _context.Designation
          .Where(d => d.Status == "Active")
          .Select(d => new SignUpDesignationDTO
          {
              Id = d.Id,
              Name = d.Designation_Name
          })
          .ToListAsync();
            if (activeDesignation.Count == 0)
            {
                // If no active contractors found, return a message
                return NotFound("No active designation found.");
            }

            return activeDesignation;
        }
        //[HttpPost]
        //[Route("login")]
        //public async Task<ActionResult<LoginResponseDTO>> LoginUser([FromBody]LoginDTO loginUser)
        //{
        //    var user = await _context.User.SingleOrDefaultAsync(u => u.User_Id == loginUser.User_Id);

        //    if (user == null)
        //    {
        //        return NotFound("User not found");
        //    }

        //    // Compare the provided password with the hashed password stored in the database
        //    if (!BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
        //    {
        //        return BadRequest("Invalid password");
        //    }


        //    string token = tokenRepository.CreateJWTToken(user);
        //    LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        //    loginResponseDTO.Id = user.Id;
        //    loginResponseDTO.First_Name = user.First_Name;
        //    loginResponseDTO.Last_Name = user.Last_Name;
        //    loginResponseDTO.Email = user.Email;
        //    loginResponseDTO.User_Id= user.User_Id;
        //    loginResponseDTO.Mobile_Number= user.Mobile_Number;

        //    var role = await _context.Role.SingleOrDefaultAsync(r => r.Id == user.Role_Id);
        //    loginResponseDTO.Role = role.Name;


        //    loginResponseDTO.Token= token;




        //    return loginResponseDTO;
        //}

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> PostData([FromBody] LoginDTO data)
        {
            // Create a new instance of the HttpClient class
            using (var client = new HttpClient())
            {
                string apiUrl = "https://dpmsportal.ceinsys.com/loginservicedpms/USER";
                //string apiUrl = " https://p3qzps3z-7115.inc1.devtunnels.ms/USER";



                string jsonBody = $@"{{""username"": ""{data.User_Id}"",""password"": ""{data.Password}""}}";
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    // Read the response body
                    string responseBody = await response.Content.ReadAsStringAsync();

                    // Get the Authorization header
                    IEnumerable<string> authorizationHeaders;

                        string accessToken = "";
                    if (response.Headers.TryGetValues("AccessToken", out authorizationHeaders))
                    {
                        foreach (string authorizationHeader in authorizationHeaders)
                        {
                           
                            accessToken = authorizationHeader;
                        }
                       
                    }
                    else return StatusCode(404, "Token not found");
                    var res = new Dictionary<string, string>
                                {
                                    { "accessToken", accessToken },
                                    { "id", "2" }
                                };
                    return Ok(res);

                }
                else
                {
                    // The request failed, so return an error to the client
                    return StatusCode((int)response.StatusCode, "Error calling API service");
                }
            }
        }
            [HttpPost]
        [Route("signup")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // Assuming you have some validation logic here
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashedPassword;
            user.Created_Date = DateTime.UtcNow;
            user.Role_Id = 4;
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
