using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.Common.Defines;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGContent")]
    [PrimaryKey(nameof(Id))]
    [Index(nameof(Name), IsUnique = false)]
    [Index(nameof(UploadFileName), IsUnique = false)]
    public class SGContent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedTime { get; set; }
        public string? Thumbnail { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
        public string UploadFileName { get; set; }
        public long Duration { get; set; }
        public string ContentType { get; set; }
        public string? GroupName { get; set; }
        public string? Category1 { get; set;}
        public string? Category2 { get; set; }
        public string? Category3 { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }
        public long Size { get; set; }
        public bool UseYn { get; set; }
    }
}
