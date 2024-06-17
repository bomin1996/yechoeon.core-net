using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartGuideSystem.OracleDB.Model
{
    [PrimaryKey(nameof(LOGON_ID), nameof(USR_SID))]
    [Table("CMMTNUSER")]
    public class CMMTNUSER
    {
        /// <summary>
        /// LOGON_ID USR_ID 대/소 거의 비슷 다른 케이스도 있음  
        /// </summary>
        [Key]
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
        /// 암호화 되지 않은 USR_SID 
        /// </summary>
        [NotMapped]
        public string? USR_SID_DESC { get; set; }

        /// <summary>
        /// 근무상태  AAA만 검색한다. || D로시작 하는것 제외한다.  (휴직도제외)   DAA 퇴직 등등의 코드 
        /// </summary>
        public string? USR_WORK_STATE_CODE { get; set; }
        public string? USR_WORK_STATE_CODE_NM { get; set; }
        //-----------------


        /// <summary>
        /// 부서 정보 CMMTNDEPT의 KEY  //---------- >총무과 // 상평동 // 무소속등 .. 과이름  
        /// </summary>
        public string? REAL_USE_DEP_CODE { get; set; }

        /// <summary>
        /// 부서명 
        /// </summary>
        public string? REAL_USE_DEP_NM { get; set; }

        //경상남도 진주시 기획행정국 토지정보과  => 풀네임 
        public string? REAL_USE_DEP_FULL_NM { get; set; }
        //<--------- 

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


        public string? TELNO { get; set; }
        public string? FAX_NO { get; set; }

        public string? EMAIL_ADDR { get; set; }

        /// <summary>
        /// 담당업무 INFO 
        /// </summary>
        public string? ADI_INFO7 { get; set; }



        //시간 ---------->
        public string? CRE_DT { get; set; }
        public string? MOD_DT { get; set; }
        //시간 <------------- 


        /// <summary>
        /// 기획팀장 
        /// </summary>
        public string? RDUTY_NAME { get; set; }


        /// <summary>
        /// 검색에 필요한 필드 이름은 모름 
        /// </summary>
        public int? USR_RANK { get; set; }        /// <summary>
        /// 팀이름 
        /// </summary>
        public string? BLG_TEAM_NM { get; set; }

        // 사용만 검색
        public string? USE_YN { get; set; }

        /// <summary>
        /// H: Home 사무실 내 근무 건물 J는 아닌것으로 추측 
        /// </summary>
        public string? BASE_SYS { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? CLSS_NO { get; set; }
        /// <summary>
        /// 서기, 주사보 ㅎ
        /// </summary>
        public string? CLSS_NM { get; set; }



        //? 모르는 필드 
        //public string? EXTR_USE_YN { get; set; }




        //REAL 과 같음 삭제  한다. 
        //public string? ORGIN_BLG_DEP_NM{ get; set; }
        //public string? ORGIN_BLG_DEP_CODE { get; set; } //53102% 시청 53101% 시의회 



        // logon_id, usr_nm, usr_work_state_code, usr_work_state_code_nm,
        //real_use_dep_code, real_use_dep_nm, real_use_dep_full_nm, 
        //clss_no, clss_nm, posit_code, posit_nm, grade_no, grade_nm, telno, hpno, email_addr, rduty_name,
        //blg_team_nm

        
        public string? ENGM_SE { get; set; } // 1 정규직 그외 비정규직? 혹은 0 몰라

    }
}
