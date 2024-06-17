using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.OracleDB.Updator;
using SSHDownloader;
using HanAutoCon.Services;
using HanAutoCon.Utils;

namespace SmartGuideSystem.DBUpdator
{
    public class SGSDbUpdator
    {
        private readonly SGSOragcleDataContext _originDbContext;
        private readonly SGSDataContext _sgsDbContext;
        private SSHDownloadClient _sshDownloadClient;

        public Action<Exception> OnException { get; set; }
        public Action<string> OnInformation { get; set; }

        public SGSDbUpdator(SGSOragcleDataContext originDbContext, SGSDataContext sgsDbContext)
        {
            _originDbContext = originDbContext;
            _sgsDbContext = sgsDbContext;
        }

        public List<SGGosigonggoInfo> UpdateSGGosigonggo()
        {
            var updatedGosiList = new List<SGGosigonggoInfo>();
            try
            {
                // Oracle DB 에서 가져오기 
                var sourceGosiList = _originDbContext.GetCurrentOFRTNANOTANCMT();
                if (sourceGosiList == null || sourceGosiList.Count == 0)
                {
                    return new List<SGGosigonggoInfo>();
                }
                
                sourceGosiList.ForEach(orggosi =>
                {
                    var gosiStat = _originDbContext.GOSI_STATs.FirstOrDefault(g => g.APV_DOC_VUL == $"1OFR{orggosi.NOT_ANCMT_MGT_NO}");
                    var result = _sgsDbContext.GosigoggoInfos.FirstOrDefault(d => d.NotAncmtMgtNo == orggosi.NOT_ANCMT_MGT_NO);
                    //SEND_INFO == "완료" 인것만 추가한다. 
                    
                    //신규 
                    if (result == null)
                    {
                        if (gosiStat?.SEND_INFO == "완료")
                        {
                            var addedItem = orggosi.ConvertToSGGosi();
                            addedItem.SearchFilter1 = gosiStat.SEND_INFO;
                            _sgsDbContext.GosigoggoInfos.Add(addedItem);
                            updatedGosiList.Add(addedItem);

                            OnInformation?.Invoke($"New UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {addedItem?.FileID}");
                        }
                    }
                    else if (gosiStat?.SEND_INFO != "완료")
                    {
                        //완료 안된 데이터는 가져올수 없으므로 
                        var updatedItem = orggosi.UpdateToSGGosi(result);
                        updatedItem.SearchFilter1 = gosiStat?.SEND_INFO;
                        _sgsDbContext.GosigoggoInfos.Update(updatedItem);
                        updatedGosiList.Add(updatedItem);

                        OnInformation?.Invoke($"완료안된 고시공고  UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {updatedItem?.FileID}");
                    }
                    else if (result.UpdateDateTime == null
                    || result.UpdateDateTime.CompareTo(orggosi.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss")) < 0)
                    {                      
                        var updatedItem = orggosi.UpdateToSGGosi(result);
                        updatedItem.SearchFilter1 = gosiStat?.SEND_INFO;
                        _sgsDbContext.GosigoggoInfos.Update(updatedItem);
                        updatedGosiList.Add(updatedItem);

                        OnInformation?.Invoke($"Update UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {updatedItem?.FileID}");
                    }
                });

                //저장
                _sgsDbContext.SaveChanges();
                return updatedGosiList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
                return null;
            }
        }

        private bool IsValidFileExtension(SGFileInfo sGFileInfo)
        {
            if (!string.IsNullOrEmpty(sGFileInfo.FileExt) 
                && (sGFileInfo.FileExt.ToLower() == "hwp" 
                || sGFileInfo.FileExt.ToLower() == "hwpx" 
                || sGFileInfo.FileExt.ToLower() == "pdf")
                             )
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //현재 사용중 
        public List<SGFileInfo> UpdateSGFile(List<SGGosigonggoInfo> updatedGosiList)
        {
            var updatedFileList = new List<SGFileInfo>();
            try
            {
                //컨펌된 데이터만 가져옴 
                //나중에 컨펌된 고시만 띄워줌
                var sourceFileList = _originDbContext.GetCMMTNFILEBySgGosi(updatedGosiList);
                if (sourceFileList == null || sourceFileList.Count == 0)
                {
                    return new List<SGFileInfo>();
                }

                Dictionary<string, SortedList<int, SGFileInfo>> fileByFileID = new Dictionary<string, SortedList<int, SGFileInfo>>();

                sourceFileList.ForEach(oracleFileInfo =>
                {
                    var result = _sgsDbContext.SGFileInfos.FirstOrDefault(d => d.FileID == oracleFileInfo.FILE_ID && d.FileSeq == oracleFileInfo.FILE_SEQ );

                    if (result == null ) // 신규파일
                    {
                        var fileInfoRow = oracleFileInfo.ConvertToSGFile();
                        if (IsValidFileExtension(fileInfoRow))
                        {
                            _sgsDbContext.SGFileInfos.Add(fileInfoRow);
                            OnInformation?.Invoke($"UpdateSGFile New File : SysFileName = ${fileInfoRow?.UserFileName}");

                            if (fileByFileID.TryGetValue(fileInfoRow.FileID, out var list))
                            {
                                list.Add(fileInfoRow.FileSeq, fileInfoRow);
                            }
                            else
                            {
                                fileByFileID.Add(fileInfoRow.FileID, new SortedList<int, SGFileInfo> { [fileInfoRow.FileSeq] = fileInfoRow });
                            }
                        }
                        else
                        {
                            OnInformation?.Invoke($"Skip Invalid File Extension New File : SysFileName = ${fileInfoRow?.UserFileName}");
                        }

                        //이전에 등록된 파일이 있는지 확인 
                        //var beforeExistVaildGosiFile = _sgsDbContext.SGFileInfos.FirstOrDefault(d => d.FileID == oracleFileInfo.FILE_ID);
                        
                        
                    }
                    else if (result.RegDt == null || result.RegDt.CompareTo(oracleFileInfo.REG_DT) < 0) // Update exist file info
                    {
                        var updatedSgsFileInfo = oracleFileInfo.UpdateSGFile(result);
                        _sgsDbContext.SGFileInfos.Update(updatedSgsFileInfo);

                        if (IsValidFileExtension(updatedSgsFileInfo))
                        {
                            //updatedFileList.Add(updatedSgsFileInfo);
                            OnInformation?.Invoke($"UpdateSGFile Update File : SysFileName = ${updatedSgsFileInfo?.UserFileName}");

                            if (fileByFileID.TryGetValue(updatedSgsFileInfo.FileID, out var list))
                            {
                                list.Add(updatedSgsFileInfo.FileSeq, updatedSgsFileInfo);
                            }
                            else
                            {
                                fileByFileID.Add(updatedSgsFileInfo.FileID, new SortedList<int, SGFileInfo> { [updatedSgsFileInfo.FileSeq] = updatedSgsFileInfo });
                            }
                        }
                        else
                        {
                            OnInformation?.Invoke($"Update FileInfo But,  Invalid File Extension New File : SysFileName = ${updatedSgsFileInfo?.UserFileName}");
                        }
                    }
                });

                foreach (var kvp in fileByFileID)
                {
                    updatedFileList.Add(kvp.Value.First().Value);

                    //6월 2째주 업데이트 
                    //var value = kvp.Value.First().Value;
                    //updatedFileList.Add(value);

                    //var gosi = updatedGosiList.FirstOrDefault(g => g.NotAncmtMgtNo == value.NotAncmtMgtNo);
                    
                    //if (gosi != null)
                    //{
                    //    gosi.FileSeq = value.FileSeq;
                    //    _sgsDbContext.GosigoggoInfos.Update(gosi); 
                    //}
                }
                

                //저장
                _sgsDbContext.SaveChanges();
                return updatedFileList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex  );

                return null;
            }
        }

        //현재 사용중 
        public List<SGFileInfo> RemoveSGFileAndGosi(List<SGGosigonggoInfo> updatedGosiList)
        {
            var removeFileList = new List<SGFileInfo>();
            try
            {
                var removeGosiList = updatedGosiList.Where(g => g.SearchFilter1 != "완료").ToList();

                //고시 파일 삭제
                removeGosiList.ForEach(gosiItem => {
                  var removeFileList = _sgsDbContext.SGFileInfos.Where(d => d.FileID == gosiItem.FileID).ToList();
                    removeFileList.ForEach(fileItem =>
                    {
                        removeFileList.Add(fileItem);
                        _sgsDbContext.SGFileInfos.Remove(fileItem);

                        OnInformation?.Invoke($"[RemoveSGFileAndGosi] Remove SGFile DB : FileID = ${fileItem?.FileID}  FileName : {fileItem?.UserFileName}");
                    });

                    //고시 삭제 
                    _sgsDbContext.GosigoggoInfos.Remove(gosiItem);
                    OnInformation?.Invoke($"[RemoveSGFileAndGosi] Remove SGGosi DB : 고시번호 = ${gosiItem?.GosiNumber}  Title : {gosiItem?.Title}  상태 : {gosiItem?.SearchFilter1}"  );

                });

                //저장
                _sgsDbContext.SaveChanges();

                return removeFileList;
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);

                return null;
            }
        }

        //현재 사용중 
        public List<SGFileInfo> DownloadGosiFile(string host, int port, string username ,string password, string gosiDownloadPath, List<SGFileInfo> updatedFiles)
        {
            _sshDownloadClient = new SSHDownloadClient(host, port, username, password);

            var downloadedFileList = new List<SGFileInfo>();

            foreach (var sgFile in updatedFiles)
            {
                try
                {
                    OnInformation?.Invoke($"DownloadGosiFile : {sgFile?.UserFileName}    SysFileName : {sgFile?.SysFileName}  FileID : {sgFile?.FileID}");
                    var updatedItem = _sgsDbContext.SGFileInfos.FirstOrDefault(f => f.FileID == sgFile.FileID && f.FileSeq == sgFile.FileSeq);

                    if (updatedItem == null)
                    {
                        continue;
                    }

                    if (updatedItem.FilePath == null || updatedItem.SysFileName == null)
                    {
                        continue;
                    }

                    var lastDateFolderPath = Path.GetFileName(updatedItem.FilePath);
                    var downloadPath = System.IO.Path.Combine(gosiDownloadPath, lastDateFolderPath);

                    if (Directory.Exists(downloadPath) == false)
                    {
                        Directory.CreateDirectory(downloadPath);
                    }

                    var newFileName = sgFile.SysFileName;
                    var newFilePath = System.IO.Path.Combine(downloadPath, newFileName);

                    try
                    {
                        using (var outfile = System.IO.File.Create(newFilePath))
                        {
                           var result = _sshDownloadClient.Download(updatedItem.FilePath, updatedItem.SysFileName, outfile);

                            if (result)
                            {
                                updatedItem.DownloadFilePath = newFilePath;
                                downloadedFileList.Add(updatedItem);
                            }
                        }
                    }
                    catch(Exception ex)
                    {
                        OnException?.Invoke(ex);
                        OnInformation?.Invoke($"FileID : {updatedItem?.FileID ?? ""}   SysFileName: {updatedItem?.SysFileName ?? ""}");
                        OnInformation?.Invoke( $"FilePath: {updatedItem?.FilePath ?? ""} SysFileName:{updatedItem?.SysFileName ?? ""} : newFilePath: {newFilePath ?? ""}");
                    }

                }
                catch (Exception ex)
                {
                    OnException?.Invoke(ex);
                }


            }
            return downloadedFileList;
        }

        //현재 사용중 
        public void ConvertHwpToImage(AutoConService hanc, List<SGFileInfo> converList, string saveFolderPath)
        {
            foreach (var sgFile in converList)
            {
                if (string.IsNullOrEmpty(sgFile.FilePath) || string.IsNullOrEmpty(sgFile.SysFileName) || string.IsNullOrEmpty(sgFile.DownloadFilePath))
                {
                    OnInformation?.Invoke($"FildID: {sgFile.FileID}, FildPath: { sgFile.SysFileName}, FildName: {sgFile.UserFileName}");
                    continue;
                }

                var lastDateFolderPath = Path.GetFileName(sgFile.FilePath);
                var downloadPath = System.IO.Path.Combine(saveFolderPath, lastDateFolderPath);

                if (Directory.Exists(downloadPath) == false)
                {
                    Directory.CreateDirectory(downloadPath);
                }

                var newFileName = System.IO.Path.GetFileNameWithoutExtension(sgFile.UserFileName);
                newFileName = Guid.NewGuid().ToString();
                var newFilePath = System.IO.Path.Combine(downloadPath, newFileName + ".jpg");
                
                if (sgFile.FileExt == "jpg")
                {
                    try
                    {
                        //그냥 Move한다. 
                        System.IO.File.Move(sgFile.DownloadFilePath, newFilePath);
                        //sgFile.ImageList = new string[1] { newFilePath };

                        string relativeImagePath = newFilePath.Replace(saveFolderPath, "");
                        sgFile.ImageList = new string[1] { relativeImagePath };
                    }
                    catch (Exception ex)
                    {
                        OnException?.Invoke(ex);
                    }
                }
                else
                {
                    var convertedInfo = hanc.ConvertTo(sgFile.DownloadFilePath, newFilePath, "JPG");
                    if (convertedInfo.DstFilePathList != null)
                    {
                        var imgList = convertedInfo.DstFilePathList.ToArray();
                        if (imgList != null && imgList.Length > 0)
                        {
                            sgFile.ImageList = new string[imgList.Length];
                            for (int i = 0; i < imgList.Length; i++)
                            {
                                var webpFolderPath = System.IO.Path.Combine(downloadPath + "_webp");
                                if (Directory.Exists(webpFolderPath)==false)
                                {
                                    Directory.CreateDirectory(webpFolderPath);
                                }
                                var webpFileName =  System.IO.Path.Combine(webpFolderPath, System.IO.Path.GetFileNameWithoutExtension(imgList[i]) + ".webp");
                                
                                //Webp로 변경
                                ConvertImageHelper.ConvertJpgToWebp(imgList[i], webpFileName);
                                string relativeImagePath = "";
                                if (System.IO.File.Exists(webpFileName))
                                {
                                    relativeImagePath = webpFileName.Replace(saveFolderPath, "");
                                }
                                else
                                {
                                    relativeImagePath = imgList[i].Replace(saveFolderPath, "");
                                }
                                sgFile.ImageList[i] = relativeImagePath;
                            }
                        }
                    }

                    if (convertedInfo.PageTextList != null)
                    {
                        sgFile.TTSTextList = convertedInfo.PageTextList.ToArray();
                    }

                    try
                    {
                        _sgsDbContext.SGFileInfos.Update(sgFile);
                    }
                    catch (Exception ex)
                    {
                        OnException?.Invoke(ex  );
                    }
                }

            }
            try
            {
                _sgsDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
            }

        }

        //public bool DownloadSSHFile(SSHDownloadClientConfig config, string fileFolderPath, string fileName)
        //{
        //    _sshDownloadClient = new SSHDownloadClient(config);
        //    try
        //    {
        //        //dateFolderPath
        //        var lastDateFolderPath = Path.GetFileName(fileFolderPath);

        //        //다운로드 폴더 만들기 
        //        var downloadPath = System.IO.Path.Combine(config.GosiFileDownloadPath, lastDateFolderPath);

        //        if (Directory.Exists(downloadPath) == false)
        //        {
        //            Directory.CreateDirectory(downloadPath);
        //        }
        //        var downloadFilePath = System.IO.Path.Combine(downloadPath, fileName);
        //        try
        //        {
        //            using (var outfile = System.IO.File.Create(downloadFilePath))
        //            {
        //                var result = _sshDownloadClient.Download(fileFolderPath, fileName, outfile);

        //                if (result)
        //                {
        //                    return true;
        //                }
        //                else
        //                {
        //                    return false; 
        //                }
        //            }

        //        }
        //        catch (Exception ex)
        //        {
        //            OnException?.Invoke(ex);
        //            return false;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        OnException?.Invoke(ex);
        //        return false;
        //    }
        //}

        //public bool ConvertHwpToImage(AutoConService hanc, SGFileInfo sgFile, string saveFolderPath)
        //{
        //    var downloadPath = System.IO.Path.Combine(saveFolderPath, Path.GetFileName(sgFile.FilePath));
        //    if (Directory.Exists(downloadPath) == false)
        //    {
        //        Directory.CreateDirectory(downloadPath);
        //    }

        //    var makeConvertFilePath = System.IO.Path.Combine(downloadPath, Guid.NewGuid().ToString() + ".jpg");
        //    if (sgFile.FileExt.ToLower() == "hwp" || sgFile.FileExt.ToLower() == "hwpx" || sgFile.FileExt.ToLower() == "pdf")
        //    {
        //        var convertedInfo = hanc.ConvertTo(sgFile.DownloadFilePath, makeConvertFilePath, "JPG");
                
        //        if (convertedInfo.DstFilePathList != null)
        //        {
        //            var imgList = convertedInfo.DstFilePathList.ToArray();
        //            if (imgList != null && imgList.Length > 0)
        //            {
        //                sgFile.ImageList = new string[imgList.Length];
        //                for (int i = 0; i < imgList.Length; i++)
        //                {
        //                    var webpFolderPath = System.IO.Path.Combine(downloadPath + "_webp");
        //                    if (Directory.Exists(webpFolderPath) == false)
        //                    {
        //                        Directory.CreateDirectory(webpFolderPath);
        //                    }
        //                    var webpFileName = System.IO.Path.Combine(webpFolderPath, System.IO.Path.GetFileNameWithoutExtension(imgList[i]) + ".webp");

        //                    //Webp로 변경
        //                    ConvertImageHelper.ConvertJpgToWebp(imgList[i], webpFileName);
        //                    string relativeImagePath = "";
        //                    if (System.IO.File.Exists(webpFileName))
        //                    {
        //                        relativeImagePath = webpFileName.Replace(saveFolderPath, "");
        //                    }
        //                    else
        //                    {
        //                        relativeImagePath = imgList[i].Replace(saveFolderPath, "");
        //                    }
        //                    sgFile.ImageList[i] = relativeImagePath;
        //                }
        //            }
        //        }

        //        if (convertedInfo.PageTextList != null)
        //        {
        //            sgFile.TTSTextList = convertedInfo.PageTextList.ToArray();
        //        }

        //        try
        //        {
        //            _sgsDbContext.SGFileInfos.Update(sgFile);
        //            return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            OnException?.Invoke(ex);
        //            return false;
        //        }
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}


