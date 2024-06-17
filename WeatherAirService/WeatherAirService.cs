using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeatherAirService.BackgroundWorkers;
using WeatherAirService.Services;

namespace WeatherAirService
{
    public static class WeatherAirService
    {
        public static void AddWeatherAirService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient();

            services.AddSingleton<WeatherAndAirService>();
            services.AddHostedService<WeatherWorkerService>();
        }
    }
}
