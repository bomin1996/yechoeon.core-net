

using DeviceHubSignalr.Signalr;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DeviceHubSignalr
{
    public static class DeviceHubSignalrService
    {
        public static void AddDeviceHubSignalrService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IUserIdProvider, KioskIdProvider>();
            services.AddSingleton<DeviceStatusService>();
            services.AddSignalR();
        }

        public static void UseDeviceHubSignalrService(this IEndpointRouteBuilder endpointRouteBuilder, string connectionPath = "/DeviceNotificationHub")
        {
            endpointRouteBuilder.MapHub<DeviceNotificationHub>(connectionPath);
        }
    }
}