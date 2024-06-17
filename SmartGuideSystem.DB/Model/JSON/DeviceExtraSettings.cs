using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class DeviceExtraSettings
    {
        public GosigonggoOption? GosiOption { get; set; }
        public OrgChartOption? OrgChartOption { get; set; }

        //정의되지 않은 일반 RefreshMS
        public int? RefreshMS { get; set; } = 10000; // 10초
        public int? floorMapType { get; set; } = 0;
        public int? autoUpdateMS { get; set; } = 0;

        public SeatPosChartOption? SeatPosChartOption { get; set; }

        public MeetingRoomOption? MeetingRoomInfoOption { get; set; }

        [JsonPropertyName("localMapOption")]
        public LocalMapOption? LocalMapOption { get; set; }
        [JsonPropertyName("contentLayoutOption")]
        public ContentLayoutOption? ContentLayoutOption { get; set; }

        public double? volume { get; set; }

        //의령 새소식 필터 
        [JsonPropertyName("noticeFilter")]
        public string? NoticeFilter { get; set; }


        //강서 고시공고 필터 
        [JsonPropertyName("gosiFilter")]
        public string? GosiFilter { get; set; }

        public LocationOption? LocationOption { get; set; }

        
        [JsonPropertyName("ycImageUrls")]
        public List<string>? YcImageUrls { get; set; }
    }


    public class GosigonggoOption
    {
        public string? GosiType { get; set; }
        public int? RefreshMS { get; } = 2 * 60 * 1000; //2분 
    }

    public class OrgChartOption
    {
        public int? RefreshMS { get;}
    }

    public class SeatPosChartOption
    {
        //배치도 아이디
        [JsonPropertyName("seatPosChartId")]
        public int? SeatPosChartId { get; set; }
        [JsonPropertyName("seatPosChartName")]
        public string? SeatPosChartName { get; set; }

    }

    public class MeetingRoomOption
    {
        [JsonPropertyName("meetingRoomName")]
        public string? MeetingRoomName { get; set; }
    }

    public class LocalMapOption
    {
        public int id { get; set; }
        public string name { get; set; }
    }

    public class ContentLayoutOption
    {
        public int id { get; set; }
        public string name { get; set; }
        public int? subId { get; set; }
        public string? subName { get; set; }
    }

    public class LocationOption
    {
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? IpAddress { get; set; }
    }
}
