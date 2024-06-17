using Microsoft.VisualBasic;
using SmartGuideSystem.Kiosk.Models;
using System.IO;
using System.Xml.Serialization;

namespace SmartGuideSystem.Kiosk.Helpers
{
    public static class ConferenceHelpers
    {
        public static void Testc()
        {
            var path = @"C:\Temp\20230406.xml";


            //XmlSerializationReader reader = new XmlSerializationReader(path);

            XmlSerializer serializer = new XmlSerializer(typeof(ROWSETS));
            using (Stream reader = new FileStream(path, FileMode.Open))
            {
                // Call the Deserialize method to restore the object's state.
                var rowSets = (ROWSETS)serializer.Deserialize(reader);

                var st = rowSets.ROWSET1[0].Start;


            }
        }

    

        public static ROWSETS ReadXML(string dirPath, DateTime? date)
        {
            if (!date.HasValue)
            {
                date = DateTime.Now;
            }

            string fileName = date.Value.ToString("yyyyMMdd") + ".xml";

            string fileFullPath = System.IO.Path.Combine(dirPath, fileName);

            if (File.Exists(fileFullPath))
            {
                
                XmlSerializer serializer = new XmlSerializer(typeof(ROWSETS));
                using (Stream reader = new FileStream(fileFullPath, FileMode.Open))
                {
                    var rowSets = (ROWSETS)serializer.Deserialize(reader);
                    return rowSets;
                }
            }
            else
            {
                throw new FileNotFoundException();
            }
        }

        public static List<ConferenceRoomInfo> GetConferenceRoomInfo(string dirPath)
        {
            List<ConferenceRoomInfo> result = new List<ConferenceRoomInfo>();

            try
            {
                var rowSets = ReadXML(dirPath: dirPath, date:null);
                var rowList = rowSets.ROWSET1.Where(r => r.End > DateTime.Now).OrderBy(r => r.Start);
                //var rowList = rowSets.ROWSET1.OrderBy(r => r.Start);


                foreach (var row in rowList)
                {
                    var conf1 = new ConferenceRoomInfo();

                    conf1.Name = row.RESOURCE_SCATE_NAME;
                    conf1.MeetingDate = row.Start.ToString("yyyy-MM-dd"); // "2023-03-22";
                    conf1.StartTime = row.Start.ToString("HH:mm"); // "09:00";
                    conf1.EndTime = row.End.ToString("HH:mm"); //"18:00";
                    conf1.DeptName = row.REGUSER_GNAME; //"관광진흥과";
                    conf1.Subject = row.TITLE; // "친환경 유람선 건조 제안서 평가위원회";
                    conf1.Contents = row.CONTENTS; // "친환경 유람선 건조 제안서 평가위원회";
                    conf1.Status = " ";



                    result.Add(conf1);


                }


            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }


            

            return result;
        }
    }

    public class ROWSETS
    {
        public List<ROW> ROWSET1 { get; set; } = new List<ROW>();

    }

    //public class ROWSET
    //{
    //    public List<Row> ROW { get; set; }
    //}

    public class ROW
    {
        public decimal RESOURCE_MANAGER_SEQ { get; set; }
        public string RESOURCE_FCATE_NAME { get; set; }
        public decimal RESOURCE_FCATE_SEQ { get; set; }
        public string RESOURCE_SCATE_NAME { get; set; }
        public decimal RESOURCE_SCATE_SEQ { get; set; }
        public string REGUSER_ID { get; set; }
        public string REGUSER_NAME { get; set; }
        public string REGUSER_GCODE { get; set; }
        public string REGUSER_GNAME { get; set; }
        public string STARTDATE { get; set; }
        public string ENDDATE { get; set; }
        public string CONTENTS { get; set; }
        public string APPROVAL { get; set; }
        public string TITLE { get; set; }
        public string REG_DATE { get; set; }
        public string PHONE_NUMBER { get; set; }
        public decimal RESOURCE_GROUP_SEQ { get; set; }
        public string? REPEAT { get; set; }
        public string? BECAUSE { get; set; }
        public string? FILE_USE { get; set; }
        public string? REPEAT_STARTDATE { get; set; }
        public string? REPEAT_ENDDATE { get; set; }


        public DateTime Start
        {
            get
            {
                if (DateTime.TryParse(STARTDATE, out var sTime))
                {
                    return sTime;
                }

                return DateTime.Now;
            }
        }

        public DateTime End
        {
            get
            {
                if (DateTime.TryParse(this.ENDDATE, out var sTime))
                {
                    return sTime;
                }

                return DateTime.Now;
            }
        }
    }
}
