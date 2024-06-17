//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.SignalR;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Caching.Memory;
//using Microsoft.Extensions.Options;
//using SmartGuideSystem.Common.Defines;
//using SmartGuideSystem.DB;
//using SmartGuideSystem.DB.Model;
//using SmartGuideSystem.DB.Model.JSON;
//using SmartGuideSystem.Kiosk.ActionFilters;
//using SmartGuideSystem.Kiosk.Models;
//using SmartGuideSystem.Kiosk.Services;
//using SmartGuideSystem.Kiosk.Signalr;
//using System.Diagnostics;
//using System.Net;
//using System.Text.Json;
//using System.Text.Json.Nodes;
//using System.Web;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace SmartGuideSystem.Kiosk.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class KioskInfoController : ControllerBase
//    {
//        const string APIKeyName = "SignalKey";
//        const string APIKeyValue = "KeySignal";

//        private readonly ILogger<KioskInfoController> _logger;
//        private readonly SGSDataContext _dbContext;
//        private readonly IHubContext<DeviceNotificationHub> _deviceHub;
//        private readonly GosiFileOptions _snapshotOptions;
//        private readonly IHttpClientFactory _httpClientFactory;
//        private readonly WeatherAndAirService _weatherAndAirService;
//        private IConfiguration _configuration;
//        private readonly IMemoryCache _memoryCache;

//        public KioskInfoController(ILogger<KioskInfoController> logger,
//            IHubContext<DeviceNotificationHub> hubContext,
//            SGSDataContext dataContext,
//            IOptionsSnapshot<GosiFileOptions> snapshotOptionsAccessor,
//            WeatherAndAirService weatherAndAirService,
//            IHttpClientFactory httpClientFactory,
//            IConfiguration configuration,
//            IMemoryCache memoryCache
//            )
//        {
//            _dbContext = dataContext;
//            _deviceHub = hubContext;
//            _logger = logger;
//            _snapshotOptions = snapshotOptionsAccessor.Value;
//            _httpClientFactory = httpClientFactory;
//            _weatherAndAirService = weatherAndAirService;
//            _configuration = configuration;
//            _memoryCache = memoryCache;
//        }

//        [HttpGet("{deviceId}")]
//        public async Task<ActionResult> Get(string deviceId)
//        {
//            // 장비아이디 가지고
//            // 내 키오스크 타입 받아오고 (세로형..인지 조직도 )
//            // 그안에 부서정보 데이터를 받아야 해 (내가 무슨과 인지?)
//            // 자리배치정보 받아야 하고 (실제 자리배치 위치정보)
//            // 프로필정보 받아야 (자리배치안에 멤버정보)
//            // 층별데이터 정보 받아와야하고
//            // 공지사항리스트도 받아야 하고.
//            //var allDevices = _dbContext.Devices.Include(d => d.OrganizationChart).ToArray().ToList();

//            var deviceInfo = await _dbContext.Devices.FirstOrDefaultAsync(it => it.DeviceId == deviceId);

//            if (deviceInfo == null)
//            {
//                return new JsonResult(new { error = "404" });
//            }

//            if (deviceInfo.ExtraSettings == null)
//            {
//                deviceInfo.ExtraSettings = new DeviceExtraSettings();
//            }

//            deviceInfo.ExtraSettings.autoUpdateMS = 1000 * 60 * 15; //15mins
//            //if (!deviceInfo.ExtraSettings.autoUpdateMS.HasValue) // 너무 짧게 잘못설정하면 위험할수있음!!!!!!
//            //{
//            //    deviceInfo.ExtraSettings.autoUpdateMS = 1000 * 60 * 15; //15mins
//            //}


//            SGOrganizationChart? organizationChart1 = null;
//            if (deviceInfo.KioskType == KioskType.OrganizationChart.ToString() && deviceInfo.OrgChartId.HasValue)
//            {
//                organizationChart1 = await _dbContext.OrganizationCharts.FirstOrDefaultAsync(it => it.Id == deviceInfo.OrgChartId);
//            }

//            SGSeatPosChart? seatPosChart1 = null;
//            var seatPosChartId = deviceInfo.ExtraSettings?.SeatPosChartOption?.SeatPosChartId;
//            if (deviceInfo.KioskType != KioskType.Gosigonggo.ToString() && seatPosChartId.HasValue)
//            {
//                seatPosChart1 = await _dbContext.SeatPosCharts.FirstOrDefaultAsync(it => it.Id == seatPosChartId.Value);
//            }

//            var floorMapType = deviceInfo.ExtraSettings?.floorMapType ?? 0;
//            //var buildingInfos = await _dbContext.BuildingInfo.Include(b => b.Floors.OrderBy(o => o.Order)).ToArrayAsync();
//            var buildingInfos = await _dbContext.BuildingInfo
//                .Include(b => b.Floors.Where(o => o.FloorMapType == floorMapType).OrderBy(o => o.Order))
//                .ToArrayAsync();

//            var newGosiList = new List<SGGosigonggoInfo>();
//            //!!!! Important!!!!!!! Fix Me Please
//            //if (deviceInfo.KioskType == KioskType.Gosigonggo.ToString())
//            {
//                string now = DateTime.Now.ToString("yyyyMMdd");
//                //변경해야한다. OrderBy NotAncmtMgtNo 는 없애도 되지 않을까? 
//                var gosigonggoInfos = await _dbContext.GosigoggoInfos
//                    .Include(f => f.FileInfos.Where(f => f.ImageList != null && f.ImageList.Length >= 1 && f.FileExt != "xls"))
//                    //End Period 추가 
//                    .Where(g => g.StartPeriod.CompareTo(now) <= 0)
//                    .Where(g => g.EndPeriod.CompareTo(now) >= 0)
//                    .Where(f => f.FileInfos.Count > 0)
//                    //.Where(g => g.SearchFilter1 == "완료")
//                    //.Where(g => g.DELETE_YN != "Y") -> 아래 필터에서 검색 
//                    //.OrderBy(g => g.NotAncmtMgtNo.Substring(1, 4))
//                    .OrderBy(g => g.NotAncmtMgtNo)
//                    .OrderByDescending(g => g.PostDate)
//                    //.OrderBy(g=>g.StartPeriod)
//                    .ToArrayAsync();

