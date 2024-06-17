using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model.YC;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/watcher")]
    [ApiController]
    public class YCWatcehrController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<YCWatcehrController> _logger;

        public YCWatcehrController(SGSDataContext dataContext, ILogger<YCWatcehrController> logger, IConfiguration config)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<YCWatcher>> Get([FromQuery] string? startTime, [FromQuery] string? endTime)
        {
            string startDt = "";
            string endDt = "";

            DateTime? start = null;
            DateTime? end = null;

            if (DateTime.TryParse(startTime, out var st))
            {
                start = st.ToUniversalTime();
            }
            if (DateTime.TryParse(endTime, out var et))
            {
                end = et.ToUniversalTime();
            }

            if (!start.HasValue || !end.HasValue)
            {
                var now = DateTime.UtcNow;
                start = new DateTime(now.Year, now.Month, now.Day);
                end = start.Value.AddDays(1);
            }

            var result = await _dataContext.YCWatchers
               .Where(m =>
                   m.OffDutyDate >= start.Value.ToUniversalTime() &&
                   m.OffDutyDate <= end.Value.ToUniversalTime())
               .ToListAsync();
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> PostWatcher(YCWatcher watcherInfo)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            watcherInfo.Modifier = modifier;
            watcherInfo.ModifiedTime = DateTime.UtcNow;
            _dataContext.YCWatchers.Add(watcherInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(watcherInfo);
        }

        [HttpPut]
        public async Task<IActionResult> PutWatcher(YCWatcher watcherInfo)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var watcher = _dataContext.YCWatchers.FirstOrDefault(t => t.Id == watcherInfo.Id);
            if (watcher == null)
            {
                return NotFound();
            }
            watcherInfo.Modifier = modifier;
            watcherInfo.ModifiedTime = DateTime.UtcNow;
            _dataContext.YCWatchers.Update(watcherInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(watcherInfo);
        }

        [HttpDelete("{id}")]
        public bool DeleteWatcher(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var watcher = _dataContext.YCWatchers.FirstOrDefault(o => o.Id == id);
            if (watcher == null)
            {
                return false;
            }
            _dataContext.YCWatchers.Remove(watcher);
            return _dataContext.SaveChanges() == 1;
        }
    }
}
