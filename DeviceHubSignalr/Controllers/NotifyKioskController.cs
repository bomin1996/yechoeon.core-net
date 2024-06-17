using AspHelpers.ActionFilters;
using DeviceHubSignalr.Signalr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.Common.Defines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceHubSignalr.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    //[Route("api/notify-kiosk")]
    [Route("api/kioskinfo")]
    [ApiController]
    public class NotifyKioskController : ControllerBase
    {
        const string APIKeyName = "SignalKey";
        const string APIKeyValue = "KeySignal";
        private readonly ILogger<NotifyKioskController> _logger;
        private readonly IHubContext<DeviceNotificationHub> _deviceHub;
        private readonly DeviceStatusService _deviceStatus;

        public NotifyKioskController(ILogger<NotifyKioskController> logger, IHubContext<DeviceNotificationHub> deviceHub, DeviceStatusService deviceStatus)
        {
            _logger = logger;
            _deviceHub = deviceHub;
            _deviceStatus = deviceStatus;
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

        [CheckAPIKeyFilter(apiKey: APIKeyValue, keyName: APIKeyName)]
        [HttpGet("active-device-status")]
        public ActionResult GetActiveDeviceStatus()
        {
            List<DeviceStatus> statusList = new();
            foreach (var kvp in _deviceStatus.DeviceStatusDic)
            {
                statusList.Add(new DeviceStatus(deviceId: kvp.Key, updateTime: kvp.Value));
            }
            return Ok(statusList);
        }

        record DeviceStatus(string deviceId, DateTime updateTime);
    }
}
