using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.FileSystemGlobbing;
using Microsoft.Extensions.Options;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.JSON;
using SmartGuideSystem.DB.Model.YC;
using SmartGuideSystem.Kiosk.ActionFilters;
using SmartGuideSystem.Kiosk.Models;
using SmartGuideSystem.Kiosk.Services;
using SmartGuideSystem.Kiosk.Signalr;
using System.Configuration;
using System.Diagnostics;
using System.Net;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Web;

namespace SmartGuideSystem.Kiosk.Controllers
{
    [Route("api/kioskinfo")]
    [ApiController]
    public class KioskInfoController : ControllerBase
    {
        enum GosiTimeFormatStyle
        {
            yyyy_MM_dd,
            yyyyMMdd,
        }

        const string APIKeyName = "SignalKey";
        const string APIKeyValue = "KeySignal";

        private readonly ILogger<KioskInfoController> _logger;
        private readonly SGSDataContext _dbContext;
        private readonly IHubContext<DeviceNotificationHub> _deviceHub;
        //private readonly GosiFileOptions _snapshotOptions;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly WeatherAndAirService _weatherAndAirService;
        private IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;
        private readonly DeviceStatusService _deviceStatus;

        public KioskInfoController(ILogger<KioskInfoController> logger,
            IHubContext<DeviceNotificationHub> hubContext,
            SGSDataContext dataContext,
            //IOptionsSnapshot<GosiFileOptions> snapshotOptionsAccessor,
            WeatherAndAirService weatherAndAirService,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration,
            IMemoryCache memoryCache,
            DeviceStatusService deviceStatus
            )
        {
            _dbContext = dataContext;
            _deviceHub = hubContext;
            _logger = logger;
            //_snapshotOptions = snapshotOptionsAccessor.Value;
            _httpClientFactory = httpClientFactory;
            _weatherAndAirService = weatherAndAirService;
            _configuration = configuration;
            _memoryCache = memoryCache;
            _deviceStatus = deviceStatus;
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> Get(string deviceId)
        {
            // 장비아이디 가지고
            // 내 키오스크 타입 받아오고 (세로형..인지 조직도 )
            // 그안에 부서정보 데이터를 받아야 해 (내가 무슨과 인지?)
            // 자리배치정보 받아야 하고 (실제 자리배치 위치정보)
            // 프로필정보 받아야 (자리배치안에 멤버정보)
            // 층별데이터 정보 받아와야하고
            // 공지사항리스트도 받아야 하고.

            var deviceInfo = await _dbContext.Devices
                .FirstOrDefaultAsync(it => it.DeviceId == deviceId);

            if (deviceInfo == null) // 장비 미등록 상태??
            {
                return new JsonResult(new { error = "404" });
            } 

            if (deviceInfo.ExtraSettings == null)
            {
                deviceInfo.ExtraSettings = new DeviceExtraSettings();
            }

            deviceInfo.ExtraSettings.autoUpdateMS = 1000 * 60 * 15; //15mins
            var kioskType = Enum.Parse<KioskType>(deviceInfo.KioskType);

            //var deptName = deviceInfo.DeptName;

            SGBuildingInfo[]? buildingInfos = null;
            List<SGGosigonggoInfo>? gosigonggoInfos = null;
            SGOrganizationChartJson? organizationChartJson = null;
            SGSeatPosChartJson? seatPosChartJson = null;
            List<NewNoticeInfo>? newNoticeInfos = null; // 지역의존적
            BannerImageInfo? bannerImageInfo = null; // 지역의존적
            //ConferenceScheduleInfo? conferenceScheduleInfo = null;
            List<SGMeetingInfo>? meetingInfos = null;
            //WeatherAirInfo? weatherAirInfo = null;
            JsonObject? councilConfigJson = null;

            SGContentLayoutJson? contentLayout= null;
            SGContentLayoutJson? subContentLayout= null;
            SGLocalMap? localMap = null;
            object noticeInfo = null;
            YCWatcher[]? watchers = null; // 지역의존적
            YCSchedule[]? schedules = null; // 지역의존적

            switch (kioskType)
            {
                case KioskType.OrganizationChart:
                    organizationChartJson = await GetOrganizationChart(deviceInfo);
                    seatPosChartJson = await GetSeatPosChart(deviceInfo);
                    buildingInfos = await GetBuildingGuideInfo(deviceInfo);
                    //newNoticeInfos = await GetNewNoticeInfo(deviceInfo);
                                        
                    //noticeInfo = _memoryCache.Get("UiryeongNewnotice");
                    if (_memoryCache.Get("UiryeongNewnotice") is List<NewNoticeInfo> cachedNoticeInfo)
                    {
                        if (string.IsNullOrEmpty(deviceInfo.ExtraSettings.NoticeFilter))
                        {
                            noticeInfo = cachedNoticeInfo.Take(100);
                        }
                        else
                        {
                            noticeInfo = cachedNoticeInfo.Where(t => t.DeptName == deviceInfo.ExtraSettings.NoticeFilter).ToList();
                        }

                    }
                    gosigonggoInfos = await GetGosiGongfoInfo(deviceInfo, GosiTimeFormatStyle.yyyyMMdd);

                    break; 
                case KioskType.Gosigonggo:
                    gosigonggoInfos = await GetGosiGongfoInfo(deviceInfo, GosiTimeFormatStyle.yyyyMMdd);
                    break;
                case KioskType.FloorInformation:
                    buildingInfos = await GetBuildingGuideInfo(deviceInfo);
                    bannerImageInfo = await GetBannerImageInfo(deviceInfo);
                    newNoticeInfos = await GetNewNoticeInfo(deviceInfo);
                    meetingInfos = await GetMeetingInfo(deviceInfo);
                    break;
                case KioskType.CityCouncil:
                    councilConfigJson = await GetCouncilConfigInfo(deviceInfo);
                    meetingInfos = await GetMeetingInfo(deviceInfo);
                    break;
                case KioskType.MeetingRoomInformation:
                    meetingInfos = await GetMeetingInfo(deviceInfo);
                    break;
                case KioskType.GangseoGosiNotice:
                    //newNoticeInfos = await GetNewNoticeInfo(deviceInfo);
                    //newNoticeInfos = _memoryCache.Get("GangseoNewnotice");
                    noticeInfo = _memoryCache.Get("GangseoNewnotice");
                    gosigonggoInfos = await GetGosiGongfoInfo(deviceInfo, GosiTimeFormatStyle.yyyy_MM_dd);
                    contentLayout = await GetContentLayoutJson(deviceInfo); // _dbContext.ContentLayouts.FirstOrDefault()?.ToContentLayoutJson();
                    subContentLayout = await GetSubContentLayoutJson(deviceInfo);
                    localMap = await GetLocalMap(deviceInfo); // await _dbContext.LocalMaps.FirstOrDefaultAsync();
                    break;
                case KioskType.Signage:
                    contentLayout = await GetContentLayoutJson(deviceInfo);
                    break;
                case KioskType.Yecheon:
                    watchers = await GetWatchers();
                    schedules = await GetSchedules();
                    deviceInfo.ExtraSettings.YcImageUrls = await GetYCUrls();
                    break;
                case KioskType.None:
                    break;
                default:
                    return new JsonResult(new { error = "404" });
            }

            var result = new Dictionary<string, object>()
            {
                ["deviceInfo"] = deviceInfo,
                ["buildingInfo"] = buildingInfos,
                ["gosigonggoInfo"] = gosigonggoInfos,
                ["organizationChart"] = organizationChartJson,
                ["noticeInfo"] = noticeInfo,
                ["bannerImageInfo"] = bannerImageInfo,
                ["meetingInfo"] = meetingInfos,
                ["weatherAndAirInfo"] = _weatherAndAirService.CurrentWeatherAir,
                ["seatPosChart"] = seatPosChartJson,
                ["councilConfig"] = councilConfigJson,
                //
                ["promotion"] = contentLayout, // 강서홍보영상
                ["contents"] = new SGContentLayoutJson[]{ contentLayout, subContentLayout }, // multiple
                ["localmap"] = localMap,
                ["watchers"] = watchers,
                ["schedules"] = schedules,
  
        };

            return new JsonResult(result);
        }

        private async Task<SGLocalMap?> GetLocalMap(SGDevice deviceInfo)
        {
            if (deviceInfo.ExtraSettings?.LocalMapOption is not null)
            {
                var localMap = await _dbContext.LocalMaps
                    .FirstOrDefaultAsync(map => map.Id == deviceInfo.ExtraSettings.LocalMapOption.id);
                return localMap;
            }
            return null;
        }

        private async Task<SGContentLayoutJson?> GetContentLayoutJson(SGDevice deviceInfo)
        {
            if (deviceInfo.ExtraSettings?.ContentLayoutOption is not null)
            {
                var contentLayout = await _dbContext.ContentLayouts
                    .FirstOrDefaultAsync(map => map.Id == deviceInfo.ExtraSettings.ContentLayoutOption.id);
                return contentLayout?.ToContentLayoutJson() ?? null;
            }
            return null;
        }

        private async Task<SGContentLayoutJson?> GetSubContentLayoutJson(SGDevice deviceInfo)
        {
            if (deviceInfo.ExtraSettings?.ContentLayoutOption is not null && deviceInfo.ExtraSettings?.ContentLayoutOption.subId is not null)
            {
                var contentLayout = await _dbContext.ContentLayouts
                    .FirstOrDefaultAsync(map => map.Id == deviceInfo.ExtraSettings.ContentLayoutOption.subId);
                return contentLayout?.ToContentLayoutJson() ?? null;
            }
            return null;
        }


        private async Task<SGOrganizationChartJson?> GetOrganizationChart(SGDevice device)
        {
            if (device.OrgChartId.HasValue)
            {
                var chart = await _dbContext.OrganizationCharts.FirstOrDefaultAsync(it => it.Id == device.OrgChartId);
                return chart?.ToChartJson();
            } 
            else
            {
                return null;
            }
        }
        private async Task<SGSeatPosChartJson?> GetSeatPosChart(SGDevice device)
        {
            var seatPosChartId = device.ExtraSettings?.SeatPosChartOption?.SeatPosChartId;
            if (seatPosChartId.HasValue)
            {
                var chart = await _dbContext.SeatPosCharts.FirstOrDefaultAsync(it => it.Id == seatPosChartId.Value);
                return chart?.ToChartJson();
            }
            else
            {
                return null;
            }
        }

        private async Task<SGBuildingInfo[]?> GetBuildingGuideInfo(SGDevice device)
        {
            var floorMapType = device.ExtraSettings?.floorMapType ?? 0;
            var buildingInfos = await _dbContext.BuildingInfo
                .Include(b => b.Floors.Where(o => o.FloorMapType == floorMapType).OrderBy(o => o.Order))
                .ToArrayAsync();
            return buildingInfos;
        }



        private async Task<List<SGGosigonggoInfo>?> GetGosiGongfoInfo(SGDevice device, GosiTimeFormatStyle timeFormatStyle)
        {
            var gosiFilter = device.ExtraSettings?.GosiFilter;
            var resultGosiInfoList = new List<SGGosigonggoInfo>();
            //string now = DateTime.Now.ToString("yyyyMMdd"); //진주/의령은 이렇게
            //string now = DateTime.Now.ToString("yyyy-MM-dd"); //강서 // 새올시스템용
            string now;
            switch (timeFormatStyle)
            {
                case GosiTimeFormatStyle.yyyy_MM_dd: 
                    now = DateTime.Now.ToString("yyyy-MM-dd");
                    break;
                case GosiTimeFormatStyle.yyyyMMdd:
                default:
                    now = DateTime.Now.ToString("yyyyMMdd");
                    break;
            }
        

            var gosigonggoInfos = await _dbContext.GosigoggoInfos
                    .Include(f => f.FileInfos.Where(f => f.ImageList != null && f.ImageList.Length >= 1 && f.FileExt != "xls"))
                    //End Period 추가 
                    //.Where(g => g.StartPeriod.CompareTo(now) <= 0)
                    //.Where(g => g.EndPeriod.CompareTo(now) >= 0)
                    .Where(f => f.FileInfos.Count > 0)
                    //.Where(g => g.SearchFilter1 == "완료")
                    //.Where(g => g.DELETE_YN != "Y") -> 아래 필터에서 검색 
                    //.OrderBy(g => g.NotAncmtMgtNo.Substring(1, 4))
                    .OrderBy(g => g.NotAncmtMgtNo)
                    .OrderByDescending(g => g.PostDate)
                    //.OrderBy(g=>g.StartPeriod)
                    .ToListAsync();


            //var filterdGosiInfo = string.IsNullOrEmpty(gosiFilter) ? gosigonggoInfos : gosigonggoInfos.Where(g =>
            //g.GosiNumber != null && (g.GosiNumber.Contains(gosiFilter) || g.GosiNumber.Contains("강서구 공고"))).ToList();
            List<SGGosigonggoInfo> reArrangedGosigongo = new List<SGGosigonggoInfo>();

            if (!string.IsNullOrEmpty(gosiFilter))
            {
                //1. 필터가 들어있는 공고 먼저 배치한다.  
                //2. 나머지는 뒤로 소트한다. 

                var filterdGosiInfo = gosigonggoInfos.Where(g => g.GosiNumber != null && g.GosiNumber.Contains(gosiFilter)).ToList();
                var remainGosiList = gosigonggoInfos.Where(g => g.GosiNumber?.Contains(gosiFilter) == false).ToList();

                reArrangedGosigongo.AddRange(filterdGosiInfo);
                reArrangedGosigongo.AddRange(remainGosiList);


                reArrangedGosigongo.AddRange(gosigonggoInfos);
            }
            else
            {
                reArrangedGosigongo.AddRange(gosigonggoInfos);
            }



            //Where 가 안먹는다. 
            foreach (var gosi in reArrangedGosigongo)
            {
                if (gosi.DELETE_YN != null && gosi.DELETE_YN.ToUpper() == "Y")
                {
                    continue;
                }

                var dept = _dbContext.Departments.FirstOrDefault(d => d.DeptCode == gosi.DeptCode);
                if (dept != null)
                {
                    gosi.DeptName = dept.Name;
                }

                var item = gosi.FileInfos?.OrderBy(f => f.FileSeq).FirstOrDefault();
                if (item == null)
                {
                    continue;
                }
                else
                {
                    gosi.FileInfo = item;
                    resultGosiInfoList.Add(gosi);
                }
            }

            return resultGosiInfoList;
        }


        private async Task<List<NewNoticeInfo>?> GetNewNoticeInfo(SGDevice device)
        {
            var dbNotiList = await _dbContext.Notices.Take(100).ToArrayAsync();

            var convertedList = dbNotiList.Select(it =>
            {
                return new NewNoticeInfo
                {
                    Idx = it.Id,
                    Title = it.Title,
                    ImgList = it.ImageFiles?.Select(img => new NoticeApiImageInfo { Title = "", Alt = "", Idx = 0, Url = img }).ToList() ?? new List<NoticeApiImageInfo>(),
                    DeptName = it.DeptName,
                    WriteDate = it.PostDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    Content = it.Contents
                };

            }).ToList();

            return convertedList ?? new List<NewNoticeInfo>();
        }
        private async Task<BannerImageInfo?> GetBannerImageInfo(SGDevice device)
        {
            var bannerImageInfo = new BannerImageInfo();
            bannerImageInfo.MainBannerList = await _memoryCache.GetOrCreateAsync("MainBanner", entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromMinutes(60);
                return GetMainBannerInfo();
            });
            bannerImageInfo.SubBannerList = await _memoryCache.GetOrCreateAsync("SubBanner", entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromMinutes(60);
                return GetSubBannerInfo();
            });
            bannerImageInfo.MainBannerIntervalSec = 3;
            bannerImageInfo.SubBannerIntervalSec = 5;