        //public void UpdateGosiConfirmode()
        //{
        //    var currentGosiList = _sgsDbContext.GetCurrentGosi();
        //    var removeGosiList = _sgsDbContext.GetCurrentGosi();
        //    try
        //    {

        //        currentGosiList.ForEach(result =>
        //        {
        //            var gosiStat = _originDbContext.GOSI_STATs.FirstOrDefault(g => g.APV_DOC_VUL == $"1OFR{result.NotAncmtMgtNo}");

        //            if (gosiStat != null && gosiStat.SEND_INFO.Equals("완료"))
        //            {
        //                result.SearchFilter1 = gosiStat.SEND_INFO;

        //                OnInformation?.Invoke($"UpdateGosiConfirmode 고시상태값 : [완료] 고시공고 ID : {result?.NotAncmtMgtNo}  고시번호 : {result?.Gosibunho} 고시제목: {result?.Title}");
        //            }
        //            else
        //            {
        //                result.SearchFilter1 = gosiStat?.SEND_INFO;
        //                removeGosiList.Add(result);

        //                OnInformation?.Invoke($"UpdateGosiConfirmode 고시상태값 : [{gosiStat.SEND_INFO}] 고시공고 ID : {result?.NotAncmtMgtNo}  고시번호 : {result?.Gosibunho} 고시제목: {result?.Title}");
        //            }
        //        });

