using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.Contracts;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGNotice")]
    public class SGNotice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime PostDate { get; set; }


        public string DeptName { get; set; }

        public string DeptCode { get; set; }

        public string Contents { get; set; }


        public int Views { get; set; }

        public string[]? ImageFiles { get; set; }

        public string[]? AttachmentFiles { get; set; }

        public string NoticeType { get; set; }

        [JsonIgnore]
        public string? UpdateDateTime { get; set; }

        [JsonIgnore]
        public string? SearchFilter1 { get; set; }
        [JsonIgnore]
        public string? SearchFilter2 { get; set; }
        [JsonIgnore]
        public string? SearchFilter3 { get; set; }

        
        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }
    }



}