            return bannerImageInfo;
        }
        private async Task<List<SGMeetingInfo>?> GetMeetingInfo(SGDevice device)
        {
            var kioskType = Enum.Parse<KioskType>(device.KioskType);

            if (kioskType == KioskType.CityCouncil)
            {
                // 현재날짜기준 이전과 다음주 포함 총 3주간 일정을 보여준다.
                var now = DateTime.Now;
                int weekIndex = (int)now.DayOfWeek;
                var s = now.AddDays(-(7 + weekIndex));
                var e = s.AddDays(21);
                var start = new DateTime(s.Year, s.Month, s.Day, 0, 0, 0);
                var end = new DateTime(e.Year, e.Month, e.Day, 0, 0, 0);

                //.Where(m => m.StartTime >= start && m.EndTime <= end)

                var meetingInfos = await _dbContext.MeetingInfos
                            .Where(m => m.DeptName == "진주시의회" && m.StartTime >= start && m.EndTime <= end && m.Approval == "02")
                            .OrderBy(m => m.StartTime)
                            .ToListAsync();

                return meetingInfos;
            }
            else if (kioskType == KioskType.MeetingRoomInformation)
            {
                var meetingRoomName = device.ExtraSettings?.MeetingRoomInfoOption?.MeetingRoomName;

                if (string.IsNullOrWhiteSpace(meetingRoomName))
                {
                    return null;
                }

                var now = DateTime.Now;
                var start = new DateTime(now.Year, now.Month, now.Day);
                var end = start.AddDays(1);

                var meetingInfos = await _dbContext.MeetingInfos
                    .Where(m => m.StartTime >= start && m.EndTime <= end && m.MeetingRoom == meetingRoomName && m.Approval == "02")
                    .OrderBy(m => m.StartTime)
                    .ToListAsync();

                return meetingInfos;
            }
            else
            {
                var now = DateTime.Now;
                var start = new DateTime(now.Year, now.Month, now.Day);
                var end = start.AddDays(1);

                var meetingInfos = await _dbContext.MeetingInfos
                    .Where(m => m.StartTime >= start && m.EndTime <= end && m.DeptName != "진주시의회" && m.DeptName != "의회사무국" && m.Approval == "02")
                    .OrderBy(m => m.StartTime)
                    .ToListAsync();

                return meetingInfos;
            }
           
        }
        private async Task<JsonObject?> GetCouncilConfigInfo(SGDevice device)
        {
            //JsonObject? sGCouncilConfigJson = null;
            var config = await _dbContext.AdminConfigs.FirstOrDefaultAsync(r => r.Name == "Council");
            if (config == null || config.Config == null)
            {
                return null;
            }

            var members = await _dbContext.Users
                   .Where(user => user.DeptName == "의회사무국" && user.PositionName == "의원")
                   .OrderBy(user => user.Name)
                   .ToArrayAsync();

            config.Config.Add("members", JsonSerializer.SerializeToNode(members));

            return config.Config;
        }

