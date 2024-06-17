using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGMeetingInfo")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = false)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class SGMeetingInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime MeetingDate { get; set; }
        public string DeptName { get; set; }
        public string DeptCode { get; set; }
        public string MeetingRoom { get; set; }
        public string Subject { get; set; }
        public string? Contents { get; set; }
        public string? Status { get; set; }
        public DateTime ModifiedTime { get; set; }
        public string Modifier { get; set; }

        public string? Approval { get; set; }
        public string? CreateType { get;set; } 
            

        [JsonIgnore]
        public string? SearchFilter1 { get; set; }
        [JsonIgnore]
        public string? SearchFilter2 { get; set; }
        [JsonIgnore]
        public string? SearchFilter3 { get; set; }
    }
}