//                //var myFile = _dbContext.SGFileInfos
//                //    //.Where(f => f.FileSeq == 1)
//                //    .Where(f => f.ImageList != null).ToList();

//                //Where 가 안먹는다. 
//                foreach (var gosi in gosigonggoInfos)
//                {
//                    if (gosi.DELETE_YN != null && gosi.DELETE_YN.ToUpper() == "Y")
//                    {
//                        continue;
//                    }

//                    var dept = _dbContext.Departments.FirstOrDefault(d => d.DeptCode == gosi.DeptCode);
//                    if (dept != null)
//                    {
//                        gosi.DeptName = dept.Name;
//                    }

//                    var item = gosi.FileInfos.OrderBy(f => f.FileSeq).FirstOrDefault();
//                    if (item == null)
//                    {
//                        continue;
//                    }
//                    else
//                    {
//                        gosi.FileInfo = item;
//                        newGosiList.Add(gosi);
//                    }
//                }
//            }

//            List<NewNoticeInfo>? noticeInfo = null;
//            if (deviceInfo.KioskType != KioskType.Gosigonggo.ToString() && deviceInfo.KioskType != KioskType.CityCouncil.ToString())
//            {
//                //noticeInfo = await _memoryCache.GetOrCreateAsync("Notice", entry =>
//                //{
//                //    entry.SlidingExpiration = TimeSpan.FromMinutes(5);
//                //    return GetNewNotice(pageunit: 100);
//                //});

//                noticeInfo = await GetNewNotice2(pageunit: 100);
//            }

//            var bannerImageInfo = new BannerImageInfo();
//            var conferenceScheduleInfo = new ConferenceScheduleInfo();
//            List<SGMeetingInfo>? meetingInfos = null;
//            if (deviceInfo.KioskType == KioskType.FloorInformation.ToString())
//            {
//                //bannerImageInfo.MainBannerList = await GetMainBannerInfo();
//                bannerImageInfo.MainBannerList = await _memoryCache.GetOrCreateAsync("MainBanner", entry =>
//                {
//                    entry.SlidingExpiration = TimeSpan.FromMinutes(5);
//                    return GetMainBannerInfo();
//                });

//                //bannerImageInfo.SubBannerList = await GetSubBannerInfo();
//                bannerImageInfo.SubBannerList = await _memoryCache.GetOrCreateAsync("SubBanner", entry =>
//                {
//                    entry.SlidingExpiration = TimeSpan.FromMinutes(5);
//                    return GetSubBannerInfo();
//                });
//                bannerImageInfo.MainBannerIntervalSec = 3;
//                bannerImageInfo.SubBannerIntervalSec = 5;

//                conferenceScheduleInfo.ConferenceRooms = new List<ConferenceRoomInfo>();

//                //string xmlPathDir = _configuration["XmlPath"];

//                //var confList = ConferenceHelpers.GetConferenceRoomInfo(xmlPathDir);
//                //conferenceScheduleInfo.ConferenceRooms.AddRange(confList);

//                var now = DateTime.Now;
//                var start = new DateTime(now.Year, now.Month, now.Day);
//                var end = start.AddDays(1);

//                meetingInfos = await _dbContext.MeetingInfos
//                    .Where(m => m.StartTime >= start &&  m.EndTime <= end && m.DeptName != "진주시의회" && m.DeptName != "의회사무국" && m.Approval == "02")
//                    .OrderBy(m => m.StartTime)
//                    .ToListAsync();

//            }

//            JsonObject? sGCouncilConfigJson = null;
//            if (deviceInfo.KioskType == KioskType.CityCouncil.ToString())
//            {
//                var config = await _dbContext.AdminConfigs.FirstOrDefaultAsync(r => r.Name == "Council");
//                sGCouncilConfigJson = config?.Config;

//                if (sGCouncilConfigJson != null)
//                {
//                    var members = await _dbContext.Users
//                       .Where(user => user.DeptName == "의회사무국" && user.PositionName == "의원")
//                       .OrderBy(user => user.Name)
//                       .ToArrayAsync();

//                    sGCouncilConfigJson.Add("members", JsonSerializer.SerializeToNode(members));
//                }

//                // 현재날짜기준 이전과 다음주 포함 총 3주간 일정을 보여준다.
//                //var now = DateTime.Now;
//                //int weekIndex = (int)now.DayOfWeek;
//                //var s = now.AddDays((7 + weekIndex));
//                //var e = s.AddDays(21);
                
//                //meetingInfos = await _dbContext.MeetingInfos
//                //            .Where(m => m.DeptName == "진주시의회")
//                //            .ToListAsync();

//                meetingInfos = await GetCouncilMeetingInfos();
//            }

//            if (deviceInfo.KioskType == KioskType.MeetingRoomInformation.ToString() && !string.IsNullOrWhiteSpace(deviceInfo.ExtraSettings?.MeetingRoomInfoOption?.MeetingRoomName))
//            {
//                var meetingRoomName = deviceInfo.ExtraSettings?.MeetingRoomInfoOption?.MeetingRoomName;

//                var now = DateTime.Now;
//                var start = new DateTime(now.Year, now.Month, now.Day);
//                var end = start.AddDays(1);

//                meetingInfos = await _dbContext.MeetingInfos
//                    .Where(m => m.StartTime >= start && m.EndTime <= end && m.MeetingRoom == meetingRoomName && m.Approval == "02" )
//                    .OrderBy(m => m.StartTime)
//                    .ToListAsync();
//            }

