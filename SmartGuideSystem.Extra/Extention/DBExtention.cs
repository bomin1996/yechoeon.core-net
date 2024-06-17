using SmartGuideSystem.DB.Model;
using SmartGuideSystem.OracleDB.Model;

namespace SmartGuideSystem.Extra.Extention
{
    public static class DBExtention
    {
        public static SGGosigonggoInfo ConvertToSGGosi(this OFRTNANOTANCMT orgGosi)
        {
            var newGosi = new SGGosigonggoInfo
            {
                NotAncmtMgtNo = orgGosi.NOT_ANCMT_MGT_NO,
                Title = orgGosi.NOT_ANCMT_SJ,
                PostDate = orgGosi.PBS_HOP_YMD,
                DeptCode = orgGosi.CHA_DEP_CODE,
                Subject = orgGosi.NOT_ANCMT_SJ,
                Contents = orgGosi.NOT_ANCMT_CN,
                GosiType = orgGosi.NOT_ANCMT_SE_CODE,
                Tel = orgGosi.TELNO,
                StartPeriod = orgGosi.PBS_ST_YMD,
                EndPeriod = orgGosi.PBS_END_YMD,
                Mail = orgGosi.MAIL,
                FileID = orgGosi.FILE_ID,
                UpdateDateTime = orgGosi.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss"),
                GosiRegNo = orgGosi.NOT_ANCMT_REG_NO,
                GosiNumber = $"고시 제 {orgGosi.NOT_ANCMT_REG_NO} 호",
                DELETE_YN = orgGosi.DELETE_YN
            };

            return newGosi;
        }

        public static SGGosigonggoInfo UpdateToSGGosi(this OFRTNANOTANCMT orgGosi, SGGosigonggoInfo item)
        {
            item.NotAncmtMgtNo = orgGosi.NOT_ANCMT_MGT_NO;
            item.Title = orgGosi.NOT_ANCMT_SJ;
            item.PostDate = orgGosi.PBS_HOP_YMD;
            item.DeptCode = orgGosi.CHA_DEP_CODE;
            item.Subject = orgGosi.NOT_ANCMT_SJ;
            item.Contents = orgGosi.NOT_ANCMT_CN;
            item.GosiType = orgGosi.NOT_ANCMT_SE_CODE;
            item.Tel = orgGosi.TELNO;
            item.StartPeriod = orgGosi.PBS_ST_YMD;
            item.EndPeriod = orgGosi.PBS_END_YMD;
            item.Mail = orgGosi.MAIL;
            item.FileID = orgGosi.FILE_ID;
            item.UpdateDateTime = orgGosi.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss");
            item.GosiRegNo = orgGosi.NOT_ANCMT_REG_NO;
            item.GosiNumber = $"고시 제 {orgGosi.NOT_ANCMT_REG_NO} 호";
            item.DELETE_YN = orgGosi.DELETE_YN;
            return item;
        }

        public static SGFileInfo ConvertToSGFile(this CMMTNFILE ofgFile)
        {
            var newFile = new SGFileInfo
            {
                FileSeq = ofgFile.FILE_SEQ,
                FileID = ofgFile.FILE_ID,
                FilePath = ofgFile.FILE_PATH,
                FileExt = ofgFile.FILE_EXTN,
                SysFileName = ofgFile.SYS_FILE_NM,
                UserFileName = ofgFile.USER_FILE_NM,
                RegDt = ofgFile.REG_DT,
                FileSize = ofgFile.FILE_SIZE,
                NotAncmtMgtNo = ofgFile.NOT_ANCMT_MGT_NO
            };

            return newFile;
        }

        public static SGFileInfo UpdateSGFile(this CMMTNFILE orgFile, SGFileInfo item)
        {
            item.FileSeq = orgFile.FILE_SEQ;
            item.FileID = orgFile.FILE_ID;
            item.FilePath = orgFile.FILE_PATH;
            item.FileExt = orgFile.FILE_EXTN;
            item.SysFileName = orgFile.SYS_FILE_NM;
            item.UserFileName = orgFile.USER_FILE_NM;
            item.RegDt = orgFile.REG_DT;
            item.FileSize = orgFile.FILE_SIZE;
            item.NotAncmtMgtNo = orgFile.NOT_ANCMT_MGT_NO;
            return item;
        }
    }
}
