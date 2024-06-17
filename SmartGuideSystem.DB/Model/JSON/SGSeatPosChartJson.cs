using SmartGuideSystem.Common.Defines;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace SmartGuideSystem.DB.Model.JSON
{
    public class SGSeatPosChartJson
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("deptCode")]
        public string DeptCode { get; set; }
        [JsonPropertyName("chartType")]
        public string ChartType { get; set; }
        [JsonPropertyName("deptName")]
        public string DeptName { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("desc")]
        public string? Desc { get; set; }
        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }
        [JsonPropertyName("jobDescription")]
        public string? JobDescription { get; set; }


        [JsonPropertyName("department")]
        public SGDepartment? Department { get; set; }

        [JsonPropertyName("nodes")]
        [JsonConverter(typeof(SGSNodeJsonConverter))]
        public List<SGSCNode> Nodes { get; set; }

        [JsonPropertyName("modifiedTime")]
        public DateTime? ModifiedTime { get; set; }
        [JsonPropertyName("modifier")]
        public string? Modifier { get; set; }

        [JsonPropertyName("width")]
        public int? Width { get; set; }
        [JsonPropertyName("height")]
        public int? Height { get; set; }
    }
    public class SGSCNode
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("x")]
        public double X { get; set; }
        [JsonPropertyName("y")]
        public double Y { get; set; }
        [JsonPropertyName("w")]
        public double W { get; set; }
        [JsonPropertyName("h")]
        public double H { get; set; }

        [JsonPropertyName("nodeType")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public SCNodeType NodeType { get; set; }
        [JsonPropertyName("templateName")]

        public string TemplateName { get; set; }
    }
    public class SGSCMemberNode : SGSCNode
    {
        [JsonPropertyName("member")]
        public SGUser Member { get; set; }
        [JsonPropertyName("size")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MemberCardSize Size { get; set; }

        [JsonPropertyName("color")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MemberCardColor Color { get; set; }



        [JsonPropertyName("title")]
        public string? Title { get; set; }
        [JsonPropertyName("grade")]
        public string? Grade { get; set; }

        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }
        [JsonPropertyName("jobDescription")]
        public string? JobDescription { get; set; }

    }
    public class SGSCTeamBannerNode : SGSCNode
    {
        [JsonPropertyName("color")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MemberCardColor Color { get; set; }
        [JsonPropertyName("title")]
        public string? Title { get; set; }
        [JsonPropertyName("officeTel")]
        public string? OfficeTel { get; set; }
        [JsonPropertyName("officeFax")]
        public string? OfficeFax { get; set; }
        [JsonPropertyName("jobDescription")]
        public string? JobDescription { get; set; }
        [JsonPropertyName("clickAction")]
        public string? ClickAction { get; set; }
    }
    public class SGSCChartTitleNode : SGSCNode
    {
        [JsonPropertyName("title")]
        public string? Title { get; set; }
        [JsonPropertyName("fontSize")]
        public int FontSize { get; set; } = 20;
        [JsonPropertyName("fontWeight")]
        public int FontWeight { get; set; } = 500;

    }
    public class SGSCEntranceNode : SGSCNode
    {
        [JsonPropertyName("title")]
        public string? Title { get; set; }
        [JsonPropertyName("fontSize")]
        public int FontSize { get; set; } = 20;
        [JsonPropertyName("fontWeight")]
        public int FontWeight { get; set; } = 500;
        [JsonPropertyName("iconName")]
        public string? IconName { get; set; }
    }
    public class SGSCLinkNode : SGSCNode
    {
        [JsonPropertyName("color")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MemberCardColor Color { get; set; }
        [JsonPropertyName("size")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MemberCardSize Size { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
        
        [JsonPropertyName("clickAction")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LinkClickAction ClickAction { get; set; }

        [JsonPropertyName("chartName")]
        public string? ChartName { get; set; }
        [JsonPropertyName("chartId")]
        public int? ChartId { get; set; }
        
        
    }
    public class SGSNodeJsonConverter : JsonConverter<List<SGSCNode>>
    {
        public override List<SGSCNode>? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var nodeList = new List<SGSCNode> { };

            var jsonNode = JsonNode.Parse(ref reader);

            if (jsonNode == null)
            {
                return nodeList;
            }

            var array = jsonNode.AsArray();

            foreach (var node in array)
            {
                string strValue = node["nodeType"].GetValue<string>();
                SCNodeType nodeType = Enum.Parse<SCNodeType>(strValue);

                if (nodeType == SCNodeType.Member)
                {
                    var memberNode = node.Deserialize<SGSCMemberNode>(options);
                    nodeList.Add(memberNode);
                }
                else if (nodeType == SCNodeType.TeamBanner)
                {
                    var objNode = node.Deserialize<SGSCTeamBannerNode>(options);
                    nodeList.Add(objNode);
                }
                else if (nodeType == SCNodeType.ChartTitle)
                {
                    var objNode = node.Deserialize<SGSCChartTitleNode>(options);
                    nodeList.Add(objNode);
                }
                else if (nodeType == SCNodeType.Entrance)
                {
                    var objNode = node.Deserialize<SGSCEntranceNode>(options);
                    nodeList.Add(objNode);
                }
                else if (nodeType == SCNodeType.Link)
                {
                    var objNode = node.Deserialize<SGSCLinkNode>(options);
                    nodeList.Add(objNode);
                }
            }

            return nodeList;
        }

        //public override void Write(Utf8JsonWriter writer, List<SGSCNode> value, JsonSerializerOptions options)
        //{
        //    JsonSerializer.Serialize(writer, value);
        //}

        public override void Write(Utf8JsonWriter writer, List<SGSCNode> value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();

            foreach (var node in value)
            {
                SCNodeType nodeType = node.NodeType;
                if (nodeType == SCNodeType.Member)
                {
                    JsonSerializer.Serialize<SGSCMemberNode>(writer, node as SGSCMemberNode);
                }
                else if (nodeType == SCNodeType.TeamBanner)
                {
                    JsonSerializer.Serialize<SGSCTeamBannerNode>(writer, node as SGSCTeamBannerNode);
                }
                else if (nodeType == SCNodeType.ChartTitle)
                {
                    JsonSerializer.Serialize<SGSCChartTitleNode>(writer, node as SGSCChartTitleNode);
                }
                else if (nodeType == SCNodeType.Entrance)
                {
                    JsonSerializer.Serialize<SGSCEntranceNode>(writer, node as SGSCEntranceNode);
                }
                else if (nodeType == SCNodeType.Link)
                {
                    JsonSerializer.Serialize<SGSCLinkNode>(writer, node as SGSCLinkNode);
                }
            }

            writer.WriteEndArray();
        }
    }
}