//            var result = new Dictionary<string, object>()
//            {
//                ["deviceInfo"] = deviceInfo,
//                ["buildingInfo"] = buildingInfos,
//                ["gosigonggoInfo"] = newGosiList,
//                ["organizationChart"] = organizationChart1?.ToChartJson(),
//                ["noticeInfo"] = noticeInfo,
//                //["noticeInfo"] = _memoryCache.Get("GangseoNewnotice"),
//                ["bannerImageInfo"] = bannerImageInfo,
//                ["conferenceScheduleInfo"] = conferenceScheduleInfo,
//                ["meetingInfo"] = meetingInfos,
//                ["weatherAndAirInfo"] = _weatherAndAirService.CurrentWeatherAir,
//                ["seatPosChart"] = seatPosChart1?.ToChartJson(),
//                ["councilConfig"] = sGCouncilConfigJson,
//            };

//            return new JsonResult(result);
//        }

//        [HttpGet("organization-chart/{id}")]
//        public async Task<SGOrganizationChartJson?> GetOrganizationChart(int id)
//        {
//            var orgChart = await _dbContext.OrganizationCharts.FirstOrDefaultAsync(o => o.Id == id);
//            var json = orgChart?.ToChartJson();
//            return json;
//        }

//        [HttpGet("search/users/")]
//        public async Task<UserSearchResult> SearchUser(string searchText, int? pageIndex = 0, int? pageCount = 50)
//        {
//            var searchTextTrim = searchText.Trim();
//            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
//            {
//                return new UserSearchResult { };
//            }

//            var query = _dbContext.Users
//                .Where(u => u.Name!.Contains(searchTextTrim) || (u.SearchFilter1 ?? "").Contains(searchTextTrim));

//            var resultCount = await query.CountAsync();

//            if (resultCount == 0)
//            {
//                return new UserSearchResult { };
//            }

//            var users = await query.Skip(pageIndex.Value * pageCount.Value)
//                .Take(pageCount.Value).ToArrayAsync();

//            return new UserSearchResult { ResultCount = resultCount, PageIndex = pageIndex.Value, PageCount = pageCount.Value, Result = users };
//        }

//        [HttpGet("search/organization-chart/{searchText}")]
//        public async Task<IEnumerable<SGOrganizationChartJson>> GetSearchOrgChart(string searchText)
//        {
//            var searchTextTrim = searchText.Trim();
//            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
//            {
//                return new SGOrganizationChartJson[0];
//            }
//            var orgcharts = await _dbContext.OrganizationCharts.Where(u => u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)).ToArrayAsync();
//            var orgChartJsons = orgcharts.Select(o => o.ToChartJson()).ToArray();

//            return orgChartJsons;
//        }

//        [HttpGet("search/seatpos-chart/{searchText}")]
//        public async Task<IEnumerable<SGSeatPosChartJson>> GetSearchSeatPosChart(string searchText)
//        {
//            var searchTextTrim = searchText.Trim();
//            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
//            {
//                return new SGSeatPosChartJson[0];
//            }
//            var seatPoscharts = await _dbContext.SeatPosCharts.Where(u => u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)).ToArrayAsync();
//            var seatPosChartJsons = seatPoscharts.Select(o => o.ToChartJson()).ToArray();

//            return seatPosChartJsons;
//        }

//        [HttpGet("seatpos-chart/{id}")]
//        public async Task<SGSeatPosChartJson?> GetSeatPosChart(int id)
//        {
//            var chart = await _dbContext.SeatPosCharts.FirstOrDefaultAsync(o => o.Id == id);
//            var json = chart?.ToChartJson();
//            return json;
//        }

//        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
//        [HttpPost("NotifyDevice")]
//        public async Task<ActionResult> PostNotifyDevice([FromForm] string notification, [FromForm] string content)
//        {
//            _logger.LogInformation("NotifyDevice:" + notification, content);
//            await _deviceHub.Clients.All.SendAsync("ReceiveNotification", notification, content);
//            return Ok();
//        }

//        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
//        [HttpPost("update-device/{deviceId}")]
//        public async Task<ActionResult> PostUpdateDevice(string deviceId, [FromForm] string content)
//        {
//            _logger.LogInformation("UpdateDevice DeviceId:{deviceId}", deviceId);
//            //await _deviceHub.Clients.All.SendAsync("ReceiveNotification", notification, content);
//            await _deviceHub.Clients.User(deviceId).SendAsync("UpdateDevice", content);
//            return Ok();
//        }

//        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
//        [HttpPost("update-group-device/{kioskTypeName}")]
//        public async Task<ActionResult> PostUpdateGroupDevice(string kioskTypeName, [FromForm] string content)
//        {
//            if (Enum.TryParse<KioskType>(kioskTypeName, out var resultType))
//            {
//                _logger.LogInformation("UpdateGroupDevice KioskType:{kioskType}", resultType);
//                await _deviceHub.Clients.Group(resultType.ToString()).SendAsync("UpdateDevice", content);
//                return Ok();
//            }
//            else
//            {
//                return NotFound();
//            }
//        }

//        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
//        [HttpPost("{deviceId}/refresh")]
//        public async Task PostRefreshDevice(string deviceId)
//        {
//            await _deviceHub.Clients.User(deviceId).SendAsync("RefreshDevice", "content");
//        }

//        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
//        [HttpPost("refresh-group-device/{kioskTypeName}")]
//        public async Task<ActionResult> PostRefreshGroupDevice(string kioskTypeName, [FromForm] string content)
//        {
//            if (Enum.TryParse<KioskType>(kioskTypeName, out var resultType))
//            {
//                _logger.LogInformation("UpdateGroupDevice KioskType:{kioskType}", resultType);
//                await _deviceHub.Clients.Group(resultType.ToString()).SendAsync("RefreshDevice", content);
//                return Ok();
//            }
//            else
//            {
//                return NotFound();
//            }
//        }

