using System.ComponentModel.DataAnnotations;

namespace HelpdeskAPI.Models.DTO
{
    public class UserDTO
    {

        public int? Id { get; set; }

        [Required(ErrorMessage = "User first name is required")]
        public string First_Name { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string Last_Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "User Id is required")]
        public string User_Id { get; set; }

        [Required(ErrorMessage = "Mobile Number is required")]
        public string Mobile_Number { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public string Status { get; set; }

       [Required(ErrorMessage = "Contractor Id is required")]
        public int Contractor_Id { get; set; }

        [Required(ErrorMessage = "Designation Id is required")]
        public int Designation_Id { get; set; }
        public string? Password { get; set; }
        [Required(ErrorMessage = "Role Id is required")]
        public int Role_Id { get; set; }

        public int? Created_By { get; set; }
        public int? Updated_By { get; set; }

    }
}
