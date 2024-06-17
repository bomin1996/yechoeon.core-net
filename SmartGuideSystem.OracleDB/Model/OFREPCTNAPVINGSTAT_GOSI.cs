using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartGuideSystem.OracleDB.Model
{
    [Table("OFREPCTNAPVINGSTAT_GOSI")]
    [Index(nameof(APV_DOC_VUL), IsUnique = true)]
    public class OFREPCTNAPVINGSTAT_GOSI
    {
        [Key]
        public string APV_DOC_VUL { get; set; }

        public string? SEND_INFO { get; set; }
 
    }
}
