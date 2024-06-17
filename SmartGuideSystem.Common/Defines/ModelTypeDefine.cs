using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.Common.Defines
{
    public enum KioskType
    {
        None = 0,
        OrganizationChart = 1,
        BuildingGuideHorizontalChart = 2,
        BuildingGuideVerticalChart = 3,
        Gosigonggo = 4,
        FloorInformation = 5,
        CityCouncil = 6,
        MeetingRoomInformation = 7,
        GangseoGosiNotice = 8,
        Signage = 9,
        HamanCycleKioskGuide = 10,
        Yecheon=11,

    }

    public enum KioskTypeName
    {
        미설정 = 0,
        조직도키오스크 = 1,
        청사안내가로 = 2,
        청사안내새로 = 3,
        고시공고 = 4,
        층별청사안내 = 5,
        의회안내 = 6,
        회의실안내 = 7,
        강서구청고시새소식 = 8,
        사이니지 = 9,
        함안자전거주차장안내 = 10,
        예천농업기술원 = 11,
    }

    public enum MemberStatus
    {
        None = 0,
        Idle = 1,
        Education = 2, //교육
        BusinessTrip = 3, //출장
        AnnualLeave = 4, // 휴가
    }

    public enum OrganizationType
    {
        None = 0,
        팀 = 1,
        과 = 2,
        단 = 3,
        국 = 4,
        직속기관 = 5,
        사업소= 6,
        시청 = 7,
        시의회 = 8
    }

    public enum MemberGradeType
    {
        None = 0,
        시장 = 1,
        부시장 = 2,
        국장 = 3,
        과장 = 4,
        팀장 = 5,
        주무관 = 6,
        단장 = 7,
        소장 = 8,
        공무직 = 8,
        청원경찰 = 8,
        

    }

    public enum GosigonggoType
    {
        Gosigonggo =0,
        Employment = 0,
    }

    public static class ModelTypeDefine
    {

    }


    public enum OrganizationGroupType
    {
        Single = 0,
        Vertical,
        Horizontal,
        TopBoss_TwoColumns,
        RightBoss_TwoRows,
        Horizontal_LeftDirection,
        LeftBoss_TowRows,
    }

    public enum FloorItemType
    {
        [EnumMember(Value = "None")]
        None,
        [EnumMember(Value = "Department")]
        Department,
        [EnumMember(Value = "KioskDevice")]
        KioskDevice,
    }
    
    public enum FloorItemActionType
    {
        [EnumMember(Value = "ShowOrganizationChart")]
        ShowOrganizationChart,
        [EnumMember(Value = "ShowFloorMap")]
        ShowFloorMap,
        [EnumMember(Value = "ShowInfoPopup")]
        ShowInfoPopup,
    }

    public enum SCNodeType
    {
        [EnumMember(Value = "Member")]
        Member,
        [EnumMember(Value = "TeamBanner")]
        TeamBanner,
        [EnumMember(Value = "ChartTitle")]
        ChartTitle,
        [EnumMember(Value = "Entrance")]
        Entrance,
        [EnumMember(Value = "Link")]
        Link,
    }

    public enum MemberCardSize
    {
        [EnumMember(Value = "Large")]
        Large,
        [EnumMember(Value = "Medium")]
        Medium,
        [EnumMember(Value = "Small")]
        Small,
    }

    public enum MemberCardColor
    {
        [EnumMember(Value = "Yellow")]
        Yellow,
        [EnumMember(Value = "Blue")]
        Blue,
        [EnumMember(Value = "Green")]
        Green,
        [EnumMember(Value = "Mint")]
        Mint,
        [EnumMember(Value = "Orange")]
        Orange,
        [EnumMember(Value = "Red")]
        Red,
    }

    public enum LinkClickAction
    {
        [EnumMember(Value = "ShowSeatPosChart")]
        ShowSeatPosChart,
        [EnumMember(Value = "ShowFloorGuideMap")]
        ShowFloorGuideMap,
    }
}
