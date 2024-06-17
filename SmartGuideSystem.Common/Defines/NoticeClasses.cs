using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.Common.Defines
{
    public class NewNoticeInfo
    {
        public int Idx { get; set; }

        public string Title { get; set; }

        public List<NoticeApiImageInfo> ImgList { get; set; }

        public string DeptName { get; set; }

        public string WriteDate { get; set; }

        public string Content { get; set; }
    }

    public class NoticeApiImageInfo
    {
        public int Idx { get; set; }

        public string? Title { get; set; }

        public string? Alt { get; set; }

        public string? Url { get; set; }
    }


}
