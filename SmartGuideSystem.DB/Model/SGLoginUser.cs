using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model.JSON;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGLoginUser")]

    public class SGLoginUser
    {
        [Key]
        [Required]
        public string LoginId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        public string? DeptCode { get; set; }
        public string? DeptName { get; set; }
        public string? DeptFullName { get; set; }
        public string? Desc { get; set; }


        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }


        public DateTime? LastLoggedInTime { get; set; }

        [Column(TypeName = "json")]
        public LoginUserExtraSettings? ExtraSettings { get; set; }

    }
}
