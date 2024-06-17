using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;

namespace SmartGuideSystem.Admin.Helpers
{
    public static class QueryHelper
    {
        public static string GetQuery(IQueryCollection query, string key)
        {
            string queryValue = "";
            if (query.TryGetValue(key, out var outValue))
            {
                queryValue = outValue.ToString();
            }

            return queryValue;
        }


    }
}