//        [HttpGet("weather-and-air")]
//        public IActionResult GetWeatherAndAir()
//        {
//            return Ok(_weatherAndAirService.CurrentWeatherAir);
//        }





//        private List<SGNoticeInfo> MakeDumpNoticeInfo()
//        {
//            var NoticeInfos = new List<SGNoticeInfo>();

//            var attfiles = new List<string>();
//            attfiles.Add("2023년 진주시 학생 웹툰 작가단 모집 공고 및 신청서.hwp");

//            var imgfiles = new List<string>();
//            imgfiles.Add("https://www.jinju.go.kr/board/image.do?idx=39532791&fnum=1&s=&gcode=4118&q=");


//            var imgfiles2 = new List<string>();
//            imgfiles2.Add("https://www.jinju.go.kr/board/image.do?idx=39535081&fnum=1&s=&gcode=2144&q=");
//            imgfiles2.Add("https://www.jinju.go.kr/board/image.do?idx=39535081&fnum=2&s=&gcode=2144&q=");


//            var imgfiles3 = new List<string>();
//            imgfiles3.Add("https://www.jinju.go.kr/board/image.do?idx=39535078&fnum=1&s=&gcode=2144&q=");
//            imgfiles3.Add("https://www.jinju.go.kr/board/image.do?idx=39535078&fnum=2&s=&gcode=2144&q=");

//            var imgfiles4 = new List<string>();
//            imgfiles4.Add("https://www.jinju.go.kr/board/image.do?idx=39534984&fnum=1&s=&gcode=4118&q=");

//            var imgfiles5 = new List<string>();
//            imgfiles5.Add("https://www.jinju.go.kr/board/image.do?idx=39534480&fnum=1&s=&gcode=4118&q=");
//            imgfiles5.Add("https://www.jinju.go.kr/board/image.do?idx=39534480&fnum=2&s=&gcode=4118&q=");
//            imgfiles5.Add("https://www.jinju.go.kr/board/image.do?idx=39534480&fnum=3&s=&gcode=4118&q=");


//            var imgfiles6 = new List<string>();
//            imgfiles6.Add("https://www.jinju.go.kr/board/image.do?idx=39533921&fnum=2&s=&gcode=2144&q=");


