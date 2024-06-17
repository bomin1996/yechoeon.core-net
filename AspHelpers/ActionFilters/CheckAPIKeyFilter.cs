using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AspHelpers.ActionFilters
{
    public class CheckAPIKeyFilter : ActionFilterAttribute
    {
        public string KeyName { get; set; }
        public string APIKey { get; set; }

        public CheckAPIKeyFilter(string apiKey, string keyName) : base()
        {
            APIKey = apiKey;
            KeyName = keyName;  
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //base.OnActionExecuting(context);
            if (!ExistKeyValue(context))
            {
                context.Result = new StatusCodeResult(401);
            }
        }

        //public override void OnResultExecuting(ResultExecutingContext context)
        //{
        //    if (context.HttpContext.Request.Headers.ContainsKey(this.KeyName))
        //    {
        //        var values = context.HttpContext.Request.Headers[this.KeyName];

        //        if (values.Count > 1 && values.First() == APIKey)
        //        {
        //            return;
        //        }
        //    }

        //    context.Result = new StatusCodeResult(401);
        //}

        private bool ExistKeyValue(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.Headers.ContainsKey(this.KeyName))
            {
                var values = context.HttpContext.Request.Headers[this.KeyName];

                if (values.Count > 0 && values.First() == APIKey)
                {
                    return true;
                }
            }

            return false;
        }

    }
}
