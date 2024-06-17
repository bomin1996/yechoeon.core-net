using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.HwpConverter.Data
{
    public class LogMessageInfo
    {
        public string DateTime { get; set; }
        public string Message { get; set; }


        public static LogMessageInfo SetMessageInfo(string msgDateTime, string msg)
        {
            return new LogMessageInfo() { DateTime = msgDateTime, Message = msg };
        }
    }
}
