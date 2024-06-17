using Microsoft.AspNetCore.SignalR;

namespace SmartGuideSystem.Kiosk.Signalr
{
    public class KioskIdProvider : IUserIdProvider
    {
        public string? GetUserId(HubConnectionContext connection)
        {
            var userId = connection.GetHttpContext()?.Request.Query["userId"];
            return userId;
        }
    }
}
