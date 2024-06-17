using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.OracleDB.Model;

namespace SmartGuideSystem.OracleDB.Updator
{
    public static class OracleDBQuerys
    {
        /// <summary>
        /// CMMTNUSER 기본 쿼리 
        /// </summary>
        /// <param name="_originDbContext"></param>
        /// <returns></returns>
        public static List<CMMTNUSER> GetCMMTNUser(this SGSOragcleDataContext _originDbContext)
        {
            //REAL_USE_DEP_CODE = 53100280000 "시의회"
            //                    53102%  "시청근무"
            //1200명 정도 

            //var userDB = _originDbContext.Cmmtnusers.Where(u => u.USE_YN == "1")
            //       .Where(u => u.USR_WORK_STATE_CODE != null)
            //       .Where(u => !EF.Functions.Like(u.USR_WORK_STATE_CODE!, "D%"))
            //       .Where(u => u.REAL_USE_DEP_CODE == "53100280000" || EF.Functions.Like(u.REAL_USE_DEP_CODE!, "53102%"))
            //       .Where(u => u.GRADE_NO != null)
            //       .ToList();

            //"53102030000" 
            //53102210000 도시 건설국

            // 퇴직이 아닌사람 다 가져온다. 
            var userDB = _originDbContext.Cmmtnusers
                .Where(u => u.USE_YN == "1")
                   .Where(u => u.USR_WORK_STATE_CODE != null)
                   //.Where(u => u.USR_WORK_STATE_CODE == "AAA")  // 재직
                   .Where(u=> !EF.Functions.Like(u.USR_WORK_STATE_CODE!, "D%"))
                   //53102210000
                   //.Where(u => u.REAL_USE_DEP_CODE == "53100280000" 
                   //|| EF.Functions.Like(u.REAL_USE_DEP_CODE!, "53101%") 
                   //|| EF.Functions.Like(u.REAL_USE_DEP_CODE!, "53102%") 
                   //|| EF.Functions.Like(u.REAL_USE_DEP_CODE!, "53103%"))
                   //.Where(u => u.BLG_TEAM_NM != null || u.RDUTY_NAME != null)
                   .OrderBy(u => u.REAL_USE_DEP_CODE)
                   .OrderBy(u => u.USR_RANK)
                   .ToList();

            var newUserList = (from udb in userDB
                           join vu in _originDbContext.Cmmtnv_users
                             on udb.USR_ID equals vu.USR_ID
                             select new CMMTNUSER
                             {
                                 LOGON_ID = udb.LOGON_ID,
                                 USR_ID = udb.USR_ID,
                                 USR_NM = udb.USR_NM,
                                 USR_SID = udb.USR_SID,
                                 USR_SID_DESC = vu.USR_SID,
                                 USR_WORK_STATE_CODE = udb.USR_WORK_STATE_CODE,
                                 USR_WORK_STATE_CODE_NM = udb.USR_WORK_STATE_CODE_NM,
                                 REAL_USE_DEP_CODE = udb.REAL_USE_DEP_CODE,
                                 REAL_USE_DEP_NM = udb.REAL_USE_DEP_NM,
                                 REAL_USE_DEP_FULL_NM = udb.REAL_USE_DEP_FULL_NM,
                                 POSIT_CODE = udb.POSIT_CODE,
                                 POSIT_NM = udb.POSIT_NM,
                                 GRADE_NO = udb.GRADE_NO,
                                 GRADE_NM = udb.GRADE_NM,
                                 TELNO = udb.TELNO,
                                 FAX_NO = udb.FAX_NO,
                                 EMAIL_ADDR = udb.EMAIL_ADDR,
                                 ADI_INFO7 = udb.ADI_INFO7,
                                 CRE_DT = udb.CRE_DT,
                                 MOD_DT = udb.MOD_DT,
                                 RDUTY_NAME = udb.RDUTY_NAME,
                                 USR_RANK = udb.USR_RANK,
                                 BLG_TEAM_NM = udb.BLG_TEAM_NM,
                                 USE_YN = udb.USE_YN,
                                 BASE_SYS = udb.BASE_SYS,
                                 CLSS_NM= udb.CLSS_NM,
                                 CLSS_NO= udb.CLSS_NO,

                             }).ToList();
            return newUserList;
        }


        public static List<CMMTNUSER> GetValidOracleUserDBofUiryeung(this SGSOragcleDataContext _originDbContext)
        {

            // 퇴직이 아닌사람 다 가져온다. 
            //USER SID 정보가 없다. 
            var userDB = _originDbContext.Cmmtnusers
                   .Where(u => u.USE_YN == "1")
                   .Where(u => u.USR_WORK_STATE_CODE != null)
                   .Where(u => !EF.Functions.Like(u.USR_WORK_STATE_CODE!, "D%"))
                   .OrderBy(u => u.REAL_USE_DEP_CODE)
                   .OrderBy(u => u.USR_RANK)
                   .ToList();

            
            return userDB;
        }

        public static List<CMMTNUSER> GetCMMTNUserByDeptCode(this SGSOragcleDataContext _originDbContext, string deptcode)
        {
            //REAL_USE_DEP_CODE = 53100280000 "시의회"
            //                    53102%  "시청근무"
            
            var usersInDept = _originDbContext.Cmmtnusers
                    //.Where(u => u.USE_YN == "1")
                   //.Where(u => u.USR_WORK_STATE_CODE != null)
                   //.Where(u => !EF.Functions.Like(u.USR_WORK_STATE_CODE!, "D%"))
                   .Where(u => u.REAL_USE_DEP_CODE == deptcode)
                   .OrderBy(u => u.REAL_USE_DEP_CODE)
                   .OrderBy(u => u.USR_RANK)
                   .ToList();

            var userList = (from userInDept in usersInDept
                               join vu in _originDbContext.Cmmtnv_users
                                 on userInDept.USR_ID equals vu.USR_ID
                               select new CMMTNUSER
                               {
                                   LOGON_ID = userInDept.LOGON_ID,
                                   USR_ID = userInDept.USR_ID,
                                   USR_NM = userInDept.USR_NM,
                                   USR_SID = userInDept.USR_SID,
                                   USR_SID_DESC = vu.USR_SID,
                                   USR_WORK_STATE_CODE = userInDept.USR_WORK_STATE_CODE,
                                   USR_WORK_STATE_CODE_NM = userInDept.USR_WORK_STATE_CODE_NM,
                                   REAL_USE_DEP_CODE = userInDept.REAL_USE_DEP_CODE,
                                   REAL_USE_DEP_NM = userInDept.REAL_USE_DEP_NM,
                                   REAL_USE_DEP_FULL_NM = userInDept.REAL_USE_DEP_FULL_NM,
                                   POSIT_CODE = userInDept.POSIT_CODE,
                                   POSIT_NM = userInDept.POSIT_NM,
                                   GRADE_NO = userInDept.GRADE_NO,
                                   GRADE_NM = userInDept.GRADE_NM,
                                   TELNO = userInDept.TELNO,
                                   FAX_NO = userInDept.FAX_NO,
                                   EMAIL_ADDR = userInDept.EMAIL_ADDR,
                                   ADI_INFO7 = userInDept.ADI_INFO7,
                                   CRE_DT = userInDept.CRE_DT,
                                   MOD_DT = userInDept.MOD_DT,
                                   RDUTY_NAME = userInDept.RDUTY_NAME,
                                   USR_RANK = userInDept.USR_RANK,
                                   BLG_TEAM_NM = userInDept.BLG_TEAM_NM,
                                   USE_YN = userInDept.USE_YN,
                                   BASE_SYS = userInDept.BASE_SYS,
                                   CLSS_NM = userInDept.CLSS_NM,
                                   CLSS_NO = userInDept.CLSS_NO,

                               }).ToList();
            return userList;
        }



