using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using SmartGuideSystem.DB.Model.JSON;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGDevice")]
    [Index(nameof(DeviceId), IsUnique = true)]
    public class SGDevice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string DeviceId { get; set; }

        public string KioskType { get; set; }

        public string? DeptCode { get; set; }

        public string? DeptName { get; set; }

        public string? UpdateDateTime { get; set; }

        public string ModifierId { get; set; }

        public string? Status { get; set; }

        public bool Use { get; set; }

        public string? Desc { get; set; }
        [JsonPropertyName("orgChartId")]

        //조직도 아이디
        public int? OrgChartId { get; set; }
        [JsonPropertyName("orgChartName")]

        public string? OrgChartName { get; set; }

        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        [Column(TypeName = "json")]
        public DeviceExtraSettings? ExtraSettings { get; set; }

        [JsonPropertyName("chartId")]

        //조직도 아이디
        public int? chartId { get; set; }
        [JsonPropertyName("chartName")]

        public string? chartName { get; set; }

    }
}