        [HttpGet("organization-chart/{id}")]
        public async Task<SGOrganizationChartJson?> GetOrganizationChart(int id)
        {
            var orgChart = await _dbContext.OrganizationCharts.FirstOrDefaultAsync(o => o.Id == id);
            var json = orgChart?.ToChartJson();
            return json;
        }

        [HttpGet("search/users/")]
        public async Task<UserSearchResult> SearchUser(string searchText, int? pageIndex = 0, int? pageCount = 50)
        {
            var searchTextTrim = searchText.Trim();
            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
            {
                return new UserSearchResult { };
            }

            var query = _dbContext.Users
                .Where(u => u.Name!.Contains(searchTextTrim) || (u.SearchFilter1 ?? "").Contains(searchTextTrim));

            var resultCount = await query.CountAsync();

            if (resultCount == 0)
            {
                return new UserSearchResult { };
            }

            var users = await query.Skip(pageIndex.Value * pageCount.Value)
                .Take(pageCount.Value).ToArrayAsync();

            return new UserSearchResult { ResultCount = resultCount, PageIndex = pageIndex.Value, PageCount = pageCount.Value, Result = users };
        }

        [HttpGet("search/organization-chart/{searchText}")]
        public async Task<IEnumerable<SGOrganizationChartJson>> GetSearchOrgChart(string searchText)
        {
            var searchTextTrim = searchText.Trim();
            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
            {
                return new SGOrganizationChartJson[0];
            }
            var orgcharts = await _dbContext.OrganizationCharts.Where(u => u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)).ToArrayAsync();
            var orgChartJsons = orgcharts.Select(o => o.ToChartJson()).ToArray();

