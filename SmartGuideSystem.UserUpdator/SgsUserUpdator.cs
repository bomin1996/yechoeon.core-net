using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB;
using SSHDownloader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebpConverter;
using SmartGuideSystem.OracleDB.Updator;

namespace SmartGuideSystem.UserUpdator
{
    public class SgsUserUpdator
    {
        private readonly SGSOragcleDataContext _originDbContext;
        private readonly SGSDataContext _sgsDbContext;

        public Action<Exception> OnException { get; set; }
        public Action<string> OnInformation { get; set; }

        public SgsUserUpdator(SGSOragcleDataContext originDbContext, SGSDataContext sgsDbContext)
        {
            _originDbContext = originDbContext;
            _sgsDbContext = sgsDbContext;
        }

        public List<SGUser> UpdateSGUser()
        {
            var updatedUserList = new List<SGUser>();
            try
            {
                var orgUserList = _originDbContext.GetValidOracleUserDBofUiryeung();
                if (orgUserList == null || orgUserList.Count == 0)
                {
                    return updatedUserList;
                }

                orgUserList.ForEach(orguser =>
                {
                    var existUser = _sgsDbContext.Users.FirstOrDefault(d => d.Sid == orguser.USR_SID);
                    if (existUser == null)
                    {
                        var addeduser = orguser.ConvertToSGUser();
                        _sgsDbContext.Users.Add(addeduser);
                        updatedUserList.Add(addeduser);
                    }
                    else if (existUser.UpdateDateTime == null || existUser.UpdateDateTime.CompareTo(orguser.MOD_DT) < 0)
                    {
                        var updatedUser = orguser.UpdateToSGUser(existUser);
                        _sgsDbContext.Users.Update(updatedUser);
                        updatedUserList.Add(updatedUser);
                    }
                });

                //저장
                if (updatedUserList.Count > 0)
                {
                    _sgsDbContext.SaveChanges();
                }
                return updatedUserList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);

                return new List<SGUser>();
            }
        }

