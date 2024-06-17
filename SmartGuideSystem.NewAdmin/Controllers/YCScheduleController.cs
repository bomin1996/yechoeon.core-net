using AspHelpers.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.Admin.Controllers;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.YC;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/schedule")]
    [ApiController]
    public class YCScheduleController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<YCScheduleController> _logger;

        public YCScheduleController(SGSDataContext dataContext, ILogger<YCScheduleController> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<YCSchedule>> Get([FromQuery] string? startTime, [FromQuery] string? endTime)
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

            var result = await _dataContext.YCSchedules
               .Where(m =>
                   m.ScheduleDate >= start.Value.ToUniversalTime() &&
                   m.ScheduleDate <= end.Value.ToUniversalTime())
               .ToListAsync();


            return result;
        }

        [HttpPost]
        public async Task<IActionResult> PostSchedule(YCSchedule scheduleInfo)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            scheduleInfo.Modifier = modifier;
            scheduleInfo.ModifiedTime = DateTime.UtcNow;
            _dataContext.YCSchedules.Add(scheduleInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(scheduleInfo);
        }


        [HttpPut]
        public async Task<IActionResult> PutSchedule(YCSchedule scheduleInfo)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var shcedule = _dataContext.YCSchedules.FirstOrDefault(t => t.Id == scheduleInfo.Id);
            if (shcedule == null)
            {
                return NotFound();
            }

            scheduleInfo.Modifier = modifier;
            scheduleInfo.ModifiedTime = DateTime.UtcNow;

            _dataContext.YCSchedules.Update(scheduleInfo);
            await _dataContext.SaveChangesAsync();
            return Ok(scheduleInfo);
        }

        [HttpDelete("{id}")]
        public bool DeleteSchedule(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var schedule = _dataContext.YCSchedules.FirstOrDefault(o => o.Id == id);

            if (schedule == null)
            {
                return false;
            }

            _dataContext.YCSchedules.Remove(schedule);
            return _dataContext.SaveChanges() == 1;
        }
    }

}
