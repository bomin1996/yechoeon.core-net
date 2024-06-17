using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGBuildingInfo")]
    public class SGBuildingInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string DeptCode { get; set; }

        public string? Name { get; set; }

        public int[] FloorIds { get; set; }

        [NotMapped]
        public List<SGFloor> Floors { get; } = new List<SGFloor>();
    }
}
