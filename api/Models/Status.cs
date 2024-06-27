namespace HelpdeskAPI.Models
{
    public class Status
    {
        public int Id { get; set; }
        public int Display_Sequence { get; set; }
        public string Status_Name { get; set; }
        public int Created_By { get; set; }
        public DateTime Created_Date { get; set; }
        public int Updated_By { get; set; }
        public DateTime Updated_Date { get; set; }
    }
}
