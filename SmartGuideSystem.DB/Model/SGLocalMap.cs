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
    [Table("SGLocalMap")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class SGLocalMap
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? Category1 { get; set; }
        public string? Category2 { get; set; }
        public string? Category3 { get; set; }

        // 이름이필요
        public string Name { get; set; }
        // 메모
        public string? Desc { get; set; }
        public string? Url { get; set; }

        public string? UploadFileName { get; set; }

        public string? ContentType { get; set; }


        public string? SearchFilter1 { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        public int? Width { get; set; }
        public int? Height { get; set; }
        public long? Size { get; set; }

        [NotMapped]
        public string? PhotoDataBase64 { get; set; }

        [NotMapped]
        public string? PhotoFileName { get; set; }

    }
}
