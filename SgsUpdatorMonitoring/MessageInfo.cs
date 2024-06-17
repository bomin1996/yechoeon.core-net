using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SgsUpdatorMonitoring
{
    public class MessageInfo
    {
        public string MsgDateTime { get; set; }
        public string Message { get; set; }


        public static MessageInfo SetMessageInfo(string msgDateTime, string msg)
        {
            return new MessageInfo() { MsgDateTime = msgDateTime, Message = msg };  
        }
    }
}
