using SmartGuideSystem.Common.Defines;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class SGFloorItem
    {
        [JsonPropertyName("itemType")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FloorItemType ItemType { get; set; }
        //public string ItemType { get; set; }

        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("x")]
        public double X { get; set; }
        [JsonPropertyName("y")]
        public double Y { get; set; }
        [JsonPropertyName("width")]
        public double Width { get; set; }
        [JsonPropertyName("height")]
        public double Hight { get; set; }
        [JsonPropertyName("deviceId")]
        public string? DeviceId { get; set; }
        [JsonPropertyName("deptCode")]
        public string? DeptCode { get; set; }
        [JsonPropertyName("deptName")]
        public string? DeptName { get; set; }

        [JsonPropertyName("organizationChartId")]
        public int? OrganizationChartId { get; set; }

        [JsonPropertyName("orgChartName")]
        public string? OrgChartName { get; set; }




        [JsonPropertyName("action")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FloorItemActionType Action { get; set; }
        //public string Action { get; set; }



        [JsonPropertyName("content")]
        public string? Content { get; set; }
    }
}
