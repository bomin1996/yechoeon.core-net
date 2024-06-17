using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SmartGuideSystem.OracleDB.Model
{
    [Table("CMMTNFILE")]
    [PrimaryKey(nameof(FILE_ID), nameof(FILE_SEQ))]
    public class CMMTNFILE
    {

        [Key]
        [Column("FILE_ID", TypeName = "VARCHAR2(50)")]
        public string FILE_ID { get; set; }

        [Key]
        [Column("FILE_SEQ")]
        public int FILE_SEQ { get; set; }

        //파일주소
        [Column("FILE_PATH", TypeName = "VARCHAR2(2000)")]
        public string? FILE_PATH { get; set; }

        //파일 명 (중복가능) 
        [Column("SYS_FILE_NM", TypeName = "VARCHAR2(200)")]
        public string? SYS_FILE_NM { get; set; }

        [Column("USER_FILE_NM", TypeName = "VARCHAR2(200)")]
        public string? USER_FILE_NM { get; set; }

        [Column("FILE_EXTN", TypeName = "VARCHAR2(40)")]
        public string? FILE_EXTN { get; set; }

        [Column("FILE_SIZE", TypeName = "VARCHAR2(10)")]
        public string? FILE_SIZE { get; set; }

        [Column("REG_DT", TypeName = "CHAR(14)")]
        public string? REG_DT { get; set; }

        [NotMapped]
        public string? NOT_ANCMT_MGT_NO { get; set; }
        //    SELECT ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank from(
        //select ROWNUM AS SEQ, ORG_NO, SPRM_DEPT_CODE, UPR_DEPT_CODE, dep_code, dep_code_nm, DEP_FULL_NM, dept_se, dept_seq, dept_rank
        //  from cmmtndept
        //where use_yn = '1'
        //order by seq, to_number(dept_rank))
        //where 1=1 AND seq >= ? AND rownum< 201


    }
}
