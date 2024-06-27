namespace HelpdeskAPI.Models
{
    public class EscalationMatrics
    {
        public int Id { get; set; }
        public int Ticket_Type { get; set; }
        public int Priority { get; set; }
        public int Response_Time { get; set; }
        public int Resolution_Time { get; set; }
        public string Status { get; set; }
        public int Created_By { get; set; }
        public DateTime Created_Date { get; set; }
        public int Updated_By { get; set; }
        public DateTime Updated_Date { get; set; }
    }
}
