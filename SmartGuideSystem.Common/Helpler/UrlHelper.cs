using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SmartGuideSystem.Common.Helpler
{
    public static class UrlHelper
    {
        public static string ConvertedRelayUrl(string url)
        {
            return $"api/relay?path={HttpUtility.UrlEncode(url)}";
        }
    }
}
