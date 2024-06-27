using System.ComponentModel.DataAnnotations;

namespace HelpdeskAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "User first name is required")]
        public string First_Name { get; set; }
        public string Last_Name { get; set; }

        [Required(ErrorMessage = "Email is required")]

        public string Email { get; set; }
        [Required(ErrorMessage = "User Id is required")]

        public string User_Id { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Mobile Number is required")]

        public string Mobile_Number { get; set; }
        public string Status { get; set; }
        public int Contractor_Id { get; set; }
        public int Designation_Id { get; set; }
        public int Role_Id { get; set; }
        public int Created_By { get; set; }
        public DateTime? Created_Date { get; set; }
        public int? Updated_By { get; set; }
        public DateTime? Updated_Date { get; set; }
    }
}
