using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class SGCouncilConfigJson
    {
        [JsonPropertyName("greeting")]
        public string? Greeting { get; set; }
        [JsonPropertyName("profile")]
        public string? Profile { get; set; }
        [JsonPropertyName("profileImageUrl")]
        public string? ProfileImageUrl { get; set; }
        [JsonPropertyName("memberIds")]
        public string[]? MemberIds { get; set; }

        [JsonPropertyName("chairmanId")]
        public string? ChairmanId { get; set; }
    }
}




