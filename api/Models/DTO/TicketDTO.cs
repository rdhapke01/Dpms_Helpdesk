namespace HelpdeskAPI.Models.DTO
{
    public class TicketDTO
    {
        public int? Id { get; set; }
        public int Problem_Id { get; set; }
        public string Description { get; set; }
        public int? Caller_Id { get; set; }
        public string Requester_Email { get; set; }
        public string Requester_Mobile { get; set; }
        public string Subject { get; set; }
        public int Type_Id { get; set; }
        public int Priority_Id { get; set; }
        public int Status_Id { get; set; }
        public int Assigned_To_User { get; set; }
        public DateTime? Closed_Date { get; set; }
        public int? Created_By { get; set; }
        public int? Updated_By { get; set; }
    }
}