        public List<SGUser> ForcedUpdateSGUser()
        {
            var updatedUserList = new List<SGUser>();
            try
            {
                var oracleUserDBList = _originDbContext.GetValidOracleUserDBofUiryeung();
                var sgsdbUserList = _sgsDbContext.Users.ToList();
                
                foreach (var oracleUser in oracleUserDBList)
                {
                    var sgsUser = sgsdbUserList.FirstOrDefault(d => d.Sid == oracleUser.USR_SID);
                    if (sgsUser == null)
                    {
                        var addeduser = oracleUser.ConvertToSGUser();
                        _sgsDbContext.Users.Add(addeduser);
                        updatedUserList.Add(addeduser);
                    }
                    else
                    {
                        var updatedUser = oracleUser.UpdateToSGUser(sgsUser);
                        _sgsDbContext.Users.Update(updatedUser);
                        updatedUserList.Add(updatedUser);
                        sgsdbUserList.Remove(sgsUser);
                    }
                }

                foreach (var sgUser in sgsdbUserList)
                {
                    var orcUser = _originDbContext.Cmmtnusers.FirstOrDefault(ou => ou.USR_SID == sgUser.Sid);
                    if (orcUser != null)
                    {
                        var updatedUser = orcUser.UpdateToSGUser(sgUser);
                        _sgsDbContext.Users.Update(updatedUser);
                        updatedUserList.Add(updatedUser);
                    }
                    else
                    {
                        OnInformation?.Invoke($"SID : {sgUser.Sid}  Name:{sgUser.Name}이 오라클에 없음");
                    }
                }
                
                //저장
                if (updatedUserList.Count > 0)
                {
                    _sgsDbContext.SaveChanges();
                }
                return updatedUserList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);

                return new List<SGUser>();
            }
        }

        public List<SGDepartment> UpdateSGDepartment()
        {
            var updatedDeptList = new List<SGDepartment>();
            try
            {
                var orgDeptList = _originDbContext.GetAllDept();

                if (orgDeptList == null || orgDeptList.Count == 0)
                {
                    return updatedDeptList;
                }

                orgDeptList.ForEach(orgd =>
                {
                    var result = _sgsDbContext.Departments.FirstOrDefault(d => d.DeptCode == orgd.DEP_CODE);
                    if (result == null)
                    {
                        var addedDept = orgd.ConvertToSGDepartment();
                        _sgsDbContext.Departments.Add(addedDept);
                        updatedDeptList.Add(addedDept);
                    }
                    else if (result.UpdateDateTime == null || result.UpdateDateTime.CompareTo(orgd.MOD_DT) < 0)
                    {
                        orgd.UpdateToSGDepartment(result);
                        
                        _sgsDbContext.Departments.Update(result);
                        updatedDeptList.Add(result);
                    }
                });

                if (updatedDeptList.Count > 0)
                {
                    _sgsDbContext.SaveChanges();
                }
                return updatedDeptList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
                return new List<SGDepartment>();
            }
        }

        //private bool IsModified(SGDepartment sGDepartment, OracleDB.Model.CMMTNDEPT cMMTNDEPT) =>
        //    sGDepartment.UpdateDateTime == null || sGDepartment.UpdateDateTime.CompareTo(cMMTNDEPT.MOD_DT) < 0;
        //private bool IsModified(SGUser sgUser, OracleDB.Model.CMMTNUSER oracleUser) =>
        //    sgUser.UpdateDateTime == null || sgUser.UpdateDateTime.CompareTo(oracleUser.MOD_DT) < 0;
        //private void UpdateDepartment(SGDepartment sGDepartment, OracleDB.Model.CMMTNDEPT cMMTNDEPT)
        //{
        //    string chosung = FindSearchFilter.ChosungDivider(orgDept.DEP_CODE_NM);

        //    item.DeptCode = orgDept.DEP_CODE;
        //    item.Name = orgDept.DEP_CODE_NM ?? "";
        //    item.ParentDeptCode = orgDept.UPR_DEPT_CODE;
        //    item.DeptFullName = orgDept.DEP_FULL_NM;
        //    item.OfficeFax = orgDept.REP_FAX_NO;
        //    item.OfficeTel = orgDept.REP_TEL_NO;
        //    item.JobDescription = "";
        //    item.Depth = orgDept.DEPT_SEQ == null ? -1 : Convert.ToInt32(orgDept.DEPT_SEQ);
        //    item.DeptRank = orgDept.DEPT_RANK;
        //    item.UseYn = orgDept.USE_YN == "1" ? true : false;
        //    item.SearchFilter1 = chosung;
        //    return item;
        //}
        //private void UpdateAndMergeUser(SGUser sgsUser, OracleDB.Model.CMMTNUSER oracleUser)
        //{
        //    ////
            

        //    throw new NotImplementedException();
        //}


        //public List<SGDepartment> ____UpdateSGDepartment___()
        //{
        //    var updatedDeptList = new List<SGDepartment>();
        //    var orgDeptList = _originDbContext.GetAllDept();
        //    foreach (var oracleDept in orgDeptList)
        //    {
        //        var sgsDept = _sgsDbContext.Departments.FirstOrDefault(d => d.DeptCode == oracleDept.DEP_CODE);
        //        if (sgsDept == null)
        //        {
        //            sgsDept = oracleDept.ConvertToSGDepartment();
        //            _sgsDbContext.Departments.Add(sgsDept);
        //        }
        //        else if (IsModified(sgsDept, oracleDept))
        //        {
        //            UpdateDepartment(sgsDept, oracleDept);
        //            _sgsDbContext.Departments.Update(sgsDept);
        //        } 
        //        else
        //        {
        //            continue;
        //        }

        //        updatedDeptList.Add(sgsDept);
        //    }
        //    _sgsDbContext.SaveChanges();
        //}
        //public List<SGUser> ____UpdateSGUser______()
        //{
        //    var updatedUserList = new List<SGUser>();
        //    try
        //    {
        //        var oracleUserList = _originDbContext.GetCMMTNUserByUiryeung();
        //        oracleUserList.ForEach(oracleUser =>
        //        {
        //            var sgsUser = _sgsDbContext.Users.FirstOrDefault(d => d.Sid == oracleUser.USR_SID);
        //            if (sgsUser == null)
        //            {
        //                sgsUser = oracleUser.ConvertToSGUser();
        //                _sgsDbContext.Users.Add(sgsUser);
        //                updatedUserList.Add(sgsUser);

        //            }
        //            else if (IsModified(sgsUser, oracleUser))
        //            {
        //                sgsUser.UpdateAndMergeUser(oracleUser);
        //                _sgsDbContext.Users.Update(sgsUser);
        //                updatedUserList.Add(sgsUser);
        //            } 
        //        });

        //        //저장
        //        if (updatedUserList.Count > 0)
        //        {
        //            _sgsDbContext.SaveChanges();
        //        }
        //        return updatedUserList;
        //    }
        //    catch (Exception ex)
        //    {
        //        OnException?.Invoke(ex);

        //        return new List<SGUser>();
        //    }
        //}

        public List<SGUser> DownloadUserFile(string sshHost, int port, string username, string password,
            string photoServerPath,
            string photoDownloadPath,
            List<SGUser> downloadUserList)
        {
            var sshDownloadClient = new SSHDownloadClient(sshHost, port, username, password);

            var successDownloadUserList = new List<SGUser>();

            foreach (var user in downloadUserList)
            {
                try
                {
                    //OnInformation?.Invoke($"Start DownloadUserFile 부서  : {user?.DeptName} , 이름 :  {user?.Name}");
                    var updatedItem = _sgsDbContext.Users.FirstOrDefault(f => f.Sid == user.Sid);
                    if (updatedItem == null || updatedItem.SearchFilter3 == null)
                    {
                        continue;
                    }

                    if (Directory.Exists(photoDownloadPath) == false)
                    {
                        Directory.CreateDirectory(photoDownloadPath);
                    }

                    var newFileName = Guid.NewGuid().ToString() + ".jpg";
                    string createFilePath = System.IO.Path.Combine(photoDownloadPath, newFileName);

                    try
                    {
                        using (var outfile = new FileStream(createFilePath, FileMode.Create, FileAccess.Write))
                        {
                            var srcFileNameOnly = user.SearchFilter3 + ".jpg";

                            var downloadResult = sshDownloadClient.Download(photoServerPath, srcFileNameOnly, outfile);

                            if (downloadResult)
                            {
                                //RelativePath 하지 않고 이름만 넣는다. 
                                //var lastDateFolderPath = Path.GetFileName(config.PhotoDownloadPath);
                                //var reletivePath = Path.Combine(lastDateFolderPath, newFileName);
                                //updatedItem.Photo = reletivePath;
                                updatedItem.Photo = newFileName;
                                _sgsDbContext.Users.Update(updatedItem);
                                successDownloadUserList.Add(updatedItem);
                            }
                            else
                            {
                                OnInformation?.Invoke("Download Fail Path: " + photoServerPath + " FileName:" + user.SearchFilter3 + ".jpg");
                                OnInformation?.Invoke("Download Fail newFileName " + newFileName);

                                if (System.IO.File.Exists(createFilePath))
                                {
                                    System.IO.File.Delete(createFilePath);
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        OnInformation?.Invoke("Download Fail Exception Path: " + photoServerPath + " FileName:" + user.SearchFilter3 + ".jpg");
                        OnInformation?.Invoke("Download Fail Exception newFileName " + newFileName);

                        if (System.IO.File.Exists(createFilePath))
                        {
                            System.IO.File.Delete(createFilePath);
                        }
                        OnException?.Invoke(ex);
                    }


                }
                catch (Exception ex)
                {
                    OnException?.Invoke(ex);
                }
            }

            return successDownloadUserList;
        }


        public List<SGUser> ConvertJpgToWebp(List<SGUser> converList, string downloadPath, string convertPath)
        {
            var sucessConvertUserlist = new List<SGUser>();
            try
            {
                foreach (var sgUser in converList)
                {
                    if (string.IsNullOrEmpty(sgUser.Photo))
                    {
                        OnInformation?.Invoke($"UserName: {sgUser.Name}, PhotoPath: {sgUser.Photo}, UserID: {sgUser.SearchFilter3}");
                        continue;
                    }

                    if (Directory.Exists(convertPath) == false)
                    {
                        Directory.CreateDirectory(convertPath);
                    }

                    var newFileName = Path.GetFileNameWithoutExtension(sgUser.Photo);
                    var srcJPG = System.IO.Path.Combine(downloadPath, newFileName + ".jpg");
                    var destWebp = System.IO.Path.Combine(convertPath, newFileName + ".webp");

                    var webpConvertErrorJpgPath = System.IO.Path.Combine(convertPath, newFileName + ".jpg");
                    try
                    {
                        //Webp로 변경
                        ConvertWebpImageHelper.ConvertJpgToWebp(srcJPG, destWebp);

                        //string relativeImagePath = "";
                        //if (System.IO.File.Exists(destWebp))
                        //{
                        //    var lastDateFolderPath = Path.GetFileName(convertPath);
                        //    relativeImagePath = Path.Combine(lastDateFolderPath, Path.GetFileName(destWebp));
                        //}
                        //sgUser.Photo = relativeImagePath;

                        var lastSavedFileName = Path.GetFileName(destWebp);
                        sgUser.Photo = lastSavedFileName;

                        sgUser.UpdateDateTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                        _sgsDbContext.Update(sgUser);
                        sucessConvertUserlist.Add(sgUser);

                    }
                    catch (Exception ex)
                    {
                        OnInformation?.Invoke($"ConvertWebpImageHelper Exception!! srcJPG : {srcJPG} , dest Webp : {destWebp}");
                        OnException?.Invoke(ex);

                        ////웹피로 저장하지 못했다면 FileCopy 시킨다. 
                        try
                        {
                            System.IO.File.Copy(srcJPG, webpConvertErrorJpgPath, true);
                        }
                        catch(Exception ex2)
                        {
                            OnException?.Invoke(ex2);
                        }
                    }
                }
                _sgsDbContext.SaveChanges();
                return sucessConvertUserlist;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
                return new List<SGUser>();
            }
        }




        public bool DownloadUserProfilePhotoBySGUser(string sshhost, int port , string username, string password, string photoServerPath, string photoDownloadPath, SGUser sgUser)
        {
            if (sgUser == null || string.IsNullOrEmpty(sgUser.SearchFilter3))
            {
                return false;
            }

            if (Directory.Exists(photoDownloadPath) == false)
            {
                Directory.CreateDirectory(photoDownloadPath);
            }

           var sshDownloadClient = new SSHDownloadClient(sshhost, port, username, password);
            
            try
            {
                //파일명 생성 
                var newFileName = Guid.NewGuid().ToString() + ".jpg";
                string createFilePath = System.IO.Path.Combine(photoDownloadPath, newFileName);
                var tempFilePath = System.IO.Path.GetTempFileName();
                OnInformation?.Invoke("tempFilePath " + tempFilePath);

                using (var outfile = new FileStream(tempFilePath, FileMode.OpenOrCreate))
                {
                    var srcFileNameOnly = sgUser.SearchFilter3 + ".jpg";
                    var downloadResult = sshDownloadClient.Download(photoServerPath, srcFileNameOnly, outfile);
                    if (downloadResult)
                    {
                        OnInformation?.Invoke("downloadResult OK , NewFileName:" + createFilePath);

                        //RelativePath 하지 않고 이름만 넣는다. 
                        //var lastDateFolderPath = Path.GetFileName(config.PhotoDownloadPath);
                        //var reletivePath = Path.Combine(lastDateFolderPath, newFileName);
                        //updatedItem.Photo = reletivePath;
                        File.Copy(tempFilePath, createFilePath, true);
                        sgUser.Photo = newFileName;
                        return true;
                    }
                    else
                    {
                        OnInformation?.Invoke("Download Fail Path: " + photoServerPath + " FileName:" + sgUser.SearchFilter3 + ".jpg");
                        OnInformation?.Invoke("Download Fail newFileName " + newFileName);
                    }
                }
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
            }

            return false;

        }

        /// <summary>
        /// Jpg = > Webp로 변경 시키고 없으면 기존 jpg를 카피 해서 옮겨 놓는다. 
        /// </summary>
        /// <param name="converUser"></param>
        /// <param name="downloadPath"></param>
        /// <param name="convertPath"></param>
        /// <returns></returns>
        public bool ConvertProfilePhotoImage(SGUser converUser, string downloadPath, string convertPath)
        {
            try
            {
                if (string.IsNullOrEmpty(converUser.Photo))
                {
                    OnInformation?.Invoke($"UserName: {converUser.Name}, PhotoPath: {converUser.Photo}, UserID: {converUser.SearchFilter3}");
                    return false;
                }

                if (Directory.Exists(convertPath) == false)
                {
                    Directory.CreateDirectory(convertPath);
                }

                var newFileName = Path.GetFileNameWithoutExtension(converUser.Photo);
                var srcJPG = System.IO.Path.Combine(downloadPath, newFileName + ".jpg");
                var destWebp = System.IO.Path.Combine(convertPath, newFileName + ".webp");

                var webpConvertErrorJpgPath = System.IO.Path.Combine(convertPath, newFileName + ".jpg");
                try
                {
                    //Webp로 변경
                    ConvertWebpImageHelper.ConvertJpgToWebp(srcJPG, destWebp);
                    var lastSavedFileName = Path.GetFileName(destWebp);
                    converUser.Photo = lastSavedFileName;
                    converUser.UpdateDateTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                }
                catch (Exception ex)
                {
                    OnInformation?.Invoke($"ConvertWebpImageHelper Exception!! srcJPG : {srcJPG} , dest Webp : {destWebp}");
                    OnException?.Invoke(ex);
                    ////웹피로 저장하지 못했다면 FileCopy 시킨다. 
                    try
                    {
                        System.IO.File.Copy(srcJPG, webpConvertErrorJpgPath, true);
                    }
                    catch (Exception ex2)
                    {
                        OnException?.Invoke(ex2);
                    }
                }

                return true;

            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
            }
            return false;
        }
    }
}
