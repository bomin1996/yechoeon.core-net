using SmartGuideSystem.Common.Defines;

namespace SmartGuideSystem.Kiosk.Models
{
    public class BannerImageInfo
    {
        public int? MainBannerIntervalSec { get; set; }
        public int? SubBannerIntervalSec { get; set; }

        public List<MainBannerItemInfo>? MainBannerList { get; set; }
        public List<SubBannerItemInfo>? SubBannerList { get; set; }

    }

    public class MainBannerItemInfo 
    {

        public string? ImgUrl { get; set; }
        public string? ImgLink { get; set; }
        public string? ImgAlt { get; set; }
    }


    public class SubBannerItemInfo
    {
        public string? mainImgUrl { get; set; }
        public string? link { get; set; }

        public BoardVO? boardVO { get; set; }
    }

    public class BoardVO 
    {
        public int idx { get; set; }
        public string? title { get; set; }
        public List<NoticeApiImageInfo>? imgList { get; set; }
        public string? deptName { get; set; }
        public string? writeDate { get; set; }
        public string? content { get; set; }

    }

}
