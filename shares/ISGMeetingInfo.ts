// public class SGMeetingInfo
// {
//     [Key]
//     [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//     public int Id { get; set; }
//     public string Name { get; set; }
//     public DateTime StartTime { get; set; }
//     public DateTime EndTime { get; set; }
//     public DateTime MeetingDate { get; set; }
//     public string DeptName { get; set; }
//     public string MeetingRoom { get; set; }
//     public string Subject { get; set; }
//     public string? Contents { get; set; }
//     public string? Status { get; set; }
//     public DateTime ModifiedTime { get; set; }
//     public string Modifier { get; set; }

//     [JsonIgnore]
//     public string? SearchFilter1 { get; set; }
//     [JsonIgnore]
//     public string? SearchFilter2 { get; set; }
//     [JsonIgnore]
//     public string? SearchFilter3 { get; set; }
// }

export interface ISGMeetingInfo {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  meetingDate: string;
  deptName: string;
  deptCode: string;
  meetingRoom: string;
  subject: string;
  contents?: string;
  status?: string;
  modifiedTime: string;
  modifier: string;

  approval?: string;
  createType?: string;
}
