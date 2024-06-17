using HanChosung;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SixLabors.ImageSharp;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/meetinginfo")]
    [ApiController]
    public class MeetingInfoController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly KioskService _kioskService;
        private readonly ILogger<MeetingInfoController> _logger;

        public MeetingInfoController(SGSDataContext dataContext, ILogger<MeetingInfoController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService = kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGMeetingInfo>> Get([FromQuery] string? startTime, [FromQuery] string? endTime, [FromQuery] string? deptName)
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
                    var result = await _dataContext.MeetingInfos
                        .Where(m =>
                            m.StartTime >= start.Value.ToUniversalTime() &&
                            m.EndTime <= end.Value.ToUniversalTime())
                        .ToListAsync();

                    return result;
                }
                else if ("의회사무국" == userDeptName)
                {
                    var result = await _dataContext.MeetingInfos
                        .Where(m =>
                            m.StartTime >= start.Value.ToUniversalTime() &&
                            m.EndTime <= end.Value.ToUniversalTime() &&
                            m.DeptName == "의회사무국" || m.DeptName == "진주시의회")
                        .ToListAsync();

                    return result;
                }
                else 
                {
                    var result = await _dataContext.MeetingInfos
                        .Where(m =>
                            m.StartTime >= start.Value.ToUniversalTime() &&
                            m.EndTime <= end.Value.ToUniversalTime() &&
                            m.DeptName != "의회사무국" && m.DeptName != "진주시의회")
                        .ToListAsync();

                    return result;
                }


            }
            else
            {
                return await _dataContext.MeetingInfos
                        .Where(m => m.DeptName == deptName && m.StartTime >= start.Value && m.EndTime <= end.Value)
                        .ToListAsync();
            }
        }

        [HttpPost]
        public async Task<SGMeetingInfo> Post( SGMeetingInfo meetingInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            meetingInfo.ModifiedTime = DateTime.UtcNow;
            meetingInfo.Modifier = modifier.Value;
            meetingInfo.SearchFilter1 = FindSearchFilter.ChosungDivider(meetingInfo.Name);
            meetingInfo.CreateType = "SGS";
            meetingInfo.Approval = "02";
            //meetingInfo.Id = 18;
            _dataContext.MeetingInfos.Add(meetingInfo);
            await _dataContext.SaveChangesAsync();

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.CityCouncil, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.MeetingRoomInformation, "업데이트 회의정보");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return meetingInfo;
        }

        [HttpPut]
        public async Task<SGMeetingInfo> Put(SGMeetingInfo meetingInfo)
        {
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            meetingInfo.ModifiedTime = DateTime.UtcNow;
            meetingInfo.Modifier = modifier.Value;
            meetingInfo.SearchFilter1 = FindSearchFilter.ChosungDivider(meetingInfo.Name);
            _dataContext.MeetingInfos.Update(meetingInfo);
            await _dataContext.SaveChangesAsync();

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.CityCouncil, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.MeetingRoomInformation, "업데이트 회의정보");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return meetingInfo;
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var userDeptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var mi = new SGMeetingInfo { Id = id };
            _dataContext.MeetingInfos.Remove(mi);
            var result =  _dataContext.SaveChanges() == 1;

            try
            {
                await _kioskService.UpdateDevicesForKioskType(KioskType.CityCouncil, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.FloorInformation, "업데이트 회의정보");
                await _kioskService.UpdateDevicesForKioskType(KioskType.MeetingRoomInformation, "업데이트 회의정보");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, null);
            }

            return result;
        }

        [HttpGet("meetingRooms")]
        public async Task<IEnumerable<string>> GetMeetingRooms()
        {
            var targetKioskType = KioskType.MeetingRoomInformation.ToString();
            var devices = await _dataContext.Devices
                .Where(d => d.KioskType == targetKioskType)
                .ToListAsync();

            return devices.Where(d => !string.IsNullOrWhiteSpace(d.ExtraSettings?.MeetingRoomInfoOption?.MeetingRoomName))
                .Select(d => d.ExtraSettings.MeetingRoomInfoOption.MeetingRoomName)
                .ToArray();
        }

    }
}
