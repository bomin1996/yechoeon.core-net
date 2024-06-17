using SmartGuideSystem.Kiosk.Services;

namespace SmartGuideSystem.Kiosk.BackgroundWorkers
{
    public class WeatherWorkerService : BackgroundService
    {
        private readonly ILogger<WeatherWorkerService> _logger;
        private readonly WeatherAndAirService _weatherAndAirService;

        public WeatherWorkerService(ILogger<WeatherWorkerService> logger, WeatherAndAirService weatherAndAirService)
        {
            _logger = logger;
            _weatherAndAirService = weatherAndAirService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("WeatherWorkerService Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await _weatherAndAirService.Request초단기예보();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "초단기예보 가져오기 오류");
                }
                try
                {
                    await _weatherAndAirService.Request대기질();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "측정소별 실시간 측정정보 조회 오류");
                }


                await Task.Delay(30 * 60 * 1000, stoppingToken);
            }
            
        }
    }
}
