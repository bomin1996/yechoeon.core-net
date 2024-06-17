using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using SmartGuideSystem.DB;
using SmartGuideSystem.Kiosk.Models;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using System.Web;

namespace SmartGuideSystem.Kiosk.Services
{
    public class WeatherAndAirService
    {
        private IConfiguration _configuration;
        private readonly ILogger<WeatherAndAirService> _logger;
        private readonly IHttpClientFactory _httpClientFactory;

        public string ServiceKey { get; set; } = @"XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg%3D%3D";
        //public string ServiceKey { get; set; } = @"XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg==";

        //XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg==
        //XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg%3D%3D

        const string WeatherURL1 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
        const string WeatherURL_초단기예보조회 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
        const string AirURL1 = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";



        //9 ㎍/㎥
        //9 ㎍/㎥
        //0/034 ppm
        public WeatherAirInfo CurrentWeatherAir { get; }
        public int NX { get; set; } = 81;
        public int NY { get; set; } = 75;
        public string StationName { get; set; } = "상대동(진주)";


        private readonly WeatherAirServiceOption _snapshotOptions;

        public WeatherAndAirService(IConfiguration configuration, ILogger<WeatherAndAirService> logger, IHttpClientFactory httpClientFactory)
        {
            CurrentWeatherAir = new WeatherAirInfo
            {
                Location = "-",
                Time = "",
                Temp = "-",
                ChoMise = "-",
                Mise = "-",
                Ozon = "-",
            };

            _configuration = configuration;
            _logger = logger;
            _httpClientFactory = httpClientFactory;

            var session = _configuration.GetSection("WeatherAir");
            var key = session.GetValue<string>("ServiceKey");
            var nx = session.GetValue<int>("NX");
            var ny = session.GetValue<int>("NY"); 
            var stationName = session.GetValue<string>("StationName");

            if (!string.IsNullOrWhiteSpace(key))
            {
                ServiceKey = key;
                NX = nx;
                NY = ny;
                StationName = stationName;
            }

            //ServiceKey = key;
            //NX = nx;
            //NY = ny;
            //StationName = stationName;
        }

        public async Task Request초단기예보()
        {
            // full query url
            // http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?&pageNo=1&numOfRows=100&dataType=json&base_date=20230623&base_time=1030&nx=81&ny=75&ServiceKey=XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg%3D%3D

            CurrentWeatherAir.Time = DateTime.Now.ToString("yyyy.MM.dd (ddd)"); // 결과와 상관없이 업데이트

            var now = DateTime.Now;
            var forecastTime = new DateTime(now.Year, now.Month, now.Day, now.Hour, 30, 0);

            if (now < forecastTime)
            {
                forecastTime = forecastTime.AddHours(-1);
            }

            var queryValues = new[]
            {
                new KeyValuePair<string, string>("pageNo", "1"),
                new KeyValuePair<string, string>("numOfRows", "100"),
                new KeyValuePair<string, string>("dataType", "json"),
                new KeyValuePair<string, string>("base_date", forecastTime.ToString("yyyyMMdd") ),
                new KeyValuePair<string, string>("base_time", forecastTime.ToString("HH30")),
                new KeyValuePair<string, string>("nx", $"{NX}"),
                new KeyValuePair<string, string>("ny", $"{NY}"),
            };

            var requestAPIFullPath = QueryHelpers.AddQueryString("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?", queryValues);
            requestAPIFullPath += $"&ServiceKey={ServiceKey}";

            using var httpClient = _httpClientFactory.CreateClient();
            var apiResult = await httpClient.GetFromJsonAsync<WeatherAPIResult>(requestAPIFullPath);
            
            if (apiResult != null && apiResult.Response?.Header?.ResultCode == "00")
            {
                var tempFirst = apiResult.Response.Body.Items.Item.Where(it => it.Category == "T1H").First();
                var ptyFirst = apiResult.Response.Body.Items.Item.Where(it => it.Category == "PTY").First();
                var skyFirst = apiResult.Response.Body.Items.Item.Where(it => it.Category == "SKY").First();

                var temp = tempFirst.FcstValue;
                var pty = ptyFirst.FcstValue;
                var sky = skyFirst.FcstValue;

                CurrentWeatherAir.Temp = temp; //+ "℃";
                CurrentWeatherAir.Time = DateTime.Now.ToString("yyyy.MM.dd (ddd)");

                //# 특정 요소의 코드값 및 범주
                //-하늘상태(SKY) 코드: 맑음(1), 구름많음(3), 흐림(4)
                //- 강수형태(PTY) 코드: (초단기)없음(0), 비(1), 비 / 눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
                //                      (단기) 없음(0), 비(1), 비 / 눈(2), 눈(3), 소나기(4)
                //- 초단기예보, 단기예보 강수량(RN1, PCP) 범주 및 표시방법(값)

                if (pty != "0")
                {
                    CurrentWeatherAir.weatherCode= pty;
                } 
                else
                {
                    CurrentWeatherAir.weatherCode = "1" + sky;
                }
            }


        }


