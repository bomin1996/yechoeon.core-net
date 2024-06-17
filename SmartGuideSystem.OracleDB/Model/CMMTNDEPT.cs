using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartGuideSystem.OracleDB.Model
{
    [Table("CMMTNDEPT")]
    public class CMMTNDEPT
    {
        /*
        1. 진주시 쿼리
        DEP_CODE = "53100000000"

        2. 국 쿼리(국, 시장, 부시장, 공보관, 감사관, 항공우주사업단..그후로 국)
        국(DEPT_SE == 1)
        select* from CMMTNDEPT
        where USE_YN = '1'
        and(UPR_DEPT_CODE = '53100000000'
        and DEPT_SE <= '1')
        order by DEPT_SEQ , DEPT_RANK

        3. 과커리(upr_dept_coe가 진주시가 아닌것 그리고 자기가 진주시가 아닐것)
        select* from CMMTNDEPT
        where USE_YN = '1'
        and UPR_DEPT_CODE != '53100000000'
        and DEP_CODE != '53100000000'
        and DEPT_SE >= 1
        order by DEPT_SEQ , DEPT_RANK
        */

        [Key]
        public string DEP_CODE { get; set; }
        
        /// <summary>
        /// 과이름
        /// </summary>
        public string? DEP_CODE_NM { get; set; }

        /// <summary>
        /// 경상남도 진주시 기획행정국 기획예산과
        /// </summary>
        public string? DEP_FULL_NM { get; set; }

        /// <summary>
        /// 상위 코드 
        /// </summary>
        public string? UPR_DEPT_CODE { get; set; }

        //의미 없음 삭제  
        //public string? SPRM_DEPT_CODE { get; set; }
        //의미 없음 삭제 
        //public string? ORG_NO { get; set; }

        //뎁스 쿼리 할떄 필요 
        public string? DEPT_SE { get; set; }
        //뎁스 순서 쿼리할때 필요 
        public string? DEPT_SEQ { get; set; }

        //쿼리순서
        public string? DEPT_RANK { get; set; }


        /// <summary>
        /// 대표 번호
        /// </summary>
        public string? REP_TEL_NO { get; set; }
        /// <summary>
        /// 대표팩스번호
        /// </summary>
        public string? REP_FAX_NO { get; set; }


        //시간 ---------->
        public string? CRE_DT { get; set; }
        public string? MOD_DT { get; set; }
        //시간 <------------- 


        /// <summary>
        /// 사용여부
        /// </summary>
        public string? USE_YN { get; set; }


        //    SELECT ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank from(
        //select ROWNUM AS SEQ, ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank
        //  from cmmtndept
        //where use_yn = '1'
        //order by seq, to_number(dept_rank))
        //where 1=1 AND seq >= ? AND rownum< 201
    }
}
