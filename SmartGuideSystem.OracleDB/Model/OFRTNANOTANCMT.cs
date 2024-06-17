using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.OracleDB.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace SmartGuideSystem.OracleDB.Model
{
    [Table("OFRTNANOTANCMT")]
    public class OFRTNANOTANCMT
    {

        [Key]
        public string NOT_ANCMT_MGT_NO { get; set; }
        
        // 
        public string CHA_DEP_CODE { get; set; }

        //제목 
        [Column("NOT_ANCMT_SJ", TypeName = "VARCHAR2(200)")]
        public string NOT_ANCMT_SJ { get; set; }

        //내용 
        [Column("NOT_ANCMT_CN", TypeName = "VARCHAR2(4000)")]
        public string NOT_ANCMT_CN { get; set; }

        //파일명 
        public string? FILE_ID { get; set; }

        // 삭제된 ? 
        public string? DELETE_YN { get; set; }


        //'01','고시','02','공고(입찰공고)','03','공고(입법예고)','04','공고(일반공고)','05','공고(채용공고)'
        public string? NOT_ANCMT_SE_CODE { get; set; }
        public string? NOT_ANCMT_REG_NO { get; set; }
        
        public string? FIRST_ADD { get; set; }

        
        /// <summary>
        /// 공고 희망일 
        /// </summary>
        public string? PBS_HOP_YMD { get; set; }

        // 공고 시작일 
        public string? PBS_ST_YMD { get; set; }
        // 공고 종료일 
       
        public string? PBS_END_YMD { get; set; }

        // 둘다 "Y"인것만 우선 검색 --------------->
        public string? HOMEPAGE_PBS_YN { get; set; }
        public string? BBS_PBS_YN { get; set; }
        
        // 둘다 "Y"인것만 우선 검색 <---------------

        public string? TELNO { get; set; }
        public string? MAIL { get; set; }



        //시간 ---------->
        //public string? FIRST_REG_TS { get; set; }
        public DateTime? LAST_MOD_TS { get; set; }
        //시간 <------------- 

        //    SELECT ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank from(
        //select ROWNUM AS SEQ, ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank
        //  from cmmtndept
        //where use_yn = '1'
        //order by seq, to_number(dept_rank))
        //where 1=1 AND seq >= ? AND rownum< 201

        [NotMapped]
        public List<CMMTNFILE> Files { get; set; }
    }
}
