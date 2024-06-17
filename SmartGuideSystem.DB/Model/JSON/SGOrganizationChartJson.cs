using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.JSON
{


    public class SGOrganizationChartJson
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("deptCode")]
        public string DeptCode { get; set; }
        [JsonPropertyName("chartType")]
        public string ChartType { get; set; }
        [JsonPropertyName("deptName")]
        public string DeptName { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("desc")]
        public string? Desc { get; set; }
        [JsonPropertyName("title")]
        public string? Title { get; set; }
        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }
        [JsonPropertyName("departJob")]
        public string? DepartJob { get; set; }

        [JsonPropertyName("department")]
        public SGDepartment? Department { get; set; }

        [JsonPropertyName("topDeptLeader")]
        public SGUser? TopDeptLeader { get; set; }
        [JsonPropertyName("deptLeader")]
        public SGUser? DeptLeader { get; set; }

        [JsonPropertyName("teams")]
        public SGOrganizationChartTeamJson[]? Teams { get; set; }

        [JsonPropertyName("modifiedTime")]
        public DateTime? ModifiedTime { get; set; }
        [JsonPropertyName("modifier")]
        public string? Modifier { get; set; }
    }

    public class SGOrganizationChartTeamJson
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }


        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }
        [JsonPropertyName("jobDescription")]
        public string? JobDescription { get; set; }


        //[JsonPropertyName("teamLeaderId")]
        //public string TeamLeaderId { get; set; }

        [JsonPropertyName("dontAddTeamWord")]
        public bool? DontAddTeamWord { get; set; }
        [JsonPropertyName("dontShowTeamDetailButton")]
        public bool? DontShowTeamDetailButton { get; set; }


        [JsonPropertyName("leader")]
        public SGUser? Leader { get; set; }

        //[JsonPropertyName("teamMembers")]

        //public string[]? TeamMembers { get; set; }

        [JsonPropertyName("lines")]

        //public List<List<string>>? Lines { get; set; }
        public List<List<SGUser>> Lines { get; set; }
    }
}
