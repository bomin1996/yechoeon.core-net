using Microsoft.AspNetCore.SignalR;
using SmartGuideSystem.DB;
using SmartGuideSystem.Kiosk.Signalr;

namespace SmartGuideSystem.Kiosk.BackgroundWorkers
{
    public class BackgroundWorkerService : BackgroundService
    {
        private readonly ILogger<BackgroundWorkerService> _logger;

        private readonly IHubContext<DeviceNotificationHub> _deviceHub;
        private readonly SGSDataContext _dbContext;

        public BackgroundWorkerService(ILogger<BackgroundWorkerService> logger, IHubContext<DeviceNotificationHub> hubContext, IServiceScopeFactory factory)
        {
            _logger = logger;
            _deviceHub = hubContext;
            _dbContext = factory.CreateScope().ServiceProvider.GetRequiredService<SGSDataContext>();
        }
        //https://www.thecodebuzz.com/using-dbcontext-instance-in-ihostedservice/
        //public BackgroundWorkerService(ILogger<BackgroundWorkerService> logger, IHubContext<DeviceNotificationHub> hubContext, IServiceProvider serviceProvider)
        //{
        //    _logger = logger;
        //    _deviceHub = hubContext;
        //    _dbContext = serviceProvider.CreateScope().ServiceProvider.GetRequiredService<SGSDataContext>();
        //}



    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("My Background Service Started!");
            _logger.LogError("My Background Service Started! custom Error");
            while (!stoppingToken.IsCancellationRequested)
            {
                //_logger.LogInformation("Background Worker running at: {time}", DateTimeOffset.Now);
                //_logger.LogInformation("Background Worker running at: {time}", DateTimeOffset.Now);
                await Task.Delay(5000, stoppingToken);

                await _deviceHub.Clients.All.SendAsync("ReceiveNotification", "all devices", DateTime.Now.ToString("HH:mm:ss.fff"));
            }
        }
    }
}
