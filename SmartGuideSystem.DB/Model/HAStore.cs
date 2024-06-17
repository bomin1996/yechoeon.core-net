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
    [Table("HAStore")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = false)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class HAStore
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string StoreDesc { get; set; }
        public string Thumbnail { get; set; }
        public string[]? Contents { get; set; }

        public DateTime? StartPubTime { get; set; }
        public DateTime? EndPubTime { get; set; }

        public DateTime ModifiedTime { get; set; }
        public string Modifier { get; set; }
        public string? Approval { get; set; }

        [JsonIgnore]
        public string? SearchFilter1 { get; set; }
        [JsonIgnore]
        public string? SearchFilter2 { get; set; }
        [JsonIgnore]
        public string? SearchFilter3 { get; set; }

        public bool UseYn { get; set; }
    }
}
