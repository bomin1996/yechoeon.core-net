using Microsoft.AspNetCore.SignalR;
using SmartGuideSystem.Common.Defines;

namespace SmartGuideSystem.Kiosk.Signalr
{
    public class DeviceNotificationHub : Hub
    {
        private readonly ILogger<DeviceNotificationHub> _logger;
        private readonly DeviceStatusService _deviceStatus;
        public DeviceNotificationHub(ILogger<DeviceNotificationHub> logger, DeviceStatusService deviceStatusService) 
        { 
            _logger = logger;
            _deviceStatus = deviceStatusService;
        }
        //private Dictionary<string, string> _deviceIdMap = new Dictionary<string, string>();
        public async Task SendNotification(string notification, string content)
        {
            await Clients.All.SendAsync("ReceiveNotification", notification, content);
        }

        public async Task SendRefreshDevice(string deviceId, string content)
        {
            await Clients.User(deviceId).SendAsync("RefreshDevice", content);
        }

        public async Task HeartBeatDevice(string deviceId, string content)
        {
            await Clients.Group("Observer").SendAsync("Heartbeat", deviceId, content);
        }

        public async Task RegisterKioskType(string deviceId, string kioskType)
        {
            if (!string.IsNullOrEmpty(deviceId))
            {
                if (Enum.TryParse<KioskType>(kioskType, out var resultType))
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, resultType.ToString());
                }
            }
        }

        public async Task HeartBeat(string deviceId, string kioskType)
        {
            _logger.LogInformation($"HeartBeat DeviceId:{deviceId}");


            if (!string.IsNullOrEmpty(deviceId))
            {
                if (Enum.TryParse<KioskType>(kioskType, out var resultType))
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, resultType.ToString());
                }

                _deviceStatus.UpdateDeviceStatus(deviceId);

            }
        }

        //public void RegisterDevice(string connectionId, string deviceId)
        //{
        //    //await Groups.AddToGroupAsync(Context.ConnectionId, deviceId);
        //}

        //public async Task RefreshDevice(string deviceId)
        //{
        //    if (_deviceIdMap.ContainsKey(deviceId))
        //    {
        //        var connectionId = _deviceIdMap[deviceId];
        //        await Clients.Client(connectionId).SendAsync("RefreshDevice", deviceId);
        //    }
        //}

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

    }
}
