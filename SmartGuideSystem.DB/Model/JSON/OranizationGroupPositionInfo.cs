namespace SmartGuideSystem.DB.Model.JSON
{

    public class OranizationMemberPositionContents
    {
        public List<OranizationGroupPositionInfo> GroupPositionInfos { get; set; }
    }

    public class OranizationGroupPositionInfo
    {
        public string Title { get; set; }

        public string GroupType { get; set; }

        public double X { get; set; }
        public double Y { get; set; }

        public List<MemberItem> Items { get; set; }

    }

    public class MemberItem
    {
        public Member Member { get; set; }
        
    }


}
