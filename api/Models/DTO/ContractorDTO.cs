namespace HelpdeskAPI.Models.DTO
{
    public class ContractorDTO
    {
        public int? Id { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Company_Name { get; set; }
        public string Email { get; set; }
        public DateTime? Establish_Date { get; set; }
        public string Status { get; set; }
        public int? Created_By { get; set; }
        public int? Updated_By { get; set; }
    }
}