//            var contents1 = "2023년 새롭게 지원되는 로타바이러스(국가예방접종) 예방접종 실시 안내입니다!!\r\n\r\n \r\n\r\n♡ 접종 시행 : 23. 3. 6.(월) 부터\r\n\r\n♡ 접종 대상 : 생후 2개월~6개월 영아\r\n\r\n♡ 지원 백신 : 로타릭스(2회), 로타텍(3회)\r\n\r\n♡ 접종방법 : 경구투여\r\n\r\n♡ 접종기관 : 보건소 및 위탁의료기관*\r\n\r\n    * 예방접종 도우미 누리집(https://nip.kdca.go.kr)에서 확인가능(23. 2. 27.)\r\n\r\n♡ 주의사항 : 생후 15주가 되기 전 첫번째 접종 완료\r\n\r\n                   생후 8개월이 되기 전 모든 접종 완료";
//            var contents2 = "전수교육관 활성화 공모사업 - 무형유산 나들이 \"벚꽃 풍류\" 공연 안내\r\n\r\n \r\n\r\n공연명 : 무형유산 나들이 \"벚꽃 풍류\"\r\n\r\n기   간 : 2023. 3. 18. (토) ~ 4. 9.(일) 14:00\r\n\r\n  - 기간 중 매주 토, 일 14:00\r\n\r\n장   소 : 진주시 전통예술회관 공연장\r\n\r\n내   용 : 국가 및 도지정 무형문화재 공연\r\n\r\n \r\n\r\n무료 공연이므로 시민들의 많은 관심 부탁드립니다.";
//            var contents3 = "<진주 논개가락지 만들기 및 황동자와 박쥐모양 펜던트 만들기> 가족무료체험 프로그램 참여자를 모집합니다.\r\n\r\n \r\n\r\n모집 기간은 2023년 03월 21일(화) 오전 9시부터 03월 24일(금) 오후 5시까지입니다.\r\n\r\n(진주 논개가락지 만들기 체험과 황동자와 박쥐모양 펜던트 만들기 체험 신청 링크는 각각 다르니 유의하셔서 신청해주시기 바랍니다.)\r\n\r\n \r\n\r\n※ 3.21(화) 09:00부터 선착순 모집합니다.\r\n\r\n(09:00 이전 접수는 무효처리 되오니, 시간 엄수 부탁드립니다.)\r\n\r\n \r\n\r\n체험비 및 재료비는 무료입니다.\r\n\r\n신청방법은 네이버 폼으로 신청해주시면 감사하겠습니다.\r\n\r\n많은 관심과 신청 바랍니다.\r\n\r\n \r\n\r\n*예약은 약속입니다. 신중한 예약 부탁드립니다.\r\n\r\n \r\n\r\n1. 네이버폼 신청 링크\r\n\r\n진주 논개가락지 만들기 가족무료체험\r\n\r\n-> https://naver.me/5LoYMaQI\r\n\r\n황동자와 박쥐모양 펜던트 만들기 가족무료체험\r\n\r\n-> https://naver.me/GnCbcOLN\r\n\r\n \r\n\r\n2. 신청 시 유의사항\r\n\r\n선착순으로 신청 확정 문자가 발송됩니다.\r\n해당 날짜 선착순 마감 후, 중복 신청하셨을 경우 유선으로 시간 조율 연락을 드리오니 양해 부탁드립니다.\r\n접수 후 취소 시 유선으로 연락 부탁드립니다.\r\n노쇼는 다음 체험 예약 불가입니다.\r\n \r\n\r\n☎ 문의\r\n\r\n진주시장도장전수교육관 055-747-3179 (09:00~18:00)\r\n\r\n진주시두석장전수교육관 010-2637-9379";
//            var contents4 = "1단계 먼저 손바닥과 손바닥을 마주대고 문질러 줍니다.\r\n2단계 손등과 손바닥을 마주대고 문질러 줍니다.\r\n3단계 손바닥을 마주잡고 손 깍지를 낀 상태로 문질러 줍니다.\r\n4단계 손가락을 마주잡고 문질러 줍니다.\r\n5단계 엄지손가락을 다른 편 손바닥으로 돌려주면서 문질러 줍니다.\r\n6단계 손바닥을 반대편 손바닥에 놓고 문지르며 손톱 밑까지 깨끗하게 해주면~ 완료!\r\n\r\n이렇게 6단계를 지켜야, 빠진 곳 없이 손 구석구석 모든 곳을 깨끗하게 씻을 수 있습니다.\r\n\r\n\r\n특히! 흐르는 물에, 비누로, 30초 이상! 잊지 마시고, 나와 우리 모두의 건강을 지키기로 약속해요!\r\n손을 비누로 비벼요 30초 이상, 손을 비비삼!";
//            var contents5 = "진주시 보건소 워크온(걷기 앱) 3월 챌린지\r\n\r\n걷기 챌린지 참여하고 쿠폰 받아가세요!\r\n\r\n○ 기      간 : 2023. 3. 11.(토) ~ 3. 19.(일)\r\n\r\n○ 걷기경로 : 초전동 농산물도매시장 강변 산책로 ↔ 한보하대아파트 강변 산책로, 약 3km\r\n\r\n○ 참여상품 : 걷기 달성률 80% 이상인 목표 달성자 모두에게 3,000원 상당 편의점 모바일 상품권 증정\r\n\r\n○ 참여방법 \r\n\r\n - 플레이스토어/앱스토어에서 '워크온' 다운로드\r\n\r\n - 워크온 회원가입\r\n\r\n - '진주시민 GYM해라' 커뮤니티 가입\r\n\r\n - 커뮤니티 내 '3월 챌린지' 참여하여 길 따라 걷기\r\n\r\n○ 문      의 : 보건소 건강증진과 건강증진팀 055-749-6257, 5761";
//            var contents6 = "경남창조경제혁신센터에서는 유망 기술창업 아이템을 보유한 도약기 창업기업의 비즈니스 모델 혁신 및 제품·서비스 고도화 지원을 위한‘2023년 창업도약패키지’에 참여할 도약기 창업기업을 모집하고 있습니다.\r\n\r\n가. 사업 개요\r\n\r\n〇 사 업 명 : 2023년도 창업도약패키지\r\n\r\n〇 모집기간 : 2023. 2. 23.(목) ~ 3. 20.(월) 16:00까지\r\n\r\n〇 지원대상 : 창업 후 3년 초과 7년 이내 도약기 창업기업(신청가능 업력 : 2016. 2. 24.~ 2020. 2. 23.)\r\n\r\n* 단, 업력 미충족 기업 중 ‘20 ~‘22년 초기창업패키지, 재도전성공패키지,‘22년 창업중심대학(초기 창업기업) 참여기업은 첨부 [붙임 3]의 자격요건을 충족할 경우‘패스트트랙’으로 지원 가능\r\n\r\n(※상세 자격요건은 공고 참조)\r\n\r\n〇 지원내용 : 사업화 자금 (최대 3억원, 평균 1.2억원), 창업프로그램 등\r\n\r\n〇 신청방법 : 온라인접수(http://www.k-startup.go.kr)\r\n\r\n○ 사업설명회 : 2023. 3. 9(목) 10시 / 경남창조경제혁신센터 6층 611호 * 사전등록 없이 참석 가능\r\n\r\n〇 문의사항 : 경남창조경제혁신센터 창업도약지원팀\r\n\r\nTel.055-291-9345, 9357, 9306";

//            var title1 = "로타바이러스 예방접종 실시 안내";
//            var title2 = "전수교육관 활성화 사업-무형유산 나들이 \"벚꽃풍류\" 공연 안내";
//            var title3 = "전수교육관 활성화 사업-전수교육관 한바퀴 프로그램 참여자 모집 안내";
//            var title4 = "올바른 손 씻기 6단계";
//            var title5 = "워크온(걷기 앱) 3월 챌린지 개최";
//            var title6 = "2023년도 창업도약패키지 모집 안내";

//            var titeArray = new List<string>();
//            titeArray.Add(title1);
//            titeArray.Add(title2);
//            titeArray.Add(title3);
//            titeArray.Add(title4);
//            titeArray.Add(title5);
//            titeArray.Add(title6);


//            var contentsArray = new List<string>();
//            contentsArray.Add(contents1);
//            contentsArray.Add(contents2);
//            contentsArray.Add(contents3);
//            contentsArray.Add(contents4);
//            contentsArray.Add(contents5);
//            contentsArray.Add(contents6);


//            var notice = new SGNoticeInfo()
//            {
//                PostDate = "2023-02-16 20:04:20",
//                DeptName = "보건행정과",
//                Title = title1,
//                Contents = contents1,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles.ToArray(),
//            };
//            NoticeInfos.Add(notice);

