


using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WeatherAirService.Services;

namespace WeatherAirService.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/weather-air")]
    [ApiController]
    public class WeatherAirServiceController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ILogger<WeatherAirServiceController> _logger;
        private readonly WeatherAndAirService _weatherAndAirService;
        public WeatherAirServiceController(WeatherAndAirService weatherAirService, IConfiguration configuration, ILogger<WeatherAirServiceController> logger)
        {
            _logger = logger;
            _configuration = configuration;
            _weatherAndAirService = weatherAirService;
        }

        [HttpGet("weather-and-air")]
        public IActionResult GetWeatherAndAir()
        {
            return Ok(_weatherAndAirService.CurrentWeatherAir);
        }
    }
}
