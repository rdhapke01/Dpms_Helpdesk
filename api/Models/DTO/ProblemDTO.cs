namespace HelpdeskAPI.Models.DTO
{
    public class ProblemDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int? Created_By { get; set; }
        public int? Updated_By { get; set; }
    }
}
