using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.Common.Helpler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Xml.Linq;

namespace GangseoNewNotices
{
    public class GangseoNoticesBackServices : BackgroundService
    {
        private readonly ILogger<GangseoNoticesBackServices> _logger;
        private readonly IServiceProvider _service;
        private readonly IConfiguration _config;
        private readonly IMemoryCache _memoryCache;
        public GangseoNoticesBackServices(ILogger<GangseoNoticesBackServices> logger, IConfiguration configuration,  IServiceProvider serviceProvider, IMemoryCache memoryCache)
        {
            _logger = logger;
            _service = serviceProvider;
            _config = configuration;
            _memoryCache = memoryCache;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("NewNoticesUpdateBackServices Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("NewNoticesUpdateBackServices");
                    FetchNewNoticeData();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "GangseoNoticesBackServices");
                }
                await Task.Delay(60 * 1000, stoppingToken);
            }
        }


        private void FetchNewNoticeData()
        {
            var url = "https://www.gangseo.seoul.kr/gs040101.rss?1=1";
            using var reader = XmlReader.Create(url);
            var feed = SyndicationFeed.Load(reader);
            var post = feed?
                .Items
                .ToList();
            //post?.ForEach(it =>
            //{
                
            //});

            var noticeList = post?.Select(it =>
            {
                var noticeInfo = new NewNoticeInfo();
                noticeInfo.Title = it.Title.Text;
                noticeInfo.WriteDate = it.PublishDate.DateTime.ToString("yyyy-MM-ddTHH:mm:ssZ");
                foreach (var extension in it.ElementExtensions)
                {
                    var element = extension.GetObject<XElement>();
                    if (extension.OuterName == "id")
                    {
                        noticeInfo.Idx = int.Parse(element.Value);
                    }
                    else if (extension.OuterName == "department")
                    {
                        noticeInfo.DeptName = element.Value;
                    }
                    else if (extension.OuterName == "content")
                    {
                        noticeInfo.Content = element.Value;
                    }
                    else if (extension.OuterName == "file")
                    {
                        var contents = SyndicationContent.CreatePlaintextContent(element.Value);
                        var imgInfo = new NoticeApiImageInfo
                        {
                            Idx = noticeInfo.Idx,
                            Alt = "",
                            Title = noticeInfo.Title,
                            Url = UrlHelper.ConvertedRelayUrl(contents.Text),
                        };

                        if (noticeInfo.ImgList is null)
                        {
                            noticeInfo.ImgList = new List<NoticeApiImageInfo>();
                        }

                        noticeInfo.ImgList.Add(imgInfo);    
                    }

                }

                return noticeInfo;
            }).ToList();

            //var jsonText = System.Text.Json.JsonSerializer.Serialize(noticeList);

            _memoryCache.Set("GangseoNewnotice", noticeList);
        }

        //private string ConvertedRelayUrl(string url)
        //{
        //    return $"api/relay?path={HttpUtility.UrlEncode(url)}";
        //}
    }

    public static class ServicesConfiguration
    {
        public static void AddGangseoServices(this IServiceCollection services)
        {


            //services.AddDbContext<SGSOragcleDataContext>(
            //    context =>
            //    {
            //        context.UseOracle(builder.Configuration.GetConnectionString("OracleDb"), option =>
            //        {
            //            option.UseOracleSQLCompatibility("11");
            //        });
            //    }
            //);

            //services.AddTransient<IMyService, MyService>();
            services.AddHostedService<GangseoNoticesBackServices>();
        }

        //public static void AddAllServices(this IServiceCollection services, IConfiguration configuration)
        //{


        //    services.AddDbContext<SGSOragcleDataContext>(
        //        context =>
        //        {
        //            context.UseOracle(configuration.GetConnectionString("OracleDb"), option =>
        //            {
        //                option.UseOracleSQLCompatibility("11");
        //            });
        //        }
        //    );

        //    //services.AddTransient<IMyService, MyService>();
        //    services.AddHostedService<GangseoNoticesBackServices>();
        //}
    }



    //public class NewNoticeInfo
    //{
    //    public int Idx { get; set; }

    //    public string Title { get; set; }

    //    public List<JinjuApiImageInfo> ImgList { get; set; }

    //    public string DeptName { get; set; }

    //    public string WriteDate { get; set; }

    //    public string Content { get; set; }
    //}

    //public class JinjuApiImageInfo
    //{
    //    public int Idx { get; set; }

    //    public string? Title { get; set; }

    //    public string? Alt { get; set; }

    //    public string? Url { get; set; }
    //}


}
