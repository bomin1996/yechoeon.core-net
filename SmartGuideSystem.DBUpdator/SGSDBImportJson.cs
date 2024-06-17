//using SmartGuideSystem.OracleDB.Model;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;
//using SmartGuideSystem.DB;
//using SmartGuideSystem.DB.Model;
//using System.Text.Encodings.Web;
//using System.Text.Json;
//using System.Text.Unicode;


//namespace SmartGuideSystem.DBUpdator
//{
//    public class SGSDBImportJson
//    {
//        private readonly SGSDataContext _sgsDbContext;
//        //private readonly ILogger<SGSDBExport> _logger;
//        public SGSDBImportJson(SGSDataContext sGSDataContext)
//        {
//            _sgsDbContext = sGSDataContext;
//        }


//        public bool ImportJsonFileToSGDB(string path)
//        {
//            try
//            {
//                if (path == "")
//                {
//                    path = @"C:\Projects\SW\backend\AspCoreOracleTester\export_20230222190420.json";
//                }
//                string jtext = File.ReadAllText(path);
//                var importedData = JsonSerializer.Deserialize<SGSDBExportJsonClass>(jtext);
//                if (_sgsDbContext.Departments.Count() < 1)
//                {
//                    var 진주시 = importedData.Departments.Find(d => d.ParentDeptCode == "53100000000");
//                    _sgsDbContext.Departments.Add(진주시);
//                    //var upperList = importedData.Departments.Where(d=> d.)
//                    importedData.Departments.ForEach(d =>
//                    {
//                        _sgsDbContext.Departments.Add(d);
//                    });
//                    //저장
//                    _sgsDbContext.SaveChanges();
//                }

//                //데이터가 없는것으로 간주한다. 
//                if (_sgsDbContext.Users.Count() < 1)
//                {
//                    importedData.Users.ForEach(d =>
//                    {
//                        _sgsDbContext.Users.Add(d);
//                    });
//                    //저장
//                    _sgsDbContext.SaveChanges();
//                    return true;
//                }
//                return true;
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }

//        public bool ImportCMMTNUSERToSGDB(List<CMMTNUSER> users)
//        {
//            try
//            {
//                //데이터가 없는것으로 간주한다. 
//                if (_sgsDbContext.Users.Count() < 1)
//                {
//                    users.ForEach(d =>
//                    {
//                        _sgsDbContext.Users.Add(d.ConvertToSGUser());
//                    });
//                    //저장
//                    _sgsDbContext.SaveChanges();
//                    return true;
//                }
//                else
//                {
                    
//                    foreach (var u in users)
//                    {
//                        var equalUsers = _sgsDbContext.Users.FirstOrDefault(sg => sg.Sid == u.USR_SID);
//                        if (equalUsers == null)
//                        {
//                            _sgsDbContext.Users.Add(u.ConvertToSGUser());
//                        }
//                        else
//                        {
//                            //있므면 업데이트 OR Pass 
//                            //if (string.IsNullOrEmpty(equalGosi.UpdateDate) &&
//                            //    equalGosi.UpdateDate.CompareTo(g.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss")) < 0)
//                            //{
//                            //    equalGosi = g.ConvertToSGGosi();
//                            //}
//                            equalUsers = u.UpdateToSGUser(equalUsers);
//                        }
//                    }
//                    _sgsDbContext.SaveChanges();
//                }

//                return true;
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }

//        public bool ImportCMMTNDEPTToSGDB(List<CMMTNDEPT> depts)
//        {
//            try
//            {
//                //데이터가 없는것으로 간주한다. 
//                if (_sgsDbContext.Departments.Count() < 1)
//                {
//                    //depts.ForEach(d =>
//                    //{
//                    //    _sgsDbContext.Departments.Add(d.ConvertToSGDepartment());
//                    //});
//                    //_sgsDbContext.SaveChanges();
//                    foreach (var d in depts)
//                    {
//                        _sgsDbContext.Departments.Add(d.ConvertToSGDepartment());
//                    }
//                    _sgsDbContext.SaveChanges();

//                    return true;
//                }
//                else
//                {
//                    foreach (var d in depts)
//                    {
//                        var equalDept = _sgsDbContext.Departments.FirstOrDefault(sg => sg.DeptCode == d.DEP_CODE);
//                        if (equalDept == null)
//                        {
//                            _sgsDbContext.Departments.Add(d.ConvertToSGDepartment());
//                        }
//                        else
//                        {
//                            //있므면 업데이트 OR Pass 
//                            //if (string.IsNullOrEmpty(equalGosi.UpdateDate) &&
//                            //    equalGosi.UpdateDate.CompareTo(g.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss")) < 0)
//                            //{
//                            //    equalGosi = g.ConvertToSGGosi();
//                            //}
//                            equalDept = d.UpdateToSGDepartment(equalDept);
//                            _sgsDbContext.SaveChanges();
//                        }
//                    }

//                }

//                return true;
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }

//        public bool ImportOFRTNANOTANCMTToSGDB(List<OFRTNANOTANCMT> gosiData)
//        {
//            try
//            {
//                //고시는 무조건 추가한다. 
//                //전략은 남아있는 고시 전부 삭제 후 추가 할수도있음. 
//                foreach (var g in gosiData)
//                {
//                    var equalGosi = _sgsDbContext.GosigoggoInfos.FirstOrDefault(sg => sg.NotAncmtMgtNo == g.NOT_ANCMT_MGT_NO);
//                    if (equalGosi == null)
//                    {
//                        _sgsDbContext.GosigoggoInfos.Add(g.ConvertToSGGosi());
//                    }
//                    else
//                    {
//                        ////있므면 업데이트 OR Pass 
//                        //if (string.IsNullOrEmpty(equalGosi.UpdateDateTime) &&
//                        //    equalGosi.UpdateDateTime.CompareTo(g.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss")) < 0)
//                        //{
//                        //    equalGosi = g.ConvertToSGGosi();
//                        //}
//                        equalGosi = g.ConvertToSGGosi();
//                    }
//                }
//                _sgsDbContext.SaveChanges();
//                return true;
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }

//        public bool ImportCMMTNFILEToSGDB(List<CMMTNFILE> fileData, List<OFRTNANOTANCMT> gosiData)
//        {
//            try
//            {
//                //고시는 무조건 추가한다. 
//                //전략은 남아있는 고시 전부 삭제 후 추가 할수도있음. 
//                foreach (var f in fileData)
//                {
//                    var gosiInfo = gosiData.FirstOrDefault(g => g.FILE_ID == f.FILE_ID);
//                    f.NOT_ANCMT_MGT_NO = gosiInfo?.NOT_ANCMT_MGT_NO;

//                    var equalFild = _sgsDbContext.SGFileInfos.FirstOrDefault(sg => sg.FileID == f.FILE_ID);
//                    if (equalFild == null)
//                    {
//                        _sgsDbContext.SGFileInfos.Add(f.ToSGFileDBInfo());
//                        _sgsDbContext.SaveChanges();
//                    }
//                    else
//                    {
//                        //없으면 삭제 한다. 
//                        //있므면 업데이트 OR Pass 
//                    }
//                }
//                return true;
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }
//        }
//    }
//}
