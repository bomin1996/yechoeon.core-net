using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGDepartment")]
    public class SGDepartment
    {
        [Key]
        [JsonPropertyName("deptCode")]
        public string DeptCode { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("deptFullName")]
        public string? DeptFullName { get; set; }

        [JsonPropertyName("parentDeptCode")]
        public string? ParentDeptCode { get; set; }

        [JsonPropertyName("parentDeptName")]
        public string? ParentDeptName { get; set; }

        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }

        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }

        [JsonPropertyName("jobDescription")]
        public string? JobDescription { get; set; }

        [JsonPropertyName("depth")]
        public int Depth { get; set; }

        [JsonIgnore]
        public string? DeptSeq { get; set; }

        [JsonIgnore]
        public string? DeptSe { get; set; }

        [JsonIgnore]
        public string? DeptRank { get; set; }

        [JsonIgnore]
        public string? UpdateDateTime { get; set; }

        [JsonIgnore]
        public string? UpdateDateTime2 { get; set; }

        [JsonIgnore]
        public string? UpdateDateTime3 { get; set; }

        [JsonPropertyName("useYn")]
        public bool UseYn { get; set; }

        [JsonIgnore]
        [NotMapped]
        [ForeignKey(nameof(ParentDeptCode))]
        public SGDepartment? ParentDepartment { get; set; }

        [NotMapped]
        [JsonPropertyName("childDepartments")]
        public List<SGDepartment>? ChildDepartments { get; } = new List<SGDepartment>();

        [JsonIgnore]
        public string? SearchFilter1 { get; set; }

        [JsonIgnore]
        public string? SearchFilter2 { get; set; }

        [JsonIgnore]
        public string? SearchFilter3 { get; set; }
    }
}
