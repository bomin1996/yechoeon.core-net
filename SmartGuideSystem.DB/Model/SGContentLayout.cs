using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SmartGuideSystem.DB.Model.JSON;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGContentLayout")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class SGContentLayout
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? GroupName { get; set; }
        public string? Category1 { get; set; }
        public string? Category2 { get; set; }
        public string? Category3 { get; set; }

        // 이름이필요
        public string Name { get; set; }
        // 메모
        public string? Desc { get; set; }

        public bool UseYn { get; set; }
        public string? LayoutType { get; set; } = "FreeStyle";

        [JsonIgnore]
        // postgre json string type 지정하기 
        [Column(TypeName = "json")]
        public SGContentLayoutJson? ContentLayoutJson { get; set; }

        // Relation Generate
        public string? SearchFilter1 { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        public SGContentLayoutJson ToContentLayoutJson()
        {
            var json = this.ContentLayoutJson;
            json.Modifier = this.Modifier;
            json.ModifiedTime = this.ModifiedTime;
            json.Id = this.Id;
            
            return json;
        }
    }
}
