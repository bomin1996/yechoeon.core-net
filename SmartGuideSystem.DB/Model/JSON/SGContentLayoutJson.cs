using SmartGuideSystem.Common.Defines;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class SGContentLayoutJson
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("desc")]
        public string? Desc { get; set; }
        [JsonPropertyName("category1")]
        public string? Category1 { get; set; }
        [JsonPropertyName("layoutType")]
        public string? LayoutType { get; set; } = "FreeStyle";
        [JsonPropertyName("modifiedTime")]
        public DateTime? ModifiedTime { get; set; }
        [JsonPropertyName("modifier")]
        public string? Modifier { get; set; }
        [JsonPropertyName("sceneItems")]
        public List<SGScene> SceneItems { get; set; }
    }

    public class SGScene 
    {
        [JsonPropertyName("width")]
        public int Width { get; set; }
        [JsonPropertyName("height")]
        public int Height { get; set; }
        [JsonPropertyName("sceneType")]
        public string? SceneType { get; set; }
        [JsonPropertyName("segments")]
        public List<SGSceneSegment> Segments { get; set; }
    }

    public class SGSceneSegment 
    {
        [JsonPropertyName("x")]
        public int X { get; set; }
        [JsonPropertyName("y")]
        public int Y { get; set; }

        [JsonPropertyName("width")]
        public int Width { get; set; }

        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("isVisible")]
        public bool IsVisible { get; set; }
        [JsonPropertyName("contents")]
        public List<SGSegmentContent> Contents { get; set; }
    }

    public class SGSegmentContent 
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("duration")]
        public long Duration { get; set; }
        [JsonPropertyName("thumbnail")]
        public string? thumbnail { get; set; }
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("contentFit")]
        public string ContentFit { get; set; }
        [JsonPropertyName("contentType")]
        public string ContentType { get; set; }
        [JsonPropertyName("width")]
        public int Width { get; set; }
        [JsonPropertyName("height")]
        public int Height { get; set; }
        [JsonPropertyName("size")]
        public long Size { get; set; }
    }

}