        public async Task Request대기질()
        {
            // full api url 
            // http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?pageNo=1&ver=1.0&numOfRows=2&returnType=json&dataTerm=DAILY&stationName=%EC%83%81%EB%8C%80%EB%8F%99(%EC%A7%84%EC%A3%BC)&ServiceKey=XyXV4PhFuaVeajtfwDBUgdjQFYpqOcDPHegtQvTQxPH9YNTbt4q3k65EhbYVPyQfIjFbiI0UUDEk0MYAtG5Bdg%3D%3D

            var queryValues = new[]
            {
                new KeyValuePair<string, string>("pageNo", "1"),
                new KeyValuePair<string, string>("ver", "1.0"),
                new KeyValuePair<string, string>("numOfRows", "2"),
                new KeyValuePair<string, string>("returnType", "json"),
                new KeyValuePair<string, string>("dataTerm", "DAILY" ),
                new KeyValuePair<string, string>("stationName", StationName),
            };

            var fullPath = QueryHelpers.AddQueryString(AirURL1, queryValues);
            using var httpClient = _httpClientFactory.CreateClient();
            fullPath += $"&ServiceKey={ServiceKey}";

            var apiResult = await httpClient.GetFromJsonAsync<AirAPIResult>(fullPath);

            if (apiResult != null && apiResult.Response.Header.ResultCode == "00" && apiResult.Response.Body.Items.Length > 0)
            {
                var airValue = apiResult.Response.Body.Items.First();
                CurrentWeatherAir.ChoMise = airValue.Pm25Value + "㎍/㎥";
                CurrentWeatherAir.ChoMiseStatus = DescGradeValue(airValue.Pm25Grade);
                CurrentWeatherAir.Mise = airValue.Pm10Value + "㎍/㎥";
                CurrentWeatherAir.MiseStatus = DescGradeValue(airValue.Pm10Grade);
                CurrentWeatherAir.Ozon = airValue.O3Value + "ppm";
                CurrentWeatherAir.OzonStatus = DescGradeValue(airValue.O3Grade);
            }
        }

        private string DescGradeValue(string airGrade)
        {
            switch (airGrade)
            {
                case "1": return "좋음";
                case "2": return "보통";
                case "3": return "나쁨";
                case "4": return "매우나쁨";
            }

            return "-";
        }
    }

    public class WeatherAPIResult
    {
        [JsonPropertyName("response")]
        public WeatherResponse Response { get; set; }
    }
    public class WeatherResponse
    {
        [JsonPropertyName("header")]

        public ResponseHeader? Header { get; set; }
        [JsonPropertyName("body")]

        public WeatherResponseBody? Body { get; set; }
    }
    public class ResponseHeader
    {
        [JsonPropertyName("resultCode")]

        public string ResultCode { get; set; }

        [JsonPropertyName("resultMsg")]

        public string ResultMsg { get; set; }
    }
    public class WeatherResponseBody
    {
        [JsonPropertyName("dataType")]

        public string DataType { get; set; }

        [JsonPropertyName("pageNo")]

        public int PageNo { get; set; }
        [JsonPropertyName("numOfRows")]

