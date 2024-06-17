using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartGuideSystem.OracleDB.Model
{
    [Table("CMMTNV_USER")]
    public class CMMTNV_USER
    {
        /// <summary>
        /// LOGON_ID USR_ID 대/소 거의 비슷 다른 케이스도 있음  
        /// </summary>
        public string LOGON_ID { get; set; }

        /// <summary>
        /// LOGON_ID USR_ID 대/소 거의 비슷 다른 케이스도 있음  
        /// </summary>
        public string? USR_ID { get; set; }
       
        /// <summary>
        /// 이름 
        /// </summary>
        public string? USR_NM { get; set; }

        /// <summary>
        /// 사진 정보 검색 키 (변형) 
        /// </summary>
        [Key]
        public string USR_SID { get; set; }

        /// <summary>
        /// 정규직 비정규직
        /// </summary>
        public string ENGM_SE { get; set; }



        /// <summary>
        /// 직위 코드 // 팀장 등 포지션 정보 , 팀장에게만 주어짐  ---------->
        /// </summary>
        public string? POSIT_CODE { get; set; }

        /// <summary>
        /// 직위명 
        /// </summary>
        public string? POSIT_NM { get; set; }
        // 팀장 등 포지션 정보 , 팀장에게만 주어짐  <------------- 

        /// <summary>
        /// 직책 코드 // 7급 등등  ---------->
        /// </summary>
        public string? GRADE_NO { get; set; }

        /// <summary>
        /// 직책명 
        /// </summary>
        public string? GRADE_NM { get; set; }
        // 직급 7급 등등  ---------->

        /// <summary>
        /// 직급 코드 /공무직 ---->
        /// </summary>
        public string? CLSS_NO { get; set; }

        /// <summary>
        /// 직책명 
        /// </summary>
        public string? CLSS_NM { get; set; }

        /// <summary>
        /// 부서 정보 CMMTNDEPT의 KEY  //---------- >총무과 // 상평동 // 무소속등 .. 과이름  
        /// </summary>
        public string? REAL_USE_DEP_CODE { get; set; }

        /// <summary>
        /// 부서명 
        /// </summary>
        public string? REAL_USE_DEP_NM { get; set; }

        /// <summary>
        /// 근무상태  AAA만 검색한다. || D로시작 하는것 제외한다.  (휴직도제외)   DAA 퇴직 등등의 코드 
        /// </summary>
        public string? USR_WORK_STATE_CODE_NM { get; set; }
        //-----------------

        public string? TELNO { get; set; }
        public string? EMAIL_ADDR { get; set; }

        /// <summary>
        /// 담당업무 INFO 
        /// </summary>
        public string? ADI_INFO7 { get; set; }

        // 사용만 검색
        public string? USE_YN { get; set; }

    }
}