        /// <summary>
        /// CMMTNDEPT 기본 쿼리 
        /// </summary>
        /// <param name="_originDbContext"></param>
        /// <returns></returns>
        public static List<CMMTNDEPT> GetCMMTNDept(this SGSOragcleDataContext _originDbContext)
        {
            //1.진주시 쿼리
            //DEP_CODE = "53100000000"

            //2.국 쿼리(국, 시장, 부시장, 공보관, 감사관, 항공우주사업단..그후로 국)

            //국(DEPT_SE == 1)
            //select* from CMMTNDEPT
            //where USE_YN = '1'
            //and(UPR_DEPT_CODE = '53100000000'
            //and DEPT_SE <= '1')
            //order by DEPT_SEQ , DEPT_RANK


            //3.과커리(upr_dept_coe가 진주시가 아닌것 그리고 자기가 진주시가 아닐것)
            //select* from CMMTNDEPT
            //where USE_YN = '1'
            //and UPR_DEPT_CODE != '53100000000'
            //and DEP_CODE != '53100000000'
            //and DEPT_SE >= 1
            //order by DEPT_SEQ , DEPT_RANK

            var si = _originDbContext.Cmmtndepts.FirstOrDefault(d => d.DEP_CODE == "53900000000");

            //필수 조건 !! 진주시 UPR_DEPF_CODE가없어야함 
            si.UPR_DEPT_CODE = null;

            var gook = _originDbContext.Cmmtndepts
                .Where(g => g.USE_YN == "1")
                .Where(g => g.UPR_DEPT_CODE == "53100000000" && g.DEPT_SE.CompareTo("1") <= 0)
                //.Where(g => g.DEP_CODE != "53102650000")
                //.Where(g => g.DEP_CODE != "53103040000")
                //.Where(g => g.DEP_CODE != "53102240000")
                //.Where(g => g.DEP_CODE != "53101060000")
                //.Where(g => g.DEP_CODE != "53102230000")
                //.Where(g => g.DEP_CODE != "53100290000")
                //.Where(g => g.DEP_CODE != "53100320000")
                .OrderBy(g => g.DEPT_SEQ)
                .OrderBy(g => g.DEPT_RANK).ToList();

            var gua = _originDbContext.Cmmtndepts
                .Where(g => g.USE_YN == "1")
                .Where(g => g.UPR_DEPT_CODE != "53100000000" && g.DEP_CODE != "53100000000")
                //.Where(g => g.UPR_DEPT_CODE != "53102650000")
                //.Where(g => g.UPR_DEPT_CODE != "53103040000")
                //.Where(g => g.UPR_DEPT_CODE != "53102240000")
                //.Where(g => g.UPR_DEPT_CODE != "53101060000")
                //.Where(g => g.UPR_DEPT_CODE != "53102230000")
                //.Where(g => g.UPR_DEPT_CODE != "53100290000")
                //.Where(g => g.UPR_DEPT_CODE != "53100320000")
                .OrderBy(g => g.DEPT_SE.CompareTo("1") >= 0)
                .OrderBy(g => g.DEPT_SEQ)
                .OrderBy(g => g.DEPT_RANK).ToList();

            var dong =
                _originDbContext.Cmmtndepts
                .Where(g => g.USE_YN == "1")
                .Where(g => g.UPR_DEPT_CODE == "53100000000" && g.DEP_CODE != "53100000000")
                .OrderBy(g => g.DEPT_SE.CompareTo("1") > 0)
                .OrderBy(g => g.DEPT_SEQ)
                .OrderBy(g => g.DEPT_RANK).ToList();

            var deptDB = new List<CMMTNDEPT>();
            deptDB.Add(si);
            deptDB.AddRange(gook);
            deptDB.AddRange(gua);
            deptDB.AddRange(dong);

            return deptDB;
        }


