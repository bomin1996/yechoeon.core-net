namespace SmartGuideSystem.Kiosk.Models
{
    public class ConferenceScheduleInfo
    {
        public List<ConferenceRoomInfo>? ConferenceRooms { get; set; }
    }

    public class ConferenceRoomInfo
    {
        public string? Name { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? MeetingDate { get; set; }
        public string? DeptName { get; set; }
        public string? Subject { get; set; }
        public string? Contents { get; set; }

        public string? Status { get; set; }
    }
}
