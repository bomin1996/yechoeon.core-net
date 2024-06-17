using Microsoft.AspNetCore.Authentication.Cookies;

namespace SmartGuideSystem.NewAdmin.Const
{
    public static class SGSConst
    {
        public const string SINAGE_COOKIE_VALUE = "SignAge.Cookie";
        public const string AUTH_COOKIE_KEY_NAME = CookieAuthenticationDefaults.AuthenticationScheme;
        //public const string AUTH_COOKIE_KEY_NAME = CookieAuthenticationDefaults.AuthenticationScheme;

        public const int AUTH_COOKIE_EXPIRE_TIME_MIN = 60;
        public const int AUTH_LOGIN_EXPIRE_TIME_MIN = 60;

    }
}
