using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.Common.Defines;
using System.Net.Http.Headers;

namespace NotifyKioskServer
{
    public class KioskService
    {
        const string APIKeyName = "SignalKey";
        const string APIKeyValue = "KeySignal";

        private IConfiguration _configuration;
        private readonly ILogger<KioskService> _logger;
        private readonly IHttpClientFactory _httpClientFactory;

        public KioskService(IConfiguration configuration, ILogger<KioskService> logger, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }

        public async Task Notify(string notification, string content)
        {
            string kioskServerAddress = _configuration["KioskServer"];
            using (var httpClient = _httpClientFactory.CreateClient())
            {
                httpClient.BaseAddress = new Uri(kioskServerAddress);
                AddApiKeyHeader(httpClient);
                HttpContent httpContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("notification", "update"),
                    new KeyValuePair<string, string>("content", "floorItems"),
                });
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

                var result = await httpClient.PostAsync($"/api/KioskInfo/NotifyDevice", httpContent);
                Console.WriteLine(result);
            }
        }

        public async Task RefreshDevice(string deviceId)
        {
            try
            {
                string kioskServerAddress = _configuration["KioskServer"] ?? "";
                using (var httpClient = _httpClientFactory.CreateClient())
                {
                    httpClient.BaseAddress = new Uri(kioskServerAddress);
                    AddApiKeyHeader(httpClient);
                    var result = await httpClient.PostAsync($"/api/KioskInfo/{deviceId}/refresh", null);
                    Console.WriteLine(result);
                }
            }
            catch (Exception exc)
            {
                _logger.LogError(exc, "KioskService.RefreshDevice");
            }
        }

        public async Task UpdateDevice(string deviceId, string content)
        {
            try
            {
                string kioskServerAddress = _configuration["KioskServer"] ?? "";
                using (var httpClient = _httpClientFactory.CreateClient())
                {
                    httpClient.BaseAddress = new Uri(kioskServerAddress);
                    AddApiKeyHeader(httpClient);
                    HttpContent httpContent = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("content", content),
                    });
                    httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                    var result = await httpClient.PostAsync($"/api/KioskInfo/update-device/{deviceId}", httpContent);
                    Console.WriteLine(result);
                }
            }
            catch (Exception exc)
            {
                _logger.LogError(exc, "KioskService.UpdateDevice");
            }
        }

        public async Task UpdateDevicesForKioskType(KioskType kioskType, string content)
        {
            try
            {
                string kioskServerAddress = _configuration["KioskServer"] ?? "";
                using (var httpClient = _httpClientFactory.CreateClient())
                {
                    httpClient.BaseAddress = new Uri(kioskServerAddress);
                    AddApiKeyHeader(httpClient);
                    HttpContent httpContent = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("content", content),
                    });
                    httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                    var result = await httpClient.PostAsync($"/api/KioskInfo/update-group-device/{kioskType.ToString()}", httpContent);
                    Console.WriteLine(result);
                }
            }
            catch (Exception exc)
            {
                _logger.LogError(exc, "KioskService.UpdateDevicesForKioskType");
            }
        }
        //[HttpPost("refresh-group-device/{kioskTypeName}")]

        public async Task RefreshDevicesForKioskType(KioskType kioskType, string content)
        {
            try
            {
                string kioskServerAddress = _configuration["KioskServer"] ?? "";
                using (var httpClient = _httpClientFactory.CreateClient())
                {
                    httpClient.BaseAddress = new Uri(kioskServerAddress);
                    AddApiKeyHeader(httpClient);
                    HttpContent httpContent = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("content", content),
                    });
                    httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                    var result = await httpClient.PostAsync($"/api/KioskInfo/refresh-group-device/{kioskType}", httpContent);
                    Console.WriteLine(result);
                }
            }
            catch (Exception exc)
            {
                _logger.LogError(exc, "KioskService.RefreshDevicesForKioskType");
            }
        }

        private void AddApiKeyHeader(HttpClient httpClient)
        {
            httpClient.DefaultRequestHeaders.Add(APIKeyName, APIKeyValue);
        }

        public async Task<string?> GetActiveDeviceStatus()
        {
            try
            {
                string kioskServerAddress = _configuration["KioskServer"] ?? "";
                using (var httpClient = _httpClientFactory.CreateClient())
                {
                    httpClient.BaseAddress = new Uri(kioskServerAddress);
                    AddApiKeyHeader(httpClient);
                    var result = await httpClient.GetStringAsync($"/api/KioskInfo/active-device-status");
                    Console.WriteLine(result);
                    return result;
                }
            }
            catch (Exception exc)
            {
                _logger.LogError(exc, "KioskService.RefreshDevice");
                return null;
            }
        }

    }
}