//            var notice2 = new SGNoticeInfo()
//            {
//                PostDate = "2023-03-16 19:12:43",
//                DeptName = "문화예술과",
//                Title = title2,
//                Contents = contents2,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles2.ToArray(),
//            };
//            NoticeInfos.Add(notice2);
//            var notice3 = new SGNoticeInfo()
//            {
//                PostDate = "2023-03-16 19:12:43",
//                DeptName = "문화예술과",
//                Title = title3,
//                Contents = contents3,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles3.ToArray(),
//            };
//            NoticeInfos.Add(notice3);
//            var notice4 = new SGNoticeInfo()
//            {
//                PostDate = "2023-03-15 19:12:43",
//                DeptName = "보건행정과",
//                Title = title4,
//                Contents = contents4,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles4.ToArray(),
//            };
//            NoticeInfos.Add(notice4);
//            var notice5 = new SGNoticeInfo()
//            {
//                PostDate = "2023-03-09 19:12:43",
//                DeptName = "건강증진과",
//                Title = title5,
//                Contents = contents5,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles5.ToArray(),
//            };
//            NoticeInfos.Add(notice5);
//            var notice6 = new SGNoticeInfo()
//            {
//                PostDate = "2023-03-02 19:12:43",
//                DeptName = "기업통상과",
//                Title = title6,
//                Contents = contents6,
//                Views = 0,
//                AttachmentFiles = new string[0],
//                ImageFiles = imgfiles6.ToArray(),
//            };
//            NoticeInfos.Add(notice6);




//            //for (int i = 0; i < 22; i++)
//            //{
//            //    var dept = "공보관";
//            //    var index = (i + 1) % 6;
//            //    var title = titeArray[index];
//            //    var contents = contentsArray[index];
//            //    var imgFile = imgfiles[index];
//            //    var imglist  =new List<string>();

//            //    imglist.Add(imgFile);
//            //    var notice = new SGNoticeInfo()
//            //    {
//            //        PostDate = DateTime.Now.ToString(),
//            //        DeptName = dept,
//            //        Title = title,
//            //        Contents = contents,
//            //        Views = 0,
//            //        AttachmentFiles = new string[0],
//            //        ImageFiles = imglist.ToArray(),
//            //    };
//            //    NoticeInfos.Add(notice);
//            //}

//            return NoticeInfos;
//        }

//        private List<SGGosigonggoInfo> MakeDumpGosigonggoInfo()
//        {
//            var GosigoggoInfos = new List<SGGosigonggoInfo>();

//            var attfiles = new string[3];
//            attfiles[0] = "file1.hwp";
//            attfiles[1] = "file3.hwp";
//            attfiles[2] = "file4.hwp";

//            var contents1 = "「가축전염병 예방법」 제17조의6 및 같은 법 시행규칙 제20조의9(가축소유자 등의 방역기준) 별표 2의4 제2호 축산관계시설을 출입하는 사람 및 차량 등에 대한 방역조치 방법, 제4호 가축의 입식, 거래 및 관리 시 방역관련 준수사항과 제5호 그 밖에 가축의 종류별 방역기준 세부사항 등 가축전염병 예방을 위하여 필요한 방역조치 방법 및 요령을 다음과 같이 공고합니다.\r\n1. 축산차량에 대한 소독필증 확인 및 보관\r\n  ○ 가축(돼지)의 소유자 또는 관리자(이하 “소유자등”이라 한다)는 법 제17조의3제1항 각 호의 시설출입차량이 농장에 진입*할 경우, 시설출입차량의 운전자에게 거점소독시설에서 발급한 소독필증을 확인하고 소독필증 1부를 보관할 것\r\n      * 농장의 울타리 또는 담장 안으로 차량이 진입하거나, 돼지 출하 및 입식 등을 위해 울타리 또는 담장 인근까지 접근하는 경우를 포함한다.\r\n2. 양돈농장 출입 차량에 대한 소독 강화(2단계 소독)\r\n  ○ 「가축전염병 예방법」(이하 “법”이라 한다) 제17조제1항제1호에 따른 소유자등(사육시설 50㎡ 초과)은 농장에 출입하는 모든 차량을 터널식・고정식 소독시설로 소독한 후(1단계 소독), 고압분무기를 사용해 차량의 바퀴와 하부 등을 추가로 소독(2단계 소독)할 것\r\n      * 다만, 「가축전염병 예방법」 시행규칙 제20조 [별표 1의10] 1. 공통기준 단서 규정에 따라, 50m2 이상 1,000m2 미만의 가축 사육시설로서 터널식 또는 고정식 소독시설 설치가 어려운 농장의 경우에는 고압분무기를 사용해 소독\r\n  ○ 소유자 등은 소독시설이 얼거나 동파되지 않도록 매일 확인하고, 소독시설이 정상 작동하지 않는 경우 즉시 정비・보수할 것\r\n□ 시행기간 : 2023년 2월 28일까지\r\n□ 유의사항 : 이 요령을 위반하는 경우 「가축전염병 예방법」 제60조제1항에 따라 1천만원 이하의 과태료 처분을 받을 수 있으며, 양돈농장에서 아프리카돼지열병 발생 시 같은 법 제48조제3항에 따라 살처분 보상금 5%을 감액할 수 있음\r\n이 공고는 2023년 2월 1일부터 시행한다.";
//            var contents2 = "2023년 시민텃밭 분양 희망자 모집을 아래와 같이 공고합니다.\r\n1. 시민텃밭 운영개요\r\n  가. 운영규모 : 445세대(1세대당 8㎡)\r\n  나. 운영기간 : 2023. 4월 중순 ~ 12월 말\r\n  다. 사 용 료 : 17,000원/8㎡\r\n2. 신청자격 : 진주시민 또는 혁신도시 공공기관 재직자\r\n3. 신청기간기간 : 2023. 2. 6.(월) ~ 2. 28.(월)\r\n4. 접수방법 : 우편 또는 전자메일 접수\r\n  가. 우편 : 진주시 문산읍 문정로 471-9, 진주시농업기술센터 농업정책과 도시농업팀\r\n  나. 전자메일 : baeih11@korea.kr\r\n5. 문 의 처 : 진주시 농업기술센터 농업정책과 도시농업팀(☎055-749-6113) \r\n6. 기타 유의사항 등은 붙임 공고문 필히 확인 요망";
//            var contents3 = "지방자치단체를 당사자로 하는 계약에 관한 법률 시행령 제33조 규정에 의하여 아래 용역에 대해 수의계약 견적제출 안내 공고하고자 합니다.\r\n  가. 용 역 명 : 중앙시장 상권활성화 연구용역\r\n  나. 낙찰자결정방법: 협상에 의한 계약\r\n  다. 용역기간 : 착수일로부터 6개월\r\n  라. 과업내용 : 과업지시서, 제안요청서 참조\r\n  마. 용역금액 : 금55,000,000원(이윤, 부가세포함)\r\n  바. 공고방법 : 국가종합전자조달시스템(G2B), 시홈페이지.\r\n붙임  공고문 및 과업지시서 각 1부.";
//            var contents4 = "지방자치단체를 당사자로 하는 계약에 관한 법률 시행령 제33조 규정에 의하여 아래 용역에 대해 수의계약 견적제출 안내 공고하고자 합니다.\r\n  가. 용 역 명 : 2023년 유아숲교육 위탁운영 용역\r\n  나. 용역개요 : 과업지시서 참조\r\n  다. 용역기간 : 착수일로부터 10개월 간\r\n  라. 용역금액 : 금57,332,000원(추정가격 52,120,000원+부가세 5,212,000원)\r\n  마. 기초금액 : 금57,332,000원( 부가세 포함)\r\n  바. 공고방법 : 국가종합전자조달시스템(G2B), 시홈페이지.\r\n붙임  공고문 및 과업지시서 각 1부.";

