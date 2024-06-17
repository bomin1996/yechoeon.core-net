using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.Common.Helpler;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;

namespace UiryeongNotice
{
    public class UiryeongNoticesBackService : BackgroundService
    {
        private readonly ILogger<UiryeongNoticesBackService> _logger;
        private readonly IServiceProvider _service;
        private readonly IConfiguration _config;
        private readonly IMemoryCache _memoryCache;
        private readonly IHttpClientFactory _httpClientFactory;
        public UiryeongNoticesBackService(ILogger<UiryeongNoticesBackService> logger, IConfiguration configuration, 
            IServiceProvider serviceProvider, IMemoryCache memoryCache , IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _service = serviceProvider;
            _config = configuration;
            _memoryCache = memoryCache;
            _httpClientFactory = httpClientFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Uiryeong NewNoticesUpdateBackServices Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Uiryeong NewNoticesUpdateBackServices");
                    FetchNewNoticeData();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Uiryeong NoticesBackServices");
                }

                await Task.Delay(10 * 60 * 1000, stoppingToken); //10분
            }
        }

        private async void FetchNewNoticeData()
        {
            var key = "v6a0nkaKmsCiKmsCU3CzGAvS";
            var rowNum = 5000;
            var deptNm = "";

            var url = $"https://www.uiryeong.go.kr/index.uiryeong?contentsSid=1676&authKey={key}&deptNm={deptNm}&rowNum={rowNum}";
            


            using (var response = await _httpClientFactory.CreateClient().GetAsync(url))
            {
                if (HttpStatusCode.OK == response.StatusCode)
                {
                    var responseData = await response.Content.ReadFromJsonAsync<UiryeongNoticeApiResponseData>();

                    if (responseData == null) 
                    {
                        _logger.LogInformation("GetNewNotice : response is Null " );
                        return;
                    }

                    // Result OK 
                    if (responseData.result == "0000")
                    {
                        var noticeList = responseData.data.Select(it =>
                        {
                            var noticeInfo = new NewNoticeInfo();
                            noticeInfo.Title = it.dataTitle;
                            noticeInfo.WriteDate = it.registerDate;

                            noticeInfo.DeptName = it.deptNm;
                            noticeInfo.Content = it.dataContent;

                            noticeInfo.ImgList = new List<NoticeApiImageInfo>();

                            if (it.files != null)
                            {
                                foreach (var item in it.files)
                                {
                                    var imgInfo = new NoticeApiImageInfo();
                                    //imgInfo.Idx =  Convert.ToInt32(item.fileSid);
                                    imgInfo.Url = item.fileUrl;
                                    imgInfo.Title = item.fileName;
                                    noticeInfo.ImgList.Add(imgInfo);
                                }
                            }

                            return noticeInfo;
                        }).ToList();
                        
                        if (noticeList != null)
                        {
                            noticeList.ForEach(item => item.ImgList?.ForEach(f => f.Url = UrlHelper.ConvertedRelayUrl(f.Url)));
                        }

                        _memoryCache.Set("UiryeongNewnotice", noticeList);

                        //_memoryCache.Set("UiryeongNewnotice-[부림면]", noticeList);
                    }
                    else if (responseData.result == "0001")
                    {
                        _logger.LogInformation($"GetNewNotice url: {url} authKye error");
                    }
                    else if (responseData.result == "0002")
                    {
                        _logger.LogInformation($"GetNewNotice url: {url} api call error");
                    }
                    else
                    {
                        _logger.LogInformation($"GetNewNotice not support Result  url: {url}  result : {responseData.result}");
                    }

                }
                else
                {
                    _logger.LogInformation("GetNewNotice : response.StatusCode = " + response.StatusCode);
                }
            }

        }

    }

    public static class ServicesConfiguration
    {
        public static void AddUiryeongNoticeServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddHostedService<UiryeongNoticesBackService>();
        }

    }

    class UiryeongNoticeApiResponseData
    {
        public string result { get; set; }

        public string message { get; set; }

        public List<UiryeongNoticeData> data { get; set; }

    }

    class UiryeongNoticeData {
        public string dataSid { get; set; }
        public string dataContent { get; set; }
        public string dataTitle { get; set; }

        public UiryeongNoticeFileInfo[] files { get; set; }
        public string registerDate { get; set; }
        public string deptNm { get; set; }
    }

    class UiryeongNoticeFileInfo
    {
        public string fileName { get; set; }
        public string fileUrl { get; set; }
        public string fileSid { get; set; }
    }
}