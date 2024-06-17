using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGGosigonggoInfo")]
    [Index(nameof(FileID), IsUnique = false)]
    public class SGGosigonggoInfo
    {
        [Key]
        //고시공고 DB Key NOT_ANCMT_MGT_NO
        public string NotAncmtMgtNo { get; set; }

        public string? Title { get; set; }



        /// <summary>
        /// 게재일자 PBS_HOP_YMD 
        /// </summary>
        public string? PostDate { get; set; }

        // * DB에서 가져온 필드 PBS_ST_YMD

        public string? DeptCode { get; set; }

        // * DB에서 가져온 필드 NOT_ANCMT_SJ
        public string? Subject { get; set; }

        // * DB에서 가져온 필드 NOT_ANCMT_CN
        public string? Contents { get; set; }

        /// <summary>
        /// 공고기간 PBS_ST_YMD
        /// </summary>
        public string? StartPeriod { get; set; }

        /// <summary>
        /// 공고기간 PBS_ENd_YMD
        /// </summary>
        public string? EndPeriod { get; set; }

        public string? FileID { get; set; }

        //6월 2째주에 추가 
        //// * DB에서 가져온 필드 FILE_ID
        //public int? FileSeq { get; set; }

        //  * DB에서 가져온 필드 MOD_DT
        public string? UpdateDateTime { get; set; }

        public string? UpdateDateTime2 { get; set; }
        public string? UpdateDateTime3 { get; set; }

        /// <summary>
        /// 고시 타입 [NOT_ANCMT_SE_CODE]
        /// '01','고시','02','공고(입찰공고)','03','공고(입법예고)','04','공고(일반공고)','05','공고(채용공고)'
        /// </summary>
        public string? GosiType { get; set; }

        /// <summary>
        /// 고시번호 [NOT_ANCMT_REG_NO]
        /// </summary>
        public string? GosiRegNo { get; set; }

        public string? Tel { get; set; }
        public string? Mail { get; set; }

        /// <summary>
        /// [DELETE_YN]
        /// </summary>
        public string? DELETE_YN { get; set; }

        // 만들어진 정보
        public string? GosiNumber { get; set; }


        // 만들어진 정보
        [NotMapped]
        public string? Gosibunho { 
            get
            {
                var type = GosiType == "01" ? "고시" : "공고";
                if (!string.IsNullOrEmpty(GosiRegNo) && GosiRegNo.Length > 4)
                {
                    var fistNum = GosiRegNo.Substring(0, 4);
                    var SecondNum = GosiRegNo.Substring(4);
                    //진주시 고시 제2022-89호
                    return $"{type} 제{fistNum}-{SecondNum}호";
                }
                else
                {
                    return $"{type} 제{GosiRegNo}호";
                }
            }
        }

        [NotMapped]
        public string? DeptName { get; set; }

        [NotMapped]
        public List<SGFileInfo>? FileInfos { get; set; }


        [NotMapped]
        public SGFileInfo? FileInfo { get; set; }


        // SEND_INFO = "완료"
        public string? SearchFilter1 { get; set; }
        
        public string? SearchFilter2 { get; set; }
        
        public string? SearchFilter3 { get; set; }



        public string? ProcessStatus { get; set; } // Complete(완료) 만 사용 Processing(처리중) / Fail(에러)



        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? Inserted { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? LastUpdated { get; set; }
    }
}
