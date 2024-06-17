using HanChosung;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/notice")]
    [ApiController]
    public class NoticesController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly KioskService _kioskService;
        private readonly ILogger<NoticesController> _logger;

        public NoticesController(SGSDataContext dataContext, ILogger<NoticesController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGNotice>> Get([FromQuery] string? startTime, [FromQuery] string? endTime, [FromQuery] string? deptName)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;

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

            if (string.IsNullOrEmpty(deptName))
            {
                if (role != "DepartManager")
                {
                    var result = await _dataContext.Notices
                        .Where(m =>
                            m.PostDate >= start.Value.ToUniversalTime() &&
                            m.PostDate <= end.Value.ToUniversalTime())
                        .OrderBy(m => m.PostDate)
                        .ToListAsync();

                    return result;
                }
                else if ("의회사무국" == userDeptName)
                {
                    var result = await _dataContext.Notices
                        .Where(m =>
                            m.PostDate >= start.Value.ToUniversalTime() &&
                            m.PostDate <= end.Value.ToUniversalTime() &&
                            m.DeptName == "의회사무국" || m.DeptName == "진주시의회")
                        .OrderBy(m => m.PostDate)
                        .ToListAsync();

                    return result;
                }
                else
                {
                    var result = await _dataContext.Notices
                        .Where(m =>
                            m.PostDate >= start.Value.ToUniversalTime() &&
                            m.PostDate <= end.Value.ToUniversalTime() &&
                            m.DeptName != "의회사무국" && m.DeptName != "진주시의회")
                        .OrderBy(m => m.PostDate)
                        .ToListAsync();

                    return result;
                }


            }
            else
            {
                return await _dataContext.Notices
                        .Where(m => m.DeptName == deptName && m.PostDate >= start.Value && m.PostDate <= end.Value)
                        .OrderBy(m => m.PostDate)
                        .ToListAsync();
            }
        }

        [HttpPost]
        public async Task<SGNotice> Post(SGNotice noticeInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            noticeInfo.ModifiedTime = DateTime.UtcNow;
            noticeInfo.Modifier = modifier.Value;
            noticeInfo.SearchFilter1 = FindSearchFilter.ChosungDivider(noticeInfo.Title);
            noticeInfo.NoticeType = "SGS";
            _dataContext.Notices.Add(noticeInfo);
            await _dataContext.SaveChangesAsync();

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 노티스");
                await _kioskService.UpdateDevicesForKioskType(KioskType.OrganizationChart, "업데이트 노티스");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return noticeInfo;
        }

        [HttpPut]
        public async Task<SGNotice> Put(SGNotice noticeInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            noticeInfo.ModifiedTime = DateTime.UtcNow;
            noticeInfo.Modifier = modifier.Value;
            noticeInfo.SearchFilter1 = FindSearchFilter.ChosungDivider(noticeInfo.Title);
            _dataContext.Notices.Update(noticeInfo);
            await _dataContext.SaveChangesAsync();

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 노티스");
                await _kioskService.UpdateDevicesForKioskType(KioskType.MeetingRoomInformation, "업데이트 노티스");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return noticeInfo;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var mi = new SGNotice { Id = id };
            _dataContext.Notices.Remove(mi);
            var result = _dataContext.SaveChanges() == 1;

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 노티스");
                await _kioskService.UpdateDevicesForKioskType(KioskType.MeetingRoomInformation, "업데이트 노티스");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return result;
        }
    }
}
