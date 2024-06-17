using SmartGuideSystem.DB.Model;

namespace SmartGuideSystem.Kiosk.Models
{
    public class UserSearchResult
    {
        public int ResultCount { get; set; }
        public int PageIndex { get; set; }
        public int PageCount { get; set; }

        public IEnumerable<SGUser> Result { get; set; }
    }
}