        public static List<CMMTNDEPT> GetAllDept(this SGSOragcleDataContext _originDbContext)
        {

            //1.의령군 쿼리
            //DEP_CODE = "53900000000"

            //2.국 쿼리(국, 시장, 부시장, 공보관, 감사관, 항공우주사업단..그후로 국)

            //국(DEPT_SE == 1)
            //select* from CMMTNDEPT
            //where USE_YN = '1'
            //and(UPR_DEPT_CODE = '53100000000'
            //and DEPT_SE <= '1')
            //order by DEPT_SEQ , DEPT_RANK


            //3.과커리(upr_dept_coe가 진주시가 아닌것 그리고 자기가 진주시가 아닐것)
            //select* from CMMTNDEPT
            //where USE_YN = '1'
            //and UPR_DEPT_CODE != '53100000000'
            //and DEP_CODE != '53100000000'
            //and DEPT_SE >= 1
            //order by DEPT_SEQ , DEPT_RANK

            var si = _originDbContext.Cmmtndepts.FirstOrDefault(d => d.DEP_CODE == "53900000000");

            //필수 조건 !! 진주시 UPR_DEPF_CODE가없어야함 
            si.UPR_DEPT_CODE = null;

            var gook = _originDbContext.Cmmtndepts
                .Where(g => g.USE_YN == "1")
                .Where(g => g.UPR_DEPT_CODE == "53900000000" && g.DEPT_SE.CompareTo("1") <= 0)
                //.Where(g => g.DEP_CODE != "53102650000")
                //.Where(g => g.DEP_CODE != "53103040000")
                //.Where(g => g.DEP_CODE != "53102240000")
                //.Where(g => g.DEP_CODE != "53101060000")
                //.Where(g => g.DEP_CODE != "53102230000")
                //.Where(g => g.DEP_CODE != "53100290000")
                //.Where(g => g.DEP_CODE != "53100320000")
                .OrderBy(g => g.DEPT_SEQ)
                .OrderBy(g => g.DEPT_RANK).ToList();

            var gua = _originDbContext.Cmmtndepts
                .Where(g => g.USE_YN == "1")
                .Where(g => g.UPR_DEPT_CODE != "53900000000" && g.DEP_CODE != "53900000000")
                //.Where(g => g.UPR_DEPT_CODE != "53102650000")
                //.Where(g => g.UPR_DEPT_CODE != "53103040000")
                //.Where(g => g.UPR_DEPT_CODE != "53102240000")
                //.Where(g => g.UPR_DEPT_CODE != "53101060000")
                //.Where(g => g.UPR_DEPT_CODE != "53102230000")
                //.Where(g => g.UPR_DEPT_CODE != "53100290000")
                //.Where(g => g.UPR_DEPT_CODE != "53100320000")
                .OrderBy(g => g.DEPT_SE.CompareTo("1") >= 0)
                .OrderBy(g => g.DEPT_SEQ)
                .OrderBy(g => g.DEPT_RANK).ToList();

            //var dong =
            //    _originDbContext.Cmmtndepts
            //    .Where(g => g.USE_YN == "1")
            //    .Where(g => g.UPR_DEPT_CODE == "53900000000" && g.DEP_CODE != "53900000000")
            //    .OrderBy(g => g.DEPT_SE.CompareTo("1") > 0)
            //    .OrderBy(g => g.DEPT_SEQ)
            //    .OrderBy(g => g.DEPT_RANK).ToList();

            var deptDB = new List<CMMTNDEPT>();
            deptDB.Add(si);
            deptDB.AddRange(gook);
            deptDB.AddRange(gua);
            //deptDB.AddRange(dong);

            return deptDB;
        }

        public static List<OFRTNANOTANCMT> GetCurrentOFRTNANOTANCMT(this SGSOragcleDataContext _originDbContext)
        {
            string now = DateTime.Now.ToString("yyyyMMdd");
            var gosiDB = _originDbContext.OFRTNANOTANCMTs
               .Where(g => g.HOMEPAGE_PBS_YN == "Y" && g.PBS_ST_YMD.CompareTo(now) <= 0 && g.PBS_END_YMD.CompareTo(now) >= 0)
               .OrderByDescending(g => g.LAST_MOD_TS)
               .ToList();
            return gosiDB;
        }

        public static List<CMMTNFILE> GetCMMTNFILE(this SGSOragcleDataContext _originDbContext, string fileId)
        {
            var fileDB = _originDbContext.CmmntFiles.Where(t => t.FILE_ID == fileId)
                           .ToList();

            return fileDB;
        }

        public static List<CMMTNFILE> GetCMMTNFILE(this SGSOragcleDataContext _originDbContext, List<OFRTNANOTANCMT> gosiList)
        {
            List<CMMTNFILE> list = new List<CMMTNFILE>();

            foreach (var gosiItem in gosiList)
            {
                var files = _originDbContext.CmmntFiles.Where(f => f.FILE_ID == gosiItem.FILE_ID).ToList();
                files.ForEach(fi =>
                {
                    list.Add(fi);
                });
            }
            return list;
        }

        public static List<CMMTNFILE> GetCMMTNFILEBySgGosi(this SGSOragcleDataContext _originDbContext, 
            List<SGGosigonggoInfo> gosiList)
        {
            List<CMMTNFILE> list = new List<CMMTNFILE>();

            foreach (var gosiItem in gosiList)
            {
                var files = _originDbContext.CmmntFiles.Where(f => f.FILE_ID == gosiItem.FileID 
                && (f.FILE_EXTN.ToLower() == "hwp" || f.FILE_EXTN.ToLower() == "hwpx" || f.FILE_EXTN.ToLower() == "pdf" )
                && gosiItem.SearchFilter1 == "완료").ToList();
                files.ForEach(fi =>
                {
                    fi.NOT_ANCMT_MGT_NO = gosiItem.NotAncmtMgtNo;
                    list.Add(fi);
                });
            }
            return list;
        }


    }
}
