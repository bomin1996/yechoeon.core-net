

using Microsoft.AspNetCore.SignalR;

namespace DeviceHubSignalr.Signalr
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
