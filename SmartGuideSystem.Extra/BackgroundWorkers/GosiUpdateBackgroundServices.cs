
using SmartGuideSystem.DB;
using SmartGuideSystem.Extra.Services;

namespace SmartGuideSystem.Kiosk.BackgroundWorkers
{
    public class GosiUpdateBackgroundServices : BackgroundService
    {
        private readonly ILogger<GosiUpdateBackgroundServices> _logger;
        private readonly IServiceProvider _service;
        public GosiUpdateBackgroundServices(ILogger<GosiUpdateBackgroundServices> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _service = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("GosiUpdateBackgroundServices Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("GosiUpdateBackgroundServices");

                using (var scope = _service.CreateScope())
                {
                    var gosiService = scope.ServiceProvider.GetService<GosiUpdateServices>();
                    await gosiService.Update();
                }
                await Task.Delay(60* 60* 1000, stoppingToken);
            }
        }
    }
}
