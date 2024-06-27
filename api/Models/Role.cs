namespace HelpdeskAPI.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int Display_Num { get; set; }
        public int Created_By { get; set; }
        public DateTime Created_Date { get; set; }
        public int Updated_By { get; set; }
        public DateTime Updated_Date { get; set; }
    }
}
