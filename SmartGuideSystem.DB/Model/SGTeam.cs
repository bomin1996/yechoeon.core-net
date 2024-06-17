using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGTeam")]
    public class SGTeam
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string DeptCode { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? OfficeTel { get; set; }
        public string? OfficeFax { get; set; }
        public string? JobDescription { get; set; }
        public bool UseYn { get; set; }


        [NotMapped]
        public List<List<SGUser>>? Lines { get; set; }

        [NotMapped]
        public SGUser? Leader { get; set; }
    }
}
