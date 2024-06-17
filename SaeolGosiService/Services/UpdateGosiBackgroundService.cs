using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using System.Xml;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using SaeolGosiService.Messages;
using SmartGuideSystem.DB;
using Microsoft.Extensions.DependencyInjection;
using System.Buffers;
using SaeolGosiService.Results;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB.Model;
using SSHDownloader;

namespace SaeolGosiService.Services
{
    public class UpdateGosiBackgroundService : BackgroundService
    {
        private readonly ILogger<UpdateGosiBackgroundService> _logger;
        private readonly IServiceProvider _service;
        private readonly IConfiguration _config;
        private readonly IMemoryCache _memoryCache;
        //private readonly SGSDataContext _dataContext;

        //IFID = "SOWNN00213",
        //        SRCORGCD = "4640000",
        //        TGTORGCD = "4640000",

        private readonly string _IFID;
        private readonly string _SRCORGCD;
        private readonly string _TGTORGCD;
        private readonly string _SAEOL_ADDRESS;



        private readonly string _DownloadPath;

        public UpdateGosiBackgroundService(ILogger<UpdateGosiBackgroundService> logger, IConfiguration configuration, IServiceProvider serviceProvider, IMemoryCache memoryCache)
        {
            _logger = logger;
            _service = serviceProvider;
            _config = configuration;
            _memoryCache = memoryCache;
            //_dataContext = dataContext;

            var session = configuration.GetSection("SaeolGosiService");
            _IFID = session["IFID"];
            _SRCORGCD = session["SRCORGCD"];
            _TGTORGCD = session["TGTORGCD"];
            _SAEOL_ADDRESS = session["SAEOL_ADDRESS"];
            _DownloadPath = session["DownloadPath"];
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("UpdateGosiBackgroundService Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Seaeol gosi query start ===>");

                    await QueryNewGosiData();

                    await QueryFileInfo();

                    await DownloadFiles();

                    _logger.LogInformation("Seaeol gosi query End <===");

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "UpdateGosiBackgroundService");
                }
                await Task.Delay(60 *60 * 1000, stoppingToken);
            }
        }

        private async Task QueryNewGosiData()
        {
            var response = await QuerySaeolDataAsync<SOResult1201>(queryId: "3150000SOI201", queryParams: new List<(string key, object? value)>
            {
                (key:"NOT_ANCMT_SJ", value: null),
                (key:"NOT_ANCMT_CN", value: null),
                (key:"DEP_NM", value: null),
                (key:"LAST_MOD_TS", value: null),
                (key:"ST_NUM", value: 1),
                (key:"END_NUM", value: 1),
            });

            if (response.RESULTCODE != "200") return;

            using var scope = _service.CreateScope();

            using var dataContext = scope.ServiceProvider.GetService<SGSDataContext>();
            
            var list = response.Data.Message.Body.List;

            var nowTime = DateTime.Now.ToString("yyyy-MM-dd");
            var sgsGosiList = await dataContext.GosigoggoInfos
                .Where(go => go.StartPeriod.CompareTo(nowTime) <= 0 && go.EndPeriod.CompareTo(nowTime) >= 0)
                .ToListAsync();


            var activeGosiNumberSet = new HashSet<string>();
            foreach (var saeolDataRow in list)
            {
                try
                {
                    var gosiInfo = dataContext.GosigoggoInfos.FirstOrDefault(d => d.NotAncmtMgtNo == saeolDataRow.not_ancmt_mgt_no);
                    if (gosiInfo == null)
                    {
                        var newGosiInfo = CreateGosigonggoInfoFrom(saeolDataRow);
                        await dataContext.GosigoggoInfos.AddAsync(newGosiInfo);
                        activeGosiNumberSet.Add(newGosiInfo.NotAncmtMgtNo);
                    }
                    //else if (gosiInfo.UpdateDateTime is null || gosiInfo.UpdateDateTime.CompareTo(saeolDataRow.last_mod_ts) < 0)
                    else
                    {
                        UpdateGosigonggoInfoFrom(gosiInfo, saeolDataRow);
                        sgsGosiList.Remove(gosiInfo);
                        dataContext.GosigoggoInfos.Update(gosiInfo);
                        activeGosiNumberSet.Add(gosiInfo.NotAncmtMgtNo);
                    }
                }
                catch (Exception exc)
                {
                    _logger.LogError(exc, "QueryNewGosiData");
                    
                }

            }

            foreach (var gosiInfo in sgsGosiList)
            {
                if (!activeGosiNumberSet.Contains(gosiInfo.NotAncmtMgtNo))
                {
                    gosiInfo.DELETE_YN = "1";
                    dataContext.GosigoggoInfos.Update(gosiInfo);
                }
                
            }

            // save sgs gosi 
            //dataContext.UpdateRange(updatedGosiList);
            //dataContext.GosigoggoInfos.UpdateRange(updatedGosiList);
            await dataContext.SaveChangesAsync();






            // 유효한(추가되거나 업데이트된) sgsgosi정보를 가지고 파일 정보를 새올에서 쿼리 해 온다. 

            //파일 정보 1개 쿼리 해 올때마다 SGS File DB에  추가 혹은 업데이트 한다.
            // sgsGosi에 FileID를 기록한다.  
            //FileInfo ProcessStatus "Process" => "FileDownloded" OR "Fail" 

            // 
            // 한글 Converter에서 할일
            // sgsFile에서  ProcessStatus 가 "FileDownloaded" 의 파일만 찾아서 Convert 한후 성공하면 sgsGosi DB와 sgsFileDB의 ProcessStatus "Sucess"

        }

        private async Task QueryFileInfo()
        {
            using var scope = _service.CreateScope();
            using var dataContext = scope.ServiceProvider.GetService<SGSDataContext>();
            var nowTime = DateTime.Now.ToString("yyyy-MM-dd");
            var sgsUpdateGosiList = await dataContext.GosigoggoInfos
               .Where(go => go.StartPeriod.CompareTo(nowTime) <= 0 && go.EndPeriod.CompareTo(nowTime) >= 0)
               .Where(go => go.DELETE_YN != "1")
               .Where(go => go.ProcessStatus == "QueryFileInfo")
               .ToListAsync();

            foreach (var gosiInfo in sgsUpdateGosiList)
            {
                try
                {
                    var response = await QuerySaeolDataAsync<SOResult1204>(queryId: "3150000SOI204", queryParams: new List<(string key, object? value)>
                    {
                        (key:"NOT_ANCMT_MGT_NO", value: gosiInfo.NotAncmtMgtNo),
                    });

                    if (response == null || response.RESULTCODE != "200")
                    {
                        continue;
                    }

                    var resList = response.Data.Message.Body.List;

                    foreach (var fileInfoRow in resList)
                    {
                        var fileInfo = CreateFileInfoFrom(fileInfoRow, gosiInfo);
                        dataContext.SGFileInfos.Add(fileInfo);

                    }

                    if (resList.Length > 0)
                    {
                        gosiInfo.ProcessStatus = "Download";
                        dataContext.GosigoggoInfos.Update(gosiInfo);
                    }
                }
                catch (Exception exc)
                {
                    _logger.LogError(exc, "QueryNewGosiData");

                }
            }

            await dataContext.SaveChangesAsync();
        }

        private async Task DownloadFiles()
        {
            using var scope = _service.CreateScope();
            using var dataContext = scope.ServiceProvider.GetService<SGSDataContext>();
            var willDownloadFileInfoList = await dataContext.SGFileInfos
                .Where(f => f.ProcessStatus == "Processing" || f.ProcessStatus == "Fail")
                .Where(f => f.FailCount < 3)
                .ToListAsync();

            foreach (var fileInfo in willDownloadFileInfoList)
            {
                //var resultDownload = DownloadSSHFile(_SSH_Host, _SSH_Port, _SSH_UserName, _SSH_Password,
                //    fileInfo.FilePath, _SSH_DownloadPath, fileInfo.SysFileName);

                //if (resultDownload)
                //{
                //    fileInfo.ProcessStatus = "Downloaded";
                //}
                //else
                //{
                //    fileInfo.FailCount += 1;
                //    fileInfo.ProcessStatus = "Fail";
                //}

                try
                {
                    DownloadGosiFile(userFileName: fileInfo.UserFileName, sysFileName: fileInfo.SysFileName, filePath: fileInfo.FilePath);
                    fileInfo.ProcessStatus = "Downloaded";
                }
                catch (Exception ex)
                {
                    fileInfo.FailCount += 1;
                    fileInfo.ProcessStatus = "Fail";
                }
            }

            await dataContext.SaveChangesAsync();
        }


        private async Task<SOResponse<T>?> QuerySaeolDataAsync<T>(string queryId, List<(string key, object? value)> queryParams)
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(HttpMethod.Post, _SAEOL_ADDRESS);
            request.Headers.Add("Accept", "application/soap+xml, application/dime, multipart/related, text/*");
            request.Headers.Add("SOAPAction", _IFID);

            SORequest bodyRequest = new SORequest
            {
                IFID = _IFID,
                SRCORGCD = _SRCORGCD,
                TGTORGCD = _TGTORGCD,
                QueryId = queryId,
                Params = queryParams,
            };

            _logger.LogInformation(bodyRequest.ToXml());

            request.Content = new StringContent(bodyRequest.ToXml(), System.Text.Encoding.UTF8, "text/xml");
            using var response = await httpClient.SendAsync(request);
            if (response != null)
            {
                var stringResult = await response.Content.ReadAsStringAsync();
                var soResponse = SOResponse<T>.Parse(stringResult);

                return soResponse;
            }
            else
            {
                return null;
            }
        }

        private SGGosigonggoInfo CreateGosigonggoInfoFrom(SOResult1201 result)
        {
            var (startPeriod, endPeriod) = ParsePeriodTime(result.pbs_ymd);
            var newGosi = new SGGosigonggoInfo
            {
                NotAncmtMgtNo = result.not_ancmt_mgt_no.Trim(),
                Title = result.not_ancmt_sj,
                PostDate = ConvertTimeFormat(result.pbs_hop_ymd,"yyyy-MM-dd", "yyyyMMdd"),
                //DeptCode = result.CHA_DEP_CODE,
                DeptName = result.dep_nm,
                Subject = result.not_ancmt_sj,
                //Contents = result.NOT_ANCMT_CN,
                GosiType = result.not_ancmt_se_code,
                Tel = result.telno,
                
                StartPeriod = startPeriod.Trim(),
                //2023 - 06 - 16 ~2023 - 06 - 30
                EndPeriod = endPeriod.Trim(),



                //Mail = result.MAIL,
                //FileID = result.FILE_ID, ===> query
                FileID = Guid.NewGuid().ToString().ToUpper(),

                UpdateDateTime = result.last_mod_ts,
                GosiRegNo = result.not_ancmt_mgt_no,
                GosiNumber = result.not_ancmt_reg_no,
                DELETE_YN = "0",
                ProcessStatus = "QueryFileInfo",
        };

            return newGosi;
        }

        private void UpdateGosigonggoInfoFrom(SGGosigonggoInfo srcGosi, SOResult1201 result)
        {
            var (startPeriod, endPeriod) = ParsePeriodTime(result.pbs_ymd);
            //srcGosi.NotAncmtMgtNo = result.not_ancmt_mgt_no;
            srcGosi.Title = result.not_ancmt_sj;
            srcGosi.PostDate = ConvertTimeFormat(result.pbs_hop_ymd, "yyyy-MM-dd", "yyyyMMdd");
            srcGosi.DeptName = result.dep_nm;
            srcGosi.Subject = result.not_ancmt_sj;
            srcGosi.GosiType = result.not_ancmt_se_code;
            srcGosi.Tel = result.telno;
            srcGosi.StartPeriod = startPeriod.Trim();
            srcGosi.EndPeriod = endPeriod.Trim();
            srcGosi.UpdateDateTime = result.last_mod_ts;
            srcGosi.GosiRegNo = result.not_ancmt_mgt_no;
            srcGosi.GosiNumber = result.not_ancmt_reg_no;
            srcGosi.DELETE_YN = "0";
            
        }

        private SGFileInfo CreateFileInfoFrom(SOResult1204 result, SGGosigonggoInfo gosiInfo)
        {
            var newFile = new SGFileInfo
            {
                FileSeq = result.file_seq,
                //FileID = result.FILE_ID,
                FileID = gosiInfo.FileID,
                FilePath = result.file_path,
                FileExt = System.IO.Path.GetExtension(result.file_nm).Replace(".", ""),
                SysFileName = result.sys_file_nm,
                UserFileName = result.file_nm,
                //RegDt = ,
                FileSize = result.file_size,
                NotAncmtMgtNo = gosiInfo.NotAncmtMgtNo,
                //ProcessStatus = "Processing",
                ProcessStatus = "NotSupportFile",
                FailCount = 0,
            };

            switch (newFile.FileExt.ToUpper())
            {
                case "HWP":
                case "HWPX":
                case "PDF":
                    newFile.ProcessStatus = "Processing";
                    break;
            }

            return newFile;
        }

        private (string startPeriod, string endPeriod) ParsePeriodTime(string text)
        {
            try
            {
                var splits = text.Split("~", StringSplitOptions.RemoveEmptyEntries);

                return (startPeriod: splits[0], endPeriod: splits[1]);
            }
            catch (Exception ex)
            {
                return (startPeriod: "", endPeriod: "");

            }

        }

        private string ConvertTimeFormat(string timeString, string inputFormat, string outputFormat)
        {
            var time = DateTime.ParseExact(timeString, inputFormat, null);
            return time.ToString(outputFormat);
        }

        public bool DownloadSSHFile(string host, int port, string username, string password, string serverFileFolderPath, string downloadLocalPath, string fileName)
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

        public async Task DownloadGosiFile(string userFileName, string sysFileName, string filePath)
        {
            ////var url = @"https://eminwon.gangseo.seoul.kr/emwp/jsp/ofr/FileDown.jsp?user_file_nm=%EA%B3%B5%EC%8B%9C%EC%86%A1%EB%8B%AC%20%EA%B3%B5%EA%B3%A0%28%EA%B3%BC%EB%85%84%EB%8F%84%20%EC%8B%9C%EC%A0%95%EB%AA%85%EB%A0%B9%29.hwp&sys_file_nm=%EA%B3%B5%EC%8B%9C%EC%86%A1%EB%8B%AC%20%EA%B3%B5%EA%B3%A0%28%EA%B3%BC%EB%85%84%EB%8F%84%20%EC%8B%9C%EC%A0%95%EB%AA%85%EB%A0%B9%29_ofr_ofr_GdlZcXrHhYSzRwKq_20230724103013703_2.hwp&file_nm=%2Fntishome%2Ffile%2Fupload%2Fofr%2Fofr%2F20230724";
            //var baseUrl = "https://eminwon.gangseo.seoul.kr/emwp/jsp/ofr/FileDown.jsp?";
            //var p1 = HttpUtility.UrlEncode("공시송달 공고(과년도 시정명령).hwp");
            //var p2 = HttpUtility.UrlEncode("공시송달 공고(과년도 시정명령)_ofr_ofr_GdlZcXrHhYSzRwKq_20230724103013703_2.hwp");
            //var p3 = HttpUtility.UrlEncode("/ntishome/file/upload/ofr/ofr/20230724");
            //var reqUrl = $"{baseUrl}user_file_nm={p1}&sys_file_nm={p2}&file_path={p3}";
            //using HttpClient client = new HttpClient();
            //using var st = await client.GetStreamAsync(reqUrl);
            //using var fs = new FileStream(@"c:\temp\temp.hwp", FileMode.Create);
            //await st.CopyToAsync(fs);
            //var baseUrl = "http://eminwon.jinju.go.kr/emwp/jsp/ofr/FileDown.jsp?"; //진주주소
            //dateFolderPath
            var lastDateFolderPath = Path.GetFileName(filePath);
            //다운로드 폴더 만들기 
            var downloadPath = System.IO.Path.Combine(_DownloadPath, lastDateFolderPath);
            Directory.CreateDirectory(downloadPath);
            var downloadFilePath = System.IO.Path.Combine(downloadPath, sysFileName);

            using var client = new HttpClient();
            var baseUrl = "https://eminwon.gangseo.seoul.kr/emwp/jsp/ofr/FileDown.jsp?";
            var p1 = HttpUtility.UrlEncode(userFileName);
            var p2 = HttpUtility.UrlEncode(sysFileName);
            var p3 = HttpUtility.UrlEncode(filePath);
            var reqUrl = $"{baseUrl}user_file_nm={p1}&sys_file_nm={p2}&file_path={p3}";

            using var resultStream = await client.GetStreamAsync(reqUrl);
            using var fs = new FileStream(downloadFilePath, FileMode.Create);
            await resultStream.CopyToAsync(fs);

            
        }
    }
}
