using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model.JSON;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGAdminConfig")]
    [PrimaryKey(nameof(Name))]
    public class SGAdminConfig
    {
        [Key]
        public string Name { get; set; }

        public DateTime? ModifiedTime { get; set; }

        [Column(TypeName = "json")]
        public JsonObject? Config { get; set; }

        public string? Modifier { get; set; }
    }
}