        //        //저장
        //        _sgsDbContext.SaveChanges();
   
        //    }
        //    catch (Exception ex)
        //    {
        //        OnException?.Invoke(ex);

        //    }
        //}

        //현재 사용중 
        public void DeleteGosiFileList(List<SGFileInfo> removeFileList, string rootImagePath)
        {
            try
            {
                //고시파일 삭제 
                foreach (var rmItem in removeFileList)
                {
                    if (rmItem.ImageList == null) 
                    { continue; }

                    foreach (var imgItem in rmItem.ImageList)
                    {
                        string fileName = Path.Combine(rootImagePath, imgItem);
                        if (System.IO.File.Exists(fileName))
                        {
                            try
                            {
                                System.IO.File.Delete(fileName);
                                OnInformation?.Invoke($"DeleteFileList FileID: ${rmItem.FileID}  filePath : ${fileName}");
                            }
                            catch (Exception ex)
                            {
                                OnException?.Invoke(ex);
                            }
                        }
                    }

                }

            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
            }
        }

        //6월 2주 사용예정
        //public List<SGGosigonggoInfo> RetryGosiFileConvet(SSHDownloadClientConfig config, AutoConService hanc, string saveFolderPath)
        //{
        //    var failGosiDic = GetFailDownloadListByCurrentGosi();
        //    var successGosiList = new List<SGGosigonggoInfo>();

        //    foreach (var gosi in failGosiDic)
        //    {
        //        var file = gosi.Value;
        //        if (file != null)
        //        {
        //            var downloadSucess = DownloadSSHFile(config, file.FilePath, file.SysFileName);
        //            if (downloadSucess)
        //            {
        //                var convertSecess =  ConvertHwpToImage(hanc, file, saveFolderPath);
        //                if (convertSecess)
        //                {
        //                    successGosiList.Add(gosi.Key);
        //                }
        //            }
        //        }
        //    }

        //    return successGosiList;
        //}
    }
}
