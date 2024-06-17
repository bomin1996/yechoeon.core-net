using HanChosung;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.VisualBasic;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.OracleDB.Model;
using System;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace SmartGuideSystem.DBUpdator
{
    public static class SgsDBExtention
    {

        //public static List<SGFileInfo> GetSGFiles(this SGSOragcleDataContext _originDbContext, List<OFRTNANOTANCMT> _gosiDB)
        //{
        //    //var result = (from ofr in _gosiDB
        //    //              join fi in _originDbContext.CmmntFiles on ofr.FILE_ID equals fi.FILE_ID
        //    //              select new SGFileInfo
        //    //              {
        //    //                  FileID = fi.FILE_ID,
        //    //                  FileSeq = fi.FILE_SEQ,
        //    //                  FilePath = fi.FILE_PATH,
        //    //                  SysFileName = fi.SYS_FILE_NM,
        //    //                  UserFileName = fi.USER_FILE_NM,
        //    //                  FileExt = fi.FILE_EXTN,
        //    //                  FileSize = fi.FILE_SIZE,
        //    //                  RegDt = fi.REG_DT,
        //    //              }).ToList();

        //    //return result;
        //    List<SGFileInfo> list = new List<SGFileInfo>();

        //    foreach (var gosiItem in _gosiDB)
        //    {
        //        var files = _originDbContext.CmmntFiles.Where(f => f.FILE_ID == gosiItem.FILE_ID).ToList();
        //        files.ForEach(fi =>
        //        {
        //            var nitem = new SGFileInfo
        //            {
        //                FileID = fi.FILE_ID,
        //                FileSeq = fi.FILE_SEQ,
        //                FilePath = fi.FILE_PATH,
        //                SysFileName = fi.SYS_FILE_NM,
        //                UserFileName = fi.USER_FILE_NM,
        //                FileExt = DateTime.Now.ToString(),
        //                FileSize = fi.FILE_SIZE,
        //                RegDt = fi.REG_DT,
        //                NotAncmtMgtNo = fi.NOT_ANCMT_MGT_NO
        //            };
        //            list.Add(nitem);

        //        });

        //    }


        //    return list;
        //}


        //public static List<SGGosigonggoInfo> MakeSGGosi(List<OFRTNANOTANCMT> gosiDB)
        //{
        //    var sgGosigongo1 = new List<SGGosigonggoInfo>();

        //    foreach (var item in gosiDB)
        //    {
        //        sgGosigongo1.Add(item.ConvertToSGGosi());
        //    }

        //    return sgGosigongo1;
        //}


        //public static SGDepartment ConvertToSGDepartment(this CMMTNDEPT orgDept)
        //{
        //    string chosung = FindSearchFilter.ChosungDivider(orgDept.DEP_CODE_NM);

        //    var newDept = new SGDepartment
        //    {
        //        DeptCode = orgDept.DEP_CODE,
        //        Name = orgDept.DEP_CODE_NM ?? "",
        //        ParentDeptCode = orgDept.UPR_DEPT_CODE,
        //        DeptFullName = orgDept.DEP_FULL_NM,
        //        OfficeFax = orgDept.REP_FAX_NO,
        //        OfficeTel = orgDept.REP_TEL_NO,
        //        JobDescription = "",
        //        Depth = orgDept.DEPT_SEQ == null ? -1 : Convert.ToInt32(orgDept.DEPT_SEQ),
        //        DeptRank = orgDept.DEPT_RANK,
        //        DeptSe = orgDept.DEPT_SE,
        //        DeptSeq = orgDept.DEPT_SEQ,
        //        UseYn = orgDept.USE_YN == "1" ? true : false,
        //        SearchFilter1 = chosung
        //    };

        //    return newDept;
        //}

        //public static SGDepartment UpdateToSGDepartment(this CMMTNDEPT orgDept, SGDepartment item)
        //{
        //    string chosung = FindSearchFilter.ChosungDivider(orgDept.DEP_CODE_NM);

        //    item.DeptCode = orgDept.DEP_CODE;
        //    item.Name = orgDept.DEP_CODE_NM ?? "";
        //    item.ParentDeptCode = orgDept.UPR_DEPT_CODE;
        //    item.DeptFullName = orgDept.DEP_FULL_NM;
        //    item.OfficeFax = orgDept.REP_FAX_NO;
        //    item.OfficeTel = orgDept.REP_TEL_NO;
        //    item.JobDescription = "";
        //    item.Depth = -1;
        //    item.UseYn = orgDept.USE_YN == "1" ? true : false;
        //    item.SearchFilter1 = chosung;
        //    return item;

        //}


        //public static SGUser ConvertToSGUser(this CMMTNUSER orgUser)
        //{
        //    string chosung = FindSearchFilter.ChosungDivider(orgUser.USR_NM);
        //    var newUser = new SGUser
        //    {
        //        Sid = orgUser.USR_SID,
        //        Name = orgUser.USR_NM,
        //        SearchFilter3 = orgUser.USR_SID_DESC,
        //        LoginID = orgUser.LOGON_ID,
        //        DeptCode = orgUser.REAL_USE_DEP_CODE,
        //        DeptName = orgUser.REAL_USE_DEP_NM,
        //        DeptDescription = orgUser.REAL_USE_DEP_FULL_NM,
        //        JobDescription = orgUser.ADI_INFO7,
        //        TeamName = orgUser.BLG_TEAM_NM,
        //        TeamPosition = orgUser.RDUTY_NAME,
        //        PositionCode = orgUser.POSIT_CODE,
        //        PositionName = orgUser.POSIT_NM,
        //        GradeCode = orgUser.GRADE_NO,
        //        GradeName = orgUser.GRADE_NM,
        //        OfficeFax = orgUser.FAX_NO,
        //        OfficeTel = orgUser.TELNO,
        //        Email = orgUser.EMAIL_ADDR,
        //        UseYn = orgUser.USE_YN == "1" ? true : false,
        //        UserRank = orgUser.USR_RANK,
        //        UpdateDateTime = orgUser.MOD_DT,
        //        SearchFilter1 = chosung
        //    };

        //    return newUser;
        //}


        //public static SGUser UpdateToSGUser(this CMMTNUSER orgUser, SGUser item)
        //{
        //    string chosung = FindSearchFilter.ChosungDivider(orgUser.USR_NM);

        //    item.Sid = orgUser.USR_SID;
        //    item.Name = orgUser.USR_NM;
        //    item.LoginID = orgUser.LOGON_ID;
        //    item.SearchFilter3 = orgUser.USR_SID_DESC;
        //    item.DeptCode = orgUser.REAL_USE_DEP_CODE;
        //    item.DeptName = orgUser.REAL_USE_DEP_NM;
        //    item.DeptDescription = orgUser.REAL_USE_DEP_FULL_NM;
        //    item.TeamName = orgUser.BLG_TEAM_NM;
        //    item.TeamPosition = orgUser.RDUTY_NAME;
        //    item.PositionCode = orgUser.POSIT_CODE;
        //    item.PositionName = orgUser.POSIT_NM;
        //    item.GradeCode = orgUser.GRADE_NO;
        //    item.GradeName = orgUser.GRADE_NM;
        //    item.JobDescription = orgUser.ADI_INFO7;
        //    item.OfficeFax = orgUser.FAX_NO;
        //    item.OfficeTel = orgUser.TELNO;
        //    item.Email = orgUser.EMAIL_ADDR;
        //    item.UseYn = orgUser.USE_YN == "1" ? true : false;
        //    item.UserRank = orgUser.USR_RANK;
        //    item.UpdateDateTime = orgUser.MOD_DT;
        //    item.SearchFilter1 = chosung;

        //    return item;
        //}

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
