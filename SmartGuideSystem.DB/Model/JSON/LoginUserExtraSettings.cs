using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class LoginUserExtraSettings
    {
        [JsonPropertyName("useSignageMenu")]
        public bool UseSignageMenu { get; set; }
        [JsonPropertyName("useCouncilMenu")]
        public bool UseCouncilMenu { get; set; }

        //useMenus?: Array<String>;
        [JsonPropertyName("useMenus")]
        public string[]? UseMenus { get; set; }
    }
}
