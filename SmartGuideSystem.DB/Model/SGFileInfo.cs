using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;

namespace SmartGuideSystem.DB.Model
{
    [Table("SGFileInfo")]
    [PrimaryKey(nameof(FileID), nameof(FileSeq))]
    public class SGFileInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public string FileID { get; set; }

        [Key]
        public int FileSeq { get; set; }


        //파일주소 예) d:/xxxx/yyyy/zzzz.txt  의 디렉토리 풀패스 /xxxx/yyyy
        public string? FilePath { get; set; }

        //파일 명 (중복가능) 
        //파일주소 예) d:/xxxx/yyyy/zzzz.txt  의 디렉토리 파일명 zzzz.txt
        public string? SysFileName { get; set; }

        //파일주소 예) 유저가 업로드시 첨부파일 이름
        public string? UserFileName { get; set; }
        public string? FileExt { get; set; }
        public string? FileSize { get; set; }
        public string? RegDt { get; set; }

        public string[]? ImageList { get; set; }

        public string[]? TTSTextList { get; set; }

        public string? NotAncmtMgtNo { get; set; }

        //public string? CompleteDateTime { get; set; }

        [NotMapped]
        public string? DownloadFilePath { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        [NotMapped]
        [ForeignKey(nameof(NotAncmtMgtNo))]
        public SGGosigonggoInfo? GosigonggoInfo { get; set; }


        public string? ProcessStatus { get; set; } // Complete(완료) 만 사용 Processing(처리중) / Downloaded(다운로드) / Fail(에러) / Expired()
        public int FailCount { get; set; } = 0;

    }
}
