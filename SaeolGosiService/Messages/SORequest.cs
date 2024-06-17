using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SaeolGosiService.Messages
{
    public class SORequest
    {
        public string IFID { get; set; }
        public string SRCORGCD { get; set;}
        public string TGTORGCD { get; set;}
        public string QueryId { get; set; }
        public List<(string key, object? value)> Params { get; set; }

        public string ToXml()
        {
            var sb = new StringBuilder();
            XmlWriterSettings settings = new XmlWriterSettings();
            settings.Indent = true;
            settings.OmitXmlDeclaration = true;
            using var xmlWriter = XmlWriter.Create(sb, settings);
            xmlWriter.WriteStartElement(prefix: "soapenv", localName: "Envelope", ns: "http://schemas.xmlsoap.org/soap/envelope/");
            xmlWriter.WriteStartElement(prefix: "soapenv", localName: "Body", null);
            xmlWriter.WriteStartElement(prefix: null, localName: "DOCUMENT", null);

            xmlWriter.WriteElementString("IFID", IFID);
            xmlWriter.WriteElementString("SRCORGCD", SRCORGCD);
            xmlWriter.WriteElementString("TGTORGCD", TGTORGCD);
            xmlWriter.WriteElementString("RESULTCODE", "000");
            xmlWriter.WriteElementString("MSGKEY", GetMsgKey());

            xmlWriter.WriteStartElement(prefix: null, localName: "Data", null);

            WriteMessageBody(xmlWriter);

            xmlWriter.WriteEndElement();
            xmlWriter.WriteEndElement();
            xmlWriter.WriteEndElement();
            xmlWriter.WriteEndElement();
            xmlWriter.Flush();
            
            var xml = sb.ToString();
            return xml; 
        }

        private void WriteMessageBody(XmlWriter xmlWriter)
        {
            xmlWriter.WriteStartElement(prefix: null, localName: "message", null);
            xmlWriter.WriteStartElement(prefix: null, localName: "body", null);
            xmlWriter.WriteElementString("query_id", this.QueryId);

            foreach (var reqParam in this.Params)
            {
                WriteDataListElement(xmlWriter, reqParam.value, reqParam.key);
            }

            xmlWriter.WriteEndElement();
            xmlWriter.WriteEndElement();
        }

        public void WriteDataListElement<T>(XmlWriter writer, T value, string tag)
        {
            writer.WriteStartElement("dataList");
            //writer.WriteAttributeString("TAG", tag);
            writer.WriteStartElement("data");
            if (value != null)
            {
                writer.WriteValue(value);
            }
            else
            {
                writer.WriteValue(string.Empty);
            }
            writer.WriteEndElement();
            writer.WriteEndElement();
        }

        private string GetMsgKey() => DateTime.Now.ToString("yyyyMMddhhmmssfff") + (new Random().Next()).ToString("00000000");
    }
}
