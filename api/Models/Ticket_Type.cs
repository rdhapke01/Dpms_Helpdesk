namespace HelpdeskAPI.Models
{
    public class Ticket_Type
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Display_Sequence { get; set; }
        public string Status { get; set; }
        public int Created_By { get; set; }
        public DateTime Created_Date { get; set; }
        public int Updated_By { get; set; }
        public DateTime Updated_Date { get; set; }
    }
}