        public int NumOfRows { get; set; }
        [JsonPropertyName("totalCount")]

        public int TotalCount { get; set; }
        [JsonPropertyName("items")]

        public WeatherValueItems Items { get; set; }
    }
    public class WeatherValueItems
    {
        [JsonPropertyName("item")]
        public WeatherItem[] Item { get; set; }
    }
    public class WeatherItem
    {
        [JsonPropertyName("baseDate")]

        public string BaseDate { get; set; }

        [JsonPropertyName("baseTime")]

        public string BaseTime { get; set; }

        [JsonPropertyName("category")]

        public string Category { get; set; }

        [JsonPropertyName("fcstDate")]

        public string FcstDate { get; set; }

        [JsonPropertyName("fcstTime")]

        public string FcstTime { get; set; }

        [JsonPropertyName("fcstValue")]

        public string FcstValue { get; set; }

        [JsonPropertyName("nx")]

        public int Nx { get; set; }

        [JsonPropertyName("ny")]

        public int Ny { get; set; }

        [JsonPropertyName("obsrValue")]
        public string? ObsrValue { get; set; }
    }

    public class AirAPIResult
    {
        [JsonPropertyName("response")]
        public AirResponse Response { get; set; }
    }
    public class AirResponse
    {
        [JsonPropertyName("header")]

        public ResponseHeader Header { get; set; }
        [JsonPropertyName("body")]

        public AirResponseBody? Body { get; set; }
    }
    public class AirResponseBody
    {
        [JsonPropertyName("dataType")]

        public string DataType { get; set; }

        [JsonPropertyName("pageNo")]

        public int PageNo { get; set; }
        [JsonPropertyName("numOfRows")]

        public int NumOfRows { get; set; }
        [JsonPropertyName("totalCount")]

        public int TotalCount { get; set; }
        [JsonPropertyName("items")]

        public AirItem[] Items { get; set; }
    }

    public class AirItem
    {
        [JsonPropertyName("so2Grade")]
        public string? So2Grade { get; set; }
        [JsonPropertyName("coFlag")]
        public string? CoFlag { get; set; }
        [JsonPropertyName("khaiValue")]
        public string? KhaiValue { get; set; }
        [JsonPropertyName("so2Value")]
        public string? So2Value { get; set; }
        [JsonPropertyName("coValue")]
        public string? CoValue { get; set; }
        [JsonPropertyName("pm25Flag")]
        public string? Pm25Flag { get; set; }
        [JsonPropertyName("pm10Flag")]
        public string? Pm10Flag { get; set; }
        [JsonPropertyName("pm10Value")]
        public string? Pm10Value { get; set; }
        [JsonPropertyName("o3Grade")]
        public string? O3Grade { get; set; }
        [JsonPropertyName("khaiGrade")]
        public string? KhaiGrade { get; set; }
        [JsonPropertyName("pm25Value")]
        public string? Pm25Value { get; set; }
        [JsonPropertyName("no2Flag")]
        public string? No2Flag { get; set; }
        [JsonPropertyName("no2Grade")]
        public string? No2Grade { get; set; }
        [JsonPropertyName("o3Flag")]
        public string? O3Flag { get; set; }
        [JsonPropertyName("pm25Grade")]
        public string? Pm25Grade { get; set; }
        [JsonPropertyName("so2Flag")]
        public string? So2Flag { get; set; }
        [JsonPropertyName("dataTime")]
        public string? DataTime { get; set; }
        [JsonPropertyName("coGrade")]
        public string? CoGrade { get; set; }
        [JsonPropertyName("no2Value")]
        public string? No2Value { get; set; }
        [JsonPropertyName("pm10Grade")]
        public string? Pm10Grade { get; set; }
        [JsonPropertyName("o3Value")]
        public string? O3Value { get; set; }
    }



    public class WeatherAirServiceOption
    {
        public const string SessionName = "WeatherAir";

        public string ServiceKey { get; set; }
        public int NX { get; set; } = 81;
        public int NY { get; set; } = 75;
        public string StationName { get; set; } = "상대동(진주)";
    }

}
