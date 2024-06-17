using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model
{
    [Table("HABusInfo")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(BusTypeName), IsUnique = false)]
    [Index(nameof(BusRouteName), IsUnique = false)]
    public class HABusInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        public string DataType { get; set; } // 0: Route , 1:BusFare

        public string BusRouteViewType { get; set; } // 0: normal , 1:subTitle

        public string BusTypeName { get; set; }
        
        public string BusRouteName { get; set; }

        public string? ImageUrl { get; set; }

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
