using System.ComponentModel.DataAnnotations;

namespace HelpdeskAPI.Models.DTO
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "User Name is required")]

        public string User_Id { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
