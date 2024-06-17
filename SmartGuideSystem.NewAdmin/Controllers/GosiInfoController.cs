using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/gosiinfo")]
    [ApiController]
    public class GosiInfoController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly KioskService _kioskService;
        private readonly ILogger<GosiInfoController> _logger;

        public GosiInfoController(SGSDataContext dataContext, ILogger<GosiInfoController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGGosigonggoInfo>> Get([FromQuery] string? startTime, [FromQuery] string? endTime)
        {

            //DateTime? start = null;
            //DateTime? end = null;
            //if (DateTime.TryParseExact(startTime, "yyyyMMdd",null, System.Globalization.DateTimeStyles.None, out var st))
            //{
            //    start = st;
            //}
            //if (DateTime.TryParseExact(startTime, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var et))
            //{
            //    {
            //    end = et;
            //}

            //if (!start.HasValue || !end.HasValue)
            //{
            //    var now = DateTime.Now;
            //    start = new DateTime(now.Year, now.Month, now.Day);
            //    end = start.Value.AddDays(1);
            //}


            string startDt = "";
            string endDt = "";

            DateTime? start = null;
            DateTime? end = null;
            if (DateTime.TryParseExact(startTime, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var st))
            {
                startDt = startTime;
            }
            if (DateTime.TryParseExact(endTime, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var et))
            {
                endDt = endTime;
            }

            if (string.IsNullOrEmpty(endTime) || (string.IsNullOrEmpty(startTime)))
            {
                startDt = DateTime.Now.AddDays(-30).ToString("yyyyMMdd");
                endDt = DateTime.Now.ToString("yyyyMMdd");
            }


            //            .Where(g => g.StartPeriod.CompareTo(now) <= 0)
            //.Where(g => g.EndPeriod.CompareTo(now) >= 0)
            //.Where(f => f.FileInfos.Count > 0)
            ////.Where(g => g.SearchFilter1 == "완료")
            ////.Where(g => g.DELETE_YN != "Y") -> 아래 필터에서 검색 
            ////.OrderBy(g => g.NotAncmtMgtNo.Substring(1, 4))
            //.OrderBy(g => g.NotAncmtMgtNo)
            //.OrderByDescending(g => g.PostDate)
            ////.OrderBy(g=>g.StartPeriod)
            //.ToArrayAsync();


            var result = await _dataContext.GosigoggoInfos

                  .Where(g => g.StartPeriod.CompareTo(startDt) >= 0)
                  .Where(g => g.EndPeriod.CompareTo(endDt) >= 0)
                .ToListAsync();

            return result;
        }


        [HttpGet("search-postdate")]
        public async Task<IEnumerable<SGGosigonggoInfo>> GetSearchPostDate([FromQuery] string? postDate)
        {
            string postDt = "";
            DateTime? start = null;
            if (DateTime.TryParseExact(postDate, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out var st))
            {
                postDt = postDate;
            }

            if (string.IsNullOrEmpty(postDt))
            {
                postDt = DateTime.Now.ToString("yyyyMMdd");
            }

            var result = await _dataContext.GosigoggoInfos
                  .Where(g => g.PostDate.CompareTo(postDt) == 0)
                .ToListAsync();

            return result;
        }
    }
}
