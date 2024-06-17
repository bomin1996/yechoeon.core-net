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
    [Route("api/devices")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<DevicesController> _logger;
        private readonly KioskService _kioskService;
        public DevicesController(SGSDataContext dataContext, ILogger<DevicesController> logger, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _kioskService= kioskService;
        }

        [HttpGet]
        public async Task<IEnumerable<SGDevice>> Get()
        {
            var result = await _dataContext.Devices.OrderBy(device => device.DeviceId).ToArrayAsync();
            return result;
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPost]
        public async Task<SGDevice> PostDevice(SGDevice device)
        {

            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;
            device.Modifier = modifier;
            device.ModifiedTime = DateTime.UtcNow;
            _dataContext.Devices.Add(device);
            await _dataContext.SaveChangesAsync();
            return device;
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPut]
        public async Task<SGDevice> PutDevice(SGDevice device)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            device.Modifier = modifier;
            device.ModifiedTime = DateTime.UtcNow;
            _dataContext.Devices.Update(device);
            await _dataContext.SaveChangesAsync();
            return device;
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpDelete("{id}")]
        public async Task DeleteDevice(int id)
        {
            _dataContext.Devices.Remove(new SGDevice { Id = id });
            await _dataContext.SaveChangesAsync();
            Ok();
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPost("{deviceId}/refresh")]
        public async Task PostRefreshDevice(string deviceId)
        {
            await _kioskService.RefreshDevice(deviceId);
        }

        [HttpGet("{deviceId}/exist")]
        public async Task<IActionResult> GetDeviceIdExist(string deviceId)
        {
            var result = await _dataContext.Devices.FirstOrDefaultAsync(o => o.DeviceId == deviceId);
            return Ok(new { exist = (result != null) });
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPost("kiosktype/{kioskType}/refresh")]
        public async Task PostRefreshGroup(string kioskType)
        {
            if (Enum.TryParse<KioskType>(kioskType, out var resultType))
            {
                var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                await _kioskService.RefreshDevicesForKioskType(resultType, modifier);
            }
            
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpPost("kiosktype/{kioskType}/update")]
        public async Task PostUpdateGroup(string kioskType)
        {
            if (Enum.TryParse<KioskType>(kioskType, out var resultType))
            {
                var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                await _kioskService.UpdateDevicesForKioskType(resultType, modifier);
            }
        }

        [Authorize(Roles = "SystemAdmin,Admin")]
        [HttpGet("active-device-status")]
        public async Task<IActionResult> GetActiveDeviceStatus()
        {
            var result = await _kioskService.GetActiveDeviceStatus();
            return Ok(result);
        }

    }
}
