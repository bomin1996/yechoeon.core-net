using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.YC
{
    [Table("YCSchedule")]
    [PrimaryKey(nameof(Id))]
    public class YCSchedule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        

        //표시항목
        public DateTime ScheduleDate { get; set; }

        //표시항목
        public string Contents { get; set; }

        //표시항목
        public string? Desc { get; set; }

        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        [JsonIgnore]
        public string? SearchFilter1 { get; set; }
        [JsonIgnore]
        public string? SearchFilter2 { get; set; }

        [JsonIgnore]
        public string? SearchFilter3 { get; set; }

        [JsonPropertyName("useYn")]
        public bool UseYn { get; set; }

    }
}
