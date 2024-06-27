using System.ComponentModel.DataAnnotations;

namespace HelpdeskAPI.Models.DTO
{
    public class LoginResponseDTO
    {

        public int Id { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string User_Id { get; set; }
        public string Mobile_Number { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
