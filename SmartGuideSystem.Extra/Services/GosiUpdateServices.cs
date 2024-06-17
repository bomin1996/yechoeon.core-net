using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.Extra.Extention;
using SmartGuideSystem.Kiosk.BackgroundWorkers;
using SSHDownloader;

namespace SmartGuideSystem.Extra.Services
{
    public class GosiUpdateServices
    {
        private readonly SGSDataContext _dbContext;
        private readonly SGSOragcleDataContext _oracleDBContext;
        private IConfiguration _configuration;
        private readonly ILogger<GosiUpdateBackgroundServices> _logger;

        private GosiOptions _gosiOptions;
        private SSHConfigOptions _sshConfigOptions;

        public GosiUpdateServices(IConfiguration configuration, SGSDataContext dataContext, SGSOragcleDataContext oracleDBContext, ILogger<GosiUpdateBackgroundServices> logger)
        {
            _configuration = configuration;
            _dbContext = dataContext;
            _oracleDBContext = oracleDBContext;
            _logger = logger;

            _gosiOptions = new GosiOptions();
            _configuration.GetSection(GosiOptions.Gosi).Bind(_gosiOptions);

            _sshConfigOptions = new SSHConfigOptions(); 
            _configuration.GetSection(SSHConfigOptions.SSHConfig).Bind(_sshConfigOptions);
        }

        // Oracle 에서 검색해서 
        // SGS DB에  업데이트 한 후 
        // SSH  다운로드 받는것을 반복한다. 

        public async Task Update()
        {
            try
            {
                _logger.LogInformation("=======================Updated by GosiUpdateServices");
                var currentGisiCount = _dbContext.GosigoggoInfos.Count();
                _logger.LogInformation($"currentGisiCount : {currentGisiCount}");

                //유효한 고시공고 데이터 가져오기 
                string now = DateTime.Now.ToString("yyyyMMdd");
                string thisyear = "20230101";
                var sourceGosiDBList = await _oracleDBContext.OFRTNANOTANCMTs
                   .Where(g => g.HOMEPAGE_PBS_YN == "Y" &&
                   g.PBS_ST_YMD.CompareTo(thisyear) > 0 &&
                   g.PBS_ST_YMD.CompareTo(now) <= 0 && g.PBS_END_YMD.CompareTo(now) >= 0)
                   .OrderByDescending(g => g.LAST_MOD_TS)
                   .ToListAsync();

                _logger.LogInformation("=======================sourceGosiDBList Count" + $"{sourceGosiDBList.Count()}");


                ///////
                /// 1. 고시공고 DB Update 
                ////
                var updatedGosiList = new List<SGGosigonggoInfo>();
                sourceGosiDBList.ForEach(orggosi => {
                    
                    var gosiStat = _oracleDBContext.GOSI_STATs.FirstOrDefault(g => g.APV_DOC_VUL == $"1OFR{orggosi.NOT_ANCMT_MGT_NO}");
                    var result = _dbContext.GosigoggoInfos.FirstOrDefault(d => d.NotAncmtMgtNo == orggosi.NOT_ANCMT_MGT_NO);
                    //SEND_INFO == "완료" 인것만 추가한다. 

                    //신규 
                    if (result == null)
                    {
                        if (gosiStat?.SEND_INFO == "완료")
                        {
                            var addedItem = orggosi.ConvertToSGGosi();
                            addedItem.SearchFilter1 = gosiStat.SEND_INFO;
                            _dbContext.GosigoggoInfos.Add(addedItem);
                            updatedGosiList.Add(addedItem);
                            _logger.LogInformation($"New UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {addedItem?.FileID}");
                        }
                    }
                    else if (gosiStat?.SEND_INFO != "완료")
                    {
                        //완료 안된 데이터는 가져올수 없으므로 
                        var updatedItem = orggosi.UpdateToSGGosi(result);
                        updatedItem.SearchFilter1 = gosiStat?.SEND_INFO;
                        _dbContext.GosigoggoInfos.Update(updatedItem);
                        updatedGosiList.Add(updatedItem);
                        _logger.LogInformation($"완료안된 고시공고  UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {updatedItem?.FileID}");
                    }
                    else if (result.UpdateDateTime == null
                    || result.UpdateDateTime.CompareTo(orggosi.LAST_MOD_TS?.ToString("yyyy-MM-dd HH:mm:ss")) < 0)
                    {
                        var updatedItem = orggosi.UpdateToSGGosi(result);
                        updatedItem.SearchFilter1 = gosiStat?.SEND_INFO;
                        _dbContext.GosigoggoInfos.Update(updatedItem);
                        updatedGosiList.Add(updatedItem);
                        _logger.LogInformation($"Update UpdateSGGosigonggo 고시공고 ID : {orggosi?.NOT_ANCMT_REG_NO}  FileID : {updatedItem?.FileID}");
                    }
                });
                await _dbContext.SaveChangesAsync();

                _logger.LogInformation("=======================updatedGosiList Count" + $"{updatedGosiList.Count()}");


                ///////
                /// 2. File DB Update 
                ////
                var comfirmedGosiList = await _dbContext.GosigoggoInfos
                    .Where(g => g.StartPeriod.CompareTo(now) <= 0 && g.EndPeriod.CompareTo(now) >= 0)
                    .Where(g => g.SearchFilter1 == "완료").ToListAsync();

                _logger.LogInformation("=======================comfirmedGosiList Count" + $"{comfirmedGosiList.Count()}");

                comfirmedGosiList.ForEach(gosi => {
                    
                    var orgFileDB = _oracleDBContext.CmmntFiles.Where(f => f.FILE_ID == gosi.FileID).ToList();
                    var orgFileDBList= orgFileDB.Where(f => (IsValidFileExtension(f.FILE_EXTN) == true)).ToList();


                    orgFileDBList.ForEach(orgFile => {
                        var sgsdbFileInfo = _dbContext.SGFileInfos.FirstOrDefault(d => d.FileID == orgFile.FILE_ID && d.FileSeq == orgFile.FILE_SEQ);
                        if (sgsdbFileInfo == null) // 신규파일
                        {
                            var newSgsFileInfo = orgFile.ConvertToSGFile();
                            newSgsFileInfo.NotAncmtMgtNo = gosi.NotAncmtMgtNo;
                            newSgsFileInfo.ProcessStatus = "Processing";
                            _dbContext.SGFileInfos.Add(newSgsFileInfo);
                            _logger.LogInformation($"UpdateSGFile New File : SysFileName = ${newSgsFileInfo?.UserFileName}");
                        }
                        else if (sgsdbFileInfo.RegDt == null || sgsdbFileInfo.RegDt.CompareTo(orgFile.REG_DT) < 0) // Update exist file info
                        {
                            var updatedSgsFileInfo = orgFile.UpdateSGFile(sgsdbFileInfo);
                            updatedSgsFileInfo.NotAncmtMgtNo = gosi.NotAncmtMgtNo;
                            updatedSgsFileInfo.ProcessStatus = "Processing";
                            _dbContext.SGFileInfos.Update(updatedSgsFileInfo);
                            _logger.LogInformation($"UpdateSGFile Update File : SysFileName = ${updatedSgsFileInfo?.UserFileName}");
                        }
                    });
                });

                await _dbContext.SaveChangesAsync();

                ///////
                /// 3. SSH 다운로드 
                ////
                ///

                var processingFileInfoList = await _dbContext.SGFileInfos.Where(f => f.ProcessStatus == "Processing").ToListAsync();
                foreach (var fileInfo in processingFileInfoList)
                {
                    var resultDownload = DownloadSSHFile(_sshConfigOptions.Host, _sshConfigOptions.Port, _sshConfigOptions.UserName, _sshConfigOptions.Password,
                        fileInfo.FilePath, _gosiOptions.hwpDownloadedPath, fileInfo.SysFileName);

                    if (resultDownload)
                    {
                        fileInfo.ProcessStatus = "Downloaded";
                    }
                    else
                    {
                        fileInfo.FailCount += 1;
                        fileInfo.ProcessStatus = "Fail";
                    }
                }

                await _dbContext.SaveChangesAsync();

                _logger.LogInformation($"=======================End Updated by GosiUpdateServices");

            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Task Update Exeption {ex.Message}");
                _logger.LogInformation($"Task Update Exeption {ex.StackTrace}");

            }
        }

