using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SmartGuideSystem.DB.Model.JSON;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGFloor")]
    public class SGFloor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int BuildingId { get; set; }

        public string? Title { get; set; }

        public string? ButtonName { get; set; }

        public string? FloorImage { get; set; }

        [Column(TypeName = "json")]
        public SGFloorItem[]? Items { get; set; }


        [System.Text.Json.Serialization.JsonIgnore]
        [NotMapped]
        [ForeignKey(nameof(BuildingId))]
        public SGBuildingInfo? BuildingInfo { get; set; }

        public int Order { get; set; }


        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        public int? FloorMapType { get; set; } = 0;


    }
}
