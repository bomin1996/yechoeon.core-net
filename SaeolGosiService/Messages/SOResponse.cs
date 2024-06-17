using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace SaeolGosiService.Messages
{
    [XmlRoot("DOCUMENT")]
    public class SOResponse<TResult>
    {
        [XmlElement("IFID")]
        public string IFID { get; set; }
        [XmlElement("SRCORGCD")]
        public string SRCORGCD { get; set; }
        [XmlElement("TGTORGCD")]
        public string TGTORGCD { get; set; }
        [XmlElement("RESULTCODE")]
        public string RESULTCODE { get; set; }
        [XmlElement("MSGKEY")]
        public string MSGKEY { get; set; }
        [XmlElement("DATA")]
        public DataResponse<TResult> Data { get; set; }

        public static SOResponse<TResult> Parse(string xml)
        {
            using TextReader textReader = new StringReader(xml);
            using XmlReader xmlReader = XmlReader.Create(textReader);

            xmlReader.ReadStartElement("env:Envelope");
            xmlReader.ReadStartElement("env:Body");

            XmlSerializer serializer = new XmlSerializer(typeof(SOResponse<TResult>));
            var response = (SOResponse<TResult>)serializer.Deserialize(xmlReader);

            xmlReader.ReadEndElement();
            xmlReader.ReadEndElement();

            return response;
        }
    }

    public class DataResponse<TResult>
    {
        [XmlElement("message")]
        public MessageResponse<TResult> Message { get; set; }
    }

    public class MessageResponse<TResult>
    {
        [XmlElement("body")]
        public BodyResponse<TResult> Body { get; set; }
    }

    public class BodyResponse<TResult>
    {
        [XmlElement("res_cnt")]
        public int ResponseCount { get; set; }
        [XmlElement("list")]
        public TResult[] List { get; set; }
    }
}