//            var title1 = "아프리카돼지열병 방역 관련 양돈농장에서 준수해야 할 추가 방역기준";
//            var title2 = "2023년 시민텃밭 분양 희망자 모집 공고";
//            var title3 = "용역 전자입찰 공고- 중앙시장 상권활성화 연구용역(긴급)";
//            var title4 = "소액수의(용역) 견적제출 안내 공고-2023년 유아숲교육 위탁운영 용역(재공고)";

//            var titeArray = new string[4];
//            titeArray[0] = title1;
//            titeArray[1] = title2;
//            titeArray[2] = title3;
//            titeArray[3] = title4;

//            var contentsArray = new string[4];
//            contentsArray[0] = contents1;
//            contentsArray[1] = contents2;
//            contentsArray[2] = contents3;
//            contentsArray[3] = contents4;


//            for (int i = 0; i < 20; i++)
//            {
//                var gosiNum = 300 + i;
//                var dept = "체육진흥과_" + i;
//                var index = 3 % (i + 1);
//                var title = titeArray[index];
//                var contents = contentsArray[index];

//                var goggo1 = new SGGosigonggoInfo()
//                {
//                    NotAncmtMgtNo = DateTime.Now.ToString(),
//                    GosiNumber = $"진주시 고시공고 제2023-{gosiNum}호",
//                    PostDate = DateTime.Now.ToString(),
//                    StartPeriod = DateTime.Now.ToString(),
//                    EndPeriod = DateTime.Now.ToString(),
//                    DeptCode = dept,
//                    Title = title,
//                    Contents = contents,
//                };
//                GosigoggoInfos.Add(goggo1);
//            }


//            return GosigoggoInfos;

//        }

//        [HttpGet("Search/{searchText}")]
//        public async Task<ActionResult> Search(string searchText)
//        {
//            var searchUsers = await _dbContext.Users.Where(u => u.Name!.Contains(searchText)).ToArrayAsync();
//            var teamInfos = await _dbContext.Departments.Where(o => o.Name!.Contains(searchText)).ToArrayAsync();

//            var result = new Dictionary<string, object>()
//            {
//                ["users"] = searchUsers,
//                ["organizations"] = teamInfos,
//            };

//            return Ok(result);
//        }

//        [HttpGet("SearchUser/{searchText}")]
//        public async Task<IEnumerable<SGUser>> GetSearchUser(string searchText)
//        {
//            var searchTextTrim = searchText.Trim();
//            if (string.IsNullOrWhiteSpace(searchTextTrim) || searchTextTrim.Length < 2)
//            {
//                return new SGUser[0];
//            }
//            //랭크삭제
//            //var users = await _dbContext.Users.Where(u => u.chartId.HasValue && u.UserRank.HasValue && (u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim))).ToArrayAsync();
//            // 배치도에 소속되지 않은 직원은 검색하지 않는다.
//            var users = await _dbContext.Users
//                .Where(u => u.chartId.HasValue && (u.Name!.Contains(searchTextTrim) || u.SearchFilter1.Contains(searchTextTrim)))
//                .ToArrayAsync();


//            return users;
//        }


//        public async Task<List<MainBannerItemInfo>> GetMainBannerInfo()
//        {
//            var mainBannerList = new List<MainBannerItemInfo>();
//            try
//            {
//                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/main/list.do"))
//                {
//                    Debug.WriteLine(response.StatusCode);

//                    if (HttpStatusCode.OK == response.StatusCode)
//                    {
//                        var bannerList = await response.Content.ReadFromJsonAsync<List<MainBannerItemInfo>>();

//                        if (bannerList != null)
//                        {
//                            foreach (var item in bannerList)
//                            {
//                                mainBannerList.Add(new MainBannerItemInfo { ImgAlt = item.ImgAlt, ImgLink = "", ImgUrl = ConvertedRelayUrl(item.ImgUrl) });
//                            }
//                            return mainBannerList;
//                        }
//                    }
//                    else
//                    {
//                        _logger.LogInformation(" GetMainBannerInfo : response.StatusCode = " + response.StatusCode);
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, ex?.Message);
//            }

