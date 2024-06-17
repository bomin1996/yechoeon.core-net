using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model.JSON;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGSeatPosChart")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class SGSeatPosChart
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
        public bool UseYn { get; set; }
        public string? ChartType { get; set; } = "FreeStyle";

        [JsonIgnore]
        // postgre json string type 지정하기 
        [Column(TypeName = "json")]
        public SGSeatPosChartJson? ChartJson { get; set; }


        // Relation Generate
        public string? SearchFilter1 { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }


        public SGSeatPosChartJson ToChartJson()
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

            var targetNodes = this.ChartJson.Nodes
                .Where(node => node.NodeType == Common.Defines.SCNodeType.Member)
                .Cast<SGSCMemberNode>()
                .Where(mnode => mnode.Member.Sid == sid)
                .ToList();

            foreach ( var memberNode in targetNodes )
            {
                memberNode.Member.Status = status;
            }

            return targetNodes.Count > 0;

        }

    }
}