        public bool DownloadSSHFile(string host, int port, string username, string password, string serverFileFolderPath,  string downloadLocalPath, string fileName)
        {
            var sshDownloadClient = new SSHDownloadClient(host, port, username, password);
            try
            {
                //dateFolderPath
                var lastDateFolderPath = Path.GetFileName(serverFileFolderPath);

                //다운로드 폴더 만들기 
                var downloadPath = System.IO.Path.Combine(downloadLocalPath, lastDateFolderPath);

                if (Directory.Exists(downloadPath) == false)
                {
                    Directory.CreateDirectory(downloadPath);
                }
                var downloadFilePath = System.IO.Path.Combine(downloadPath, fileName);
                using (var outfile = System.IO.File.Create(downloadFilePath))
                {
                    var result = sshDownloadClient.Download(serverFileFolderPath, fileName, outfile);
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"{ex.Message}");
                _logger.LogInformation($"{ex.StackTrace}");
                return false;
            }
        }

        private bool IsValidFileExtension(string ext)
        {
            if (!string.IsNullOrEmpty(ext)
                && (ext.ToLower() == "hwp"
                || ext.ToLower() == "hwpx"
                || ext.ToLower() == "pdf"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }



    public class GosiOptions
    {
        public const string Gosi = "Gosi";

        public string ImagePath { get; set; } = String.Empty;
        public string hwpDownloadedPath { get; set; } = String.Empty;

    }

    public class SSHConfigOptions
    {
        public const string SSHConfig = "SSHConfig";

        public string Host { get; set; } = String.Empty;
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public int Port { get; set; } 

    }

    public class InsaOptions
    {
        public const string Insa = "Insa";

        public string InsaPhotoServerPath { get; set; } = String.Empty;

    }
}
