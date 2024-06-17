using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using SmartGuideSystem.Kiosk.Services;
using System.IO.Compression;
using System.Net.Http.Headers;

namespace SmartGuideSystem.Kiosk.Controllers
{
    [Route("api/relay")]
    [ApiController]
    public class RelayController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _memoryCache;

        public RelayController(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            _httpClientFactory= httpClientFactory;
            _memoryCache= memoryCache;
        }

        [HttpGet]
        public async Task<IActionResult> GetRelayImage(string path)
        {
            //if (!_memoryCache.TryGetValue(path, out Stream result))
            //{
            //    using var httpClient = _httpClientFactory.CreateClient();
            //    httpClient.DefaultRequestHeaders.CacheControl = new CacheControlHeaderValue
            //    {
            //        NoCache = false,
            //        MaxAge = TimeSpan.FromDays(1),
            //    };
            //    var response = await httpClient.GetStreamAsync(path);
            //    _memoryCache.Set(path, response);
            //}

            using var httpClient = _httpClientFactory.CreateClient();
            httpClient.DefaultRequestHeaders.CacheControl = new CacheControlHeaderValue
            {
                NoCache = false,
                MaxAge = TimeSpan.FromDays(1),
            };
            var response = await httpClient.GetStreamAsync(path);
            return File(response, "image/jpeg");
            
            //return File(result, "image/jpeg");
            //return File(new GZipStream(result, CompressionLevel.Fastest), "image/jpeg");
        }
    }
}