            return orgChartJsons;
        }

        [HttpGet("search/seatpos-chart/{searchText}")]
        public async Task<IEnumerable<SGSeatPosChartJson>> GetSearchSeatPosChart(string searchText)
        {
            var searchTextTrim = searchText.Trim();
            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
            {
                return new SGSeatPosChartJson[0];
            }
            var seatPoscharts = await _dbContext.SeatPosCharts.Where(u => u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)).ToArrayAsync();
            var seatPosChartJsons = seatPoscharts.Select(o => o.ToChartJson()).ToArray();

            return seatPosChartJsons;
        }

        [HttpGet("seatpos-chart/{id}")]
        public async Task<SGSeatPosChartJson?> GetSeatPosChart(int id)
        {
            var chart = await _dbContext.SeatPosCharts.FirstOrDefaultAsync(o => o.Id == id);
            var json = chart?.ToChartJson();
            return json;
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpPost("NotifyDevice")]
        public async Task<ActionResult> PostNotifyDevice([FromForm] string notification, [FromForm] string content)
        {
            _logger.LogInformation("NotifyDevice:" + notification, content);
            await _deviceHub.Clients.All.SendAsync("ReceiveNotification", notification, content);
            return Ok();
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpPost("update-device/{deviceId}")]
        public async Task<ActionResult> PostUpdateDevice(string deviceId, [FromForm] string content)
        {
            _logger.LogInformation("UpdateDevice DeviceId:{deviceId}", deviceId);
            //await _deviceHub.Clients.All.SendAsync("ReceiveNotification", notification, content);
            await _deviceHub.Clients.User(deviceId).SendAsync("UpdateDevice", content);
            return Ok();
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpPost("update-group-device/{kioskTypeName}")]
        public async Task<ActionResult> PostUpdateGroupDevice(string kioskTypeName, [FromForm] string content)
        {
            if (Enum.TryParse<KioskType>(kioskTypeName, out var resultType))
            {
                _logger.LogInformation("UpdateGroupDevice KioskType:{kioskType}", resultType);
                await _deviceHub.Clients.Group(resultType.ToString()).SendAsync("UpdateDevice", content);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpPost("{deviceId}/refresh")]
        public async Task PostRefreshDevice(string deviceId)
        {
            await _deviceHub.Clients.User(deviceId).SendAsync("RefreshDevice", "content");
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpPost("refresh-group-device/{kioskTypeName}")]
        public async Task<ActionResult> PostRefreshGroupDevice(string kioskTypeName, [FromForm] string content)
        {
            if (Enum.TryParse<KioskType>(kioskTypeName, out var resultType))
            {
                _logger.LogInformation("UpdateGroupDevice KioskType:{kioskType}", resultType);
                await _deviceHub.Clients.Group(resultType.ToString()).SendAsync("RefreshDevice", content);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("weather-and-air")]
        public IActionResult GetWeatherAndAir()
        {
            return Ok(_weatherAndAirService.CurrentWeatherAir);
        }

        [HttpGet("Search/{searchText}")]
        public async Task<ActionResult> Search(string searchText)
        {
            var searchUsers = await _dbContext.Users.Where(u => u.Name!.Contains(searchText)).ToArrayAsync();
            var teamInfos = await _dbContext.Departments.Where(o => o.Name!.Contains(searchText)).ToArrayAsync();

            var result = new Dictionary<string, object>()
            {
                ["users"] = searchUsers,
                ["organizations"] = teamInfos,
            };

            return Ok(result);
        }

        [HttpGet("SearchUser/{searchText}")]
        public async Task<IEnumerable<SGUser>> GetSearchUser(string searchText)
        {
            var searchTextTrim = searchText.Trim();
            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
            {
                return new SGUser[0];
            }
            //랭크삭제
            //var users = await _dbContext.Users.Where(u => u.chartId.HasValue && u.UserRank.HasValue && (u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim))).ToArrayAsync();
            // 배치도에 소속되지 않은 직원은 검색하지 않는다.
            var users = await _dbContext.Users
                .Where(u => u.chartId.HasValue && (u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)))
                .ToArrayAsync();


            return users;
        }

        public async Task<List<MainBannerItemInfo>> GetMainBannerInfo()
        {
            var mainBannerList = new List<MainBannerItemInfo>();
            try
            {
                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/main/list.do"))
                {
                    Debug.WriteLine(response.StatusCode);

                    if (HttpStatusCode.OK == response.StatusCode)
                    {
                        var bannerList = await response.Content.ReadFromJsonAsync<List<MainBannerItemInfo>>();

                        if (bannerList != null)
                        {
                            foreach (var item in bannerList)
                            {
                                mainBannerList.Add(new MainBannerItemInfo { ImgAlt = item.ImgAlt, ImgLink = "", ImgUrl = ConvertedRelayUrl(item.ImgUrl) });
                            }
                            return mainBannerList;
                        }
                    }
                    else
                    {
                        _logger.LogInformation(" GetMainBannerInfo : response.StatusCode = " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex?.Message);
            }

            return mainBannerList;
        }

        public async Task<List<SubBannerItemInfo>> GetSubBannerInfo()
        {
            var bannerList = new List<SubBannerItemInfo>();
            try
            {
                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/sub/list.do"))
                {
                    Debug.WriteLine(response.StatusCode);

                    if (HttpStatusCode.OK == response.StatusCode)
                    {
                        var resultList = await response.Content.ReadFromJsonAsync<List<SubBannerItemInfo>>();

                        if (resultList != null)
                        {
                            foreach (var item in resultList)
                            {
                                item.mainImgUrl = ConvertedRelayUrl(item.mainImgUrl);

                                bannerList.Add(item);
                            }
                        }
                    }
                    else
                    {
                        _logger.LogInformation(" GetMainBannerInfo : response.StatusCode = " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex?.Message);
            }

            return bannerList;
        }

        public async Task<List<NewNoticeInfo>> GetNewNotice(int pageunit)
        {
            var noticeList = new List<NewNoticeInfo>();
            try
            {
                var apiUrl = $"https://www.jinju.go.kr/api/board/public/list.do?pageunit={pageunit}";
                using (var response = await _httpClientFactory.CreateClient().GetAsync(apiUrl))
                {
                    Debug.WriteLine(response.StatusCode);

                    if (HttpStatusCode.OK == response.StatusCode)
                    {
                        noticeList = await response.Content.ReadFromJsonAsync<List<NewNoticeInfo>>();

                        if (noticeList != null)
                        {
                            noticeList.ForEach(item => item.ImgList?.ForEach(f => f.Url = ConvertedRelayUrl(f.Url)));
                        }
                    }
                    else
                    {
                        _logger.LogInformation("GetNewNotice : response.StatusCode = " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex?.Message);
            }

            return noticeList;
        }

        public async Task<List<NewNoticeInfo>> GetNewNotice2(int pageunit)
        {
            //var noticeList = new List<NewNoticeInfo>();

            var dbNotiList = await _dbContext.Notices.Take(100).ToArrayAsync();

            var convertedList = dbNotiList.Select(it =>
            {
                return new NewNoticeInfo
                {
                    Idx = it.Id,
                    Title = it.Title,
                    ImgList = it.ImageFiles?.Select(img => new NoticeApiImageInfo { Title = "", Alt = "", Idx = 0, Url = img }).ToList() ?? new List<NoticeApiImageInfo>(),
                    DeptName = it.DeptName,
                    WriteDate = it.PostDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                    Content = it.Contents
                };
                
            }).ToList();
           
            return convertedList ?? new List<NewNoticeInfo>();
        }

        private string ConvertedRelayUrl(string url)
        {
            return $"api/relay?path={HttpUtility.UrlEncode(url)}";
        }

        private async Task MainBannerImages()
        {
            try
            {
                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/main/list.do"))
                {
                    Console.WriteLine(response.StatusCode);

                    if (HttpStatusCode.OK == response.StatusCode)
                    {
                        var body = await response.Content.ReadFromJsonAsync<MainBannerItemInfo>();
                        Console.WriteLine(body);
                    }
                    else
                    {
                        Console.WriteLine($" -- response.ReasonPhrase ==> {response.ReasonPhrase}");
                    }
                }

            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"ex.Message={ex.Message}");
                Console.WriteLine($"ex.InnerException.Message = {ex.InnerException.Message}");

                Console.WriteLine($"----------- 서버에 연결할수없습니다 ---------------------");
            }
            catch (Exception ex2)
            {
                Console.WriteLine($"Exception={ex2.Message}");
            }
        }

        private async Task<List<SGMeetingInfo>> GetCouncilMeetingInfos()
        {
            // 현재날짜기준 이전과 다음주 포함 총 3주간 일정을 보여준다.
            var now = DateTime.Now;
            int weekIndex = (int)now.DayOfWeek;
            var s = now.AddDays(-(7 + weekIndex));
            var e = s.AddDays(21);
            var start = new DateTime(s.Year, s.Month, s.Day, 0, 0, 0);
            var end = new DateTime(e.Year, e.Month, e.Day, 0, 0, 0);

            //.Where(m => m.StartTime >= start && m.EndTime <= end)

            var meetingInfos = await _dbContext.MeetingInfos
                        .Where(m => m.DeptName == "진주시의회" && m.StartTime >= start && m.EndTime <= end && m.Approval == "02")
                        .OrderBy(m => m.StartTime)
                        .ToListAsync();

            return meetingInfos;
        }

        [HttpGet("testdownload")]
        public FileResult GetTestDownload()
        {
            var imgPath = _configuration.GetSection("Image").GetValue<string>("SavePath");
            var buffer = System.IO.File.ReadAllBytes(System.IO.Path.Combine(imgPath, "temp", "a.apk"));
            return File(buffer, "application/octet-stream", "a.apk");
        }

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpGet("active-device-status")]
        public ActionResult GetActiveDeviceStatus()
        {
            List<DeviceStatus> statusList = new();
            foreach (var kvp in _deviceStatus.DeviceStatusDic)
            {
                statusList.Add(new DeviceStatus(deviceId:kvp.Key, updateTime:kvp.Value));
            }
            return Ok(statusList);
        }

        record DeviceStatus(string deviceId, DateTime updateTime);


        private async Task<YCWatcher[]?> GetWatchers()
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, now.Day);
            var end = start.AddDays(1);

            var watchers = await _dbContext.YCWatchers
                .Where(m => m.OffDutyDate >= start && m.OffDutyDate <= end )
                .ToArrayAsync();
            return watchers;
        }


        private async Task<YCSchedule[]?> GetSchedules()
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddDays(31);

            var schedules = await _dbContext.YCSchedules
                 .Where(m => m.ScheduleDate >= start && m.ScheduleDate <= end)
                .ToArrayAsync();
            return schedules;
        }

        private async Task<List<string>?> GetYCUrls()
        {
            var imgPath = _configuration.GetSection("Image").GetValue<string>("SavePath");
            var dirInfo = new DirectoryInfo(Path.Combine(imgPath, "bg"));
            var files = dirInfo.GetFiles();

            var imgUrls = new List<string>();
            foreach (var f in files)
            {
                imgUrls.Add($"serverimages/bg/{f.Name}");
            }

            return imgUrls;
        }



    }


}