//            return mainBannerList;
//        }

//        public async Task<List<SubBannerItemInfo>> GetSubBannerInfo()
//        {
//            var bannerList = new List<SubBannerItemInfo>();
//            try
//            {
//                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/sub/list.do"))
//                {
//                    Debug.WriteLine(response.StatusCode);

//                    if (HttpStatusCode.OK == response.StatusCode)
//                    {
//                        var resultList = await response.Content.ReadFromJsonAsync<List<SubBannerItemInfo>>();

//                        if (resultList != null)
//                        {
//                            foreach (var item in resultList)
//                            {
//                                item.mainImgUrl = ConvertedRelayUrl(item.mainImgUrl);

//                                bannerList.Add(item);
//                            }
//                        }
//                    }
//                    else
//                    {
//                        _logger.LogInformation(" GetMainBannerInfo : response.StatusCode = " + response.StatusCode);
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, ex?.Message);
//            }

//            return bannerList;
//        }

//        public async Task<List<NewNoticeInfo>> GetNewNotice(int pageunit)
//        {
//            var noticeList = new List<NewNoticeInfo>();
//            try
//            {
//                var apiUrl = $"https://www.jinju.go.kr/api/board/public/list.do?pageunit={pageunit}";
//                using (var response = await _httpClientFactory.CreateClient().GetAsync(apiUrl))
//                {
//                    Debug.WriteLine(response.StatusCode);

//                    if (HttpStatusCode.OK == response.StatusCode)
//                    {
//                        noticeList = await response.Content.ReadFromJsonAsync<List<NewNoticeInfo>>();

//                        if (noticeList != null)
//                        {
//                            noticeList.ForEach(item => item.ImgList?.ForEach(f => f.Url = ConvertedRelayUrl(f.Url)));
//                        }
//                    }
//                    else
//                    {
//                        _logger.LogInformation("GetNewNotice : response.StatusCode = " + response.StatusCode);
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                _logger.LogError(ex, ex?.Message);
//            }

//            return noticeList;
//        }

//        public async Task<List<NewNoticeInfo>> GetNewNotice2(int pageunit)
//        {
//            //var noticeList = new List<NewNoticeInfo>();

//            var dbNotiList = await _dbContext.Notices.Take(100).ToArrayAsync();

//            var convertedList = dbNotiList.Select(it =>
//            {
//                return new NewNoticeInfo
//                {
//                    Idx = it.Id,
//                    Title = it.Title,
//                    ImgList = it.ImageFiles?.Select(img => new JinjuApiImageInfo { Title = "", Alt = "", Idx = 0, Url = img }).ToList() ?? new List<JinjuApiImageInfo>(),
//                    DeptName = it.DeptName,
//                    WriteDate = it.PostDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
//                    Content = it.Contents
//                };
                
//            }).ToList();
           
//            return convertedList ?? new List<NewNoticeInfo>();
//        }


//        private string ConvertedRelayUrl(string url)
//        {
//            return $"api/relay?path={HttpUtility.UrlEncode(url)}";
//        }

//        private async Task MainBannerImages()
//        {
//            try
//            {
//                using (var response = await _httpClientFactory.CreateClient().GetAsync("https://www.jinju.go.kr/api/banner/main/list.do"))
//                {
//                    Console.WriteLine(response.StatusCode);

//                    if (HttpStatusCode.OK == response.StatusCode)
//                    {
//                        var body = await response.Content.ReadFromJsonAsync<MainBannerItemInfo>();
//                        Console.WriteLine(body);
//                    }
//                    else
//                    {
//                        Console.WriteLine($" -- response.ReasonPhrase ==> {response.ReasonPhrase}");
//                    }
//                }

//            }
//            catch (HttpRequestException ex)
//            {
//                Console.WriteLine($"ex.Message={ex.Message}");
//                Console.WriteLine($"ex.InnerException.Message = {ex.InnerException.Message}");

//                Console.WriteLine($"----------- 서버에 연결할수없습니다 ---------------------");
//            }
//            catch (Exception ex2)
//            {
//                Console.WriteLine($"Exception={ex2.Message}");
//            }
//        }


//        //[HttpGet("testxml")]
//        //public IActionResult GetTextXml()
//        //{
//        //    string xmlPathDir = _configuration["XmlPath"];
//        //    var confList = ConferenceHelpers.GetConferenceRoomInfo(xmlPathDir);

//        //    return Ok(confList);
//        //}


//        private async Task<List<SGMeetingInfo>> GetCouncilMeetingInfos()
//        {
//            // 현재날짜기준 이전과 다음주 포함 총 3주간 일정을 보여준다.
//            var now = DateTime.Now;
//            int weekIndex = (int)now.DayOfWeek;
//            var s = now.AddDays(-(7 + weekIndex));
//            var e = s.AddDays(21);
//            var start = new DateTime(s.Year, s.Month, s.Day, 0, 0, 0);
//            var end = new DateTime(e.Year, e.Month, e.Day, 0, 0, 0);

//            //.Where(m => m.StartTime >= start && m.EndTime <= end)

//            var meetingInfos = await _dbContext.MeetingInfos
//                        .Where(m => m.DeptName == "진주시의회" && m.StartTime >= start && m.EndTime <= end && m.Approval == "02")
//                        .OrderBy(m => m.StartTime)
//                        .ToListAsync();

//            return meetingInfos;
//        }



//        [HttpGet("testdownload")]
//        public FileResult GetTestDownload()
//        {
//            var imgPath = _configuration.GetSection("Image").GetValue<string>("SavePath");
//            var buffer = System.IO.File.ReadAllBytes(System.IO.Path.Combine(imgPath, "temp", "a.apk"));
//            return File(buffer, "application/octet-stream", "a.apk");
//        }
//    }

//}
