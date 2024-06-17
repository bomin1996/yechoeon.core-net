using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartGuideSystem.DB.Model.JSON;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGOrganizationChart")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = true)]
    public class SGOrganizationChart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string DeptCode { get; set; }
        public string DeptName { get; set; }

        // 이름이필요
        public string Name { get; set; }
        // 메모
        public string? Desc { get; set; }

        public string? Title { get; set; }
        public bool? UseYn { get; set; }
        public string? ChartType { get; set; } = "TopLeaderTwoColumns";

        
        //Add
        public string? OfficeTel { get; set; }
        public string? OfficeFax { get; set; }
        public string? DepartJob { get; set; }

        public string? DeptLeaderId { get; set; }

        public string? TopDeptLeaderId { get; set; }


        [JsonIgnore]
        // postgre json string type 지정하기 
        [Column(TypeName = "json")]
        public SGOrganizationChartJson? ChartJson { get; set; }


        // Relation Generate

        [NotMapped]
        public SGUser? DeptLeader { get; set; }

        [NotMapped]
        public List<SGTeam>? Teams { get; set; }

        [NotMapped]
        public SGDepartment? Department { get; set; }

        public string? SearchFilter1 { get; set; }


        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }


        public SGOrganizationChartJson ToChartJson()
        {
            var json = this.ChartJson;
            json.Id = this.Id;
            json.Modifier = this.Modifier;
            json.ModifiedTime = this.ModifiedTime;
            return json;
        }

        public bool UpdateUserStatus(string sid, string status)
        {
            if (this.ChartJson == null)
            {
                // NotFound 
                return false;
            }

            if (this.ChartJson.TopDeptLeader != null && this.ChartJson.TopDeptLeader.Sid == sid)
            {
                this.ChartJson.TopDeptLeader.Status = status;
                return true;
            }

            if (this.ChartJson.DeptLeader != null && this.ChartJson.DeptLeader.Sid == sid)
            {
                this.ChartJson.DeptLeader.Status = status;
                return true;
            }

            if (this.ChartJson.Teams == null)
            {
                return false;
            }

            for (int i = 0; i < this.ChartJson.Teams.Length; i++)
            {
                var team = this.ChartJson.Teams[i];

                if (team.Leader != null && team.Leader.Sid == sid)
                {
                    team.Leader.Status = status;
                    return true;
                }

                for (int j = 0; j < team.Lines.Count; j++)
                {
                    var line = team.Lines[j];

                    for (int k = 0; k < line.Count; k++)
                    {
                        var member = line[k];
                        if (member.Sid == sid)
                        {
                            member.Status = status;
                            return true;
                        }
                    }
                }
            }

            return false;

        }
    }
}
