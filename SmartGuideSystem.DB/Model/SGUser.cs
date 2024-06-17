using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGUser")]
    [Index(nameof(Name), IsUnique = false)]
    [Index(nameof(SearchFilter1), IsUnique = false)]
    public class SGUser
    {
        //원래 인사정보 유저아이디 from USR_SID
        [Key]
        [JsonPropertyName("sid")]
        public string Sid { get; set; }

        //유저이름 USR_NM
        [JsonPropertyName("name")]

        public string Name { get; set; }

        /// <summary>
        /// Login ID LOGON_ID, USR_ID
        /// </summary>

        [JsonIgnore]
        public string? LoginID { get; set; }

        [JsonPropertyName("photo")]
        public string? Photo { get; set; }


        [JsonPropertyName("deptCode")]

        //과 코드
        public string? DeptCode { get; set; }


        [JsonPropertyName("deptName")]

        public string? DeptName { get; set; }

        //기획예산과 기획팀
        [JsonPropertyName("deptDescription")]

        public string? DeptDescription { get; set; }

        [JsonPropertyName("teamName")]

        public string? TeamName { get; set; }

        [JsonPropertyName("teamPosition")]

        /// <summary>
        /// RDuty 정보 
        /// </summary>
        public string? TeamPosition { get; set; }

        /// <summary>
        /// 직위코드 
        /// </summary>
        /// 
        [JsonIgnore]
        public string? PositionCode { get; set; }

        [JsonPropertyName("positionName")]
        /// <summary>
        /// 직위 이름 팀장 
        /// </summary>
        public string? PositionName { get; set; }

        /// <summary>
        /// 공무원 급수 코드 
        /// </summary>
        /// 
        [JsonIgnore]
        public string? GradeCode { get; set; }

        /// <summary>
        /// 공무원 급수 이름
        /// </summary>
        /// 
        [JsonIgnore]
        public string? GradeName { get; set; }


        //[JsonPropertyName("organizationChartId")]
        //조직도
        //[JsonIgnore]
        //public string? OrganizatonChartId { get; set; }
        [JsonPropertyName("officeTel")]

        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]

        public string? OfficeFax { get; set; }

        [JsonPropertyName("email")]

        public string? Email { get; set; }

        [JsonPropertyName("jobDescription")]

        public string? JobDescription { get; set; }
        [JsonPropertyName("useYn")]

        public bool UseYn { get; set; }

        [JsonPropertyName("status")]

        //휴가 / 교육 /출장 
        public string? Status { get; set; }

        [JsonIgnore]
        public string? UpdateDateTime { get; set; }
        [JsonIgnore]
        public string? UpdateDateTime2 { get; set; }
        [JsonIgnore]
        public string? UpdateDateTime3 { get; set; }



        /// <summary>
        /// [USR_RANK] 검색에 필요함
        /// </summary>
        /// 
        [JsonIgnore]
        public int? UserRank { get; set; }

        [JsonIgnore]
        public string? SearchFilter1 { get; set;}
        [JsonIgnore]
        public string? SearchFilter2 { get; set; }

        //USR_SID_DESC USER의 SID = PHOTO 파일 이름을 획득한다.  
        [JsonIgnore]
        public string? SearchFilter3 { get; set; }


        [JsonPropertyName("orgChartId")]

        //조직도 아이디
        public int? OrgChartId { get; set; }
        [JsonPropertyName("orgChartName")]

        public string? OrgChartName { get; set; }



        public DateTime? ModifiedTime { get; set; }
        public string? Modifier { get; set; }

        [JsonPropertyName("chartId")]

        //조직도 아이디
        public int? chartId { get; set; }
        [JsonPropertyName("chartName")]

        public string? chartName { get; set; }



        [JsonPropertyName("profileGrade")]
        public string? ProfileGrade { get; set; }
        [JsonPropertyName("profileJobDescription")]
        public string? ProfileJobDescription { get; set; }

        [JsonPropertyName("createType")]
        public string? CreateType { get; set; }

        [JsonPropertyName("workerType")] 
        public string? WorkerType { get; set; } // 1 정규직 그외 비정규직? 혹은 0 몰라
    }
}
