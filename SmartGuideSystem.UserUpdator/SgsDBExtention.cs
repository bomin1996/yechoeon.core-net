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

namespace SmartGuideSystem.UserUpdator
{
    public static class SgsDBExtention
    {
        public static SGDepartment ConvertToSGDepartment(this CMMTNDEPT orgDept)
        {
            string chosung = FindSearchFilter.ChosungDivider(orgDept.DEP_CODE_NM);

            var newDept = new SGDepartment
            {
                DeptCode = orgDept.DEP_CODE,
                Name = orgDept.DEP_CODE_NM ?? "",
                ParentDeptCode = orgDept.UPR_DEPT_CODE,
                DeptFullName = orgDept.DEP_FULL_NM,
                OfficeFax = orgDept.REP_FAX_NO,
                OfficeTel = orgDept.REP_TEL_NO,
                JobDescription = "",
                Depth = orgDept.DEPT_SEQ == null ? -1 : Convert.ToInt32(orgDept.DEPT_SEQ),
                DeptRank = orgDept.DEPT_RANK,
                DeptSe = orgDept.DEPT_SE,
                DeptSeq = orgDept.DEPT_SEQ,
                UseYn = orgDept.USE_YN == "1" ? true : false,
                SearchFilter1 = chosung
            };

            return newDept;
        }
        public static SGDepartment UpdateToSGDepartment(this CMMTNDEPT orgDept, SGDepartment item)
        {
            string chosung = FindSearchFilter.ChosungDivider(orgDept.DEP_CODE_NM);

            item.DeptCode = orgDept.DEP_CODE;
            item.Name = orgDept.DEP_CODE_NM ?? "";
            item.ParentDeptCode = orgDept.UPR_DEPT_CODE;
            item.DeptFullName = orgDept.DEP_FULL_NM;
            item.OfficeFax = orgDept.REP_FAX_NO;
            item.OfficeTel = orgDept.REP_TEL_NO;
            item.JobDescription = "";
            item.Depth = orgDept.DEPT_SEQ == null ? -1 : Convert.ToInt32(orgDept.DEPT_SEQ);
            item.DeptRank = orgDept.DEPT_RANK;
            item.UseYn = orgDept.USE_YN == "1" ? true : false;
            item.SearchFilter1 = chosung;
            return item;
            
        }
        public static SGUser ConvertToSGUser(this CMMTNUSER orgUser)
        {
            string chosung = FindSearchFilter.ChosungDivider(orgUser.USR_NM);
            var newUser = new SGUser
            {
                Sid = orgUser.USR_SID,
                Name = orgUser.USR_NM,
                SearchFilter3 = orgUser.USR_SID_DESC,
                LoginID = orgUser.LOGON_ID,
                DeptCode = orgUser.REAL_USE_DEP_CODE,
                DeptName = orgUser.REAL_USE_DEP_NM,
                DeptDescription = orgUser.REAL_USE_DEP_FULL_NM,
                JobDescription = orgUser.ADI_INFO7,
                TeamName = orgUser.BLG_TEAM_NM,
                TeamPosition = orgUser.RDUTY_NAME,
                PositionCode = orgUser.POSIT_CODE,
                PositionName = orgUser.POSIT_NM,
                GradeCode = orgUser.GRADE_NO, 
                GradeName= orgUser.GRADE_NM,
                OfficeFax = orgUser.FAX_NO,
                OfficeTel = orgUser.TELNO,
                Email = orgUser.EMAIL_ADDR,
                UseYn = orgUser.USE_YN == "1" ? true : false,
                UserRank = orgUser.USR_RANK,
                UpdateDateTime = orgUser.MOD_DT, 
                SearchFilter1 = chosung, 
                ModifiedTime = DateTime.UtcNow,
                Modifier =  "ssg add", 
                CreateType = "UDT",
                WorkerType = orgUser.ENGM_SE,
            };

            return newUser;
        }
        public static SGUser UpdateToSGUser(this CMMTNUSER orgUser, SGUser item)
        {
            string chosung = FindSearchFilter.ChosungDivider(orgUser.USR_NM);

            item.Sid = orgUser.USR_SID;
            item.Name = orgUser.USR_NM;
            item.LoginID = orgUser.LOGON_ID;
            //User SID *** 필터된것 가져온다. 
            item.SearchFilter3 = orgUser.USR_SID_DESC;
            item.DeptCode = orgUser.REAL_USE_DEP_CODE;
            item.DeptName = orgUser.REAL_USE_DEP_NM;
            item.DeptDescription = orgUser.REAL_USE_DEP_FULL_NM;
            item.TeamName = orgUser.BLG_TEAM_NM;
            item.TeamPosition = orgUser.RDUTY_NAME;
            item.PositionCode = orgUser.POSIT_CODE;
            item.PositionName = orgUser.POSIT_NM;
            item.GradeCode = orgUser.GRADE_NO;
            item.GradeName = orgUser.GRADE_NM;
            item.JobDescription = orgUser.ADI_INFO7;
            item.OfficeFax = orgUser.FAX_NO;
            item.OfficeTel = orgUser.TELNO;
            item.Email = orgUser.EMAIL_ADDR;
            item.UseYn = orgUser.USE_YN == "1" ? true : false;
            item.UserRank = orgUser.USR_RANK;
            item.UpdateDateTime = orgUser.MOD_DT;
            item.SearchFilter1 = chosung;
            item.ModifiedTime = DateTime.UtcNow;
            item.Modifier = "ssg mod";
            item.WorkerType = orgUser.ENGM_SE;

            return item;
        }
    }
}
