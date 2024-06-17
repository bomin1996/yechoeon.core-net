using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.Common.Defines
{
    public enum SGContentType
    {
        [EnumMember(Value = "Image")]
        Image,
        [EnumMember(Value = "Video")]
        Video,
        
    }

    //public enum SGSceneType
    //{
    //    //"FullScreen" | "3Div" | "2Div" | "2Div(1:2)" | "2Div(2:1)";
    //    [EnumMember(Value = "Video")]
    //    Video,
    //    [EnumMember(Value = "Video")]
    //    Video,
    //    [EnumMember(Value = "Video")]
    //    Video,
    //    [EnumMember(Value = "Video")]
    //    Video,
    //    [EnumMember(Value = "Video")]
    //    Video,
    //}
}
