using Microsoft.VisualBasic;
using SgsUpdatorMonitoring.Log;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.JSON;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SgsUpdatorMonitoring.Meeting
{
    public class UpdaterJinjuMeetingData
    {
        public Action<Exception> OnException { get; set; }
        public Action<string> OnInformation { get; set; }
        public string ProcessPath { get; set; }

        public async void Update(SGSDataContext sGSDataContext)
        {
            try
            {
                using (Process process = new Process())
                {
                    var startDate = DateTime.Now.ToString("yyyy/MM/dd");
                    var endDate = DateTime.Now.AddDays(1).ToString("yyyy/MM/dd");

                    process.StartInfo.FileName = "node.exe";
                    process.StartInfo.Arguments = $"index.js {startDate} {endDate}";
                    process.StartInfo.WorkingDirectory = ProcessPath;
                    process.StartInfo.UseShellExecute = false;
                    process.StartInfo.RedirectStandardOutput = true;
                    process.StartInfo.StandardOutputEncoding= Encoding.UTF8;
                    process.StartInfo.CreateNoWindow= true;
                    string eOut = null;
                    process.StartInfo.RedirectStandardError = true;
                    process.ErrorDataReceived += new DataReceivedEventHandler((sender, e) =>
                    { eOut += e.Data; });

                    process.Start();

                    process.BeginErrorReadLine();
                    string output = process.StandardOutput.ReadToEnd();
                    await process.WaitForExitAsync();

                    OnInformation?.Invoke($"Error stream: {eOut}");

                    var nodeFormMeetingDataList = JsonSerializer.Deserialize<MeetingDataRowItem[]>(output);
                    
                    //Db에 인서트 
                    if (nodeFormMeetingDataList != null && nodeFormMeetingDataList.Length > 0)
                    {
                        OnInformation?.Invoke($"meeting Count : {nodeFormMeetingDataList.Length}");

                        foreach (var item in nodeFormMeetingDataList)
                        {
                            OnInformation?.Invoke($"========== {item.TITLE}");
                            //sGSDataContext.MeetingInfos.Update(meetingInfo);

                            var existMi = sGSDataContext.MeetingInfos.FirstOrDefault(mi => mi.Id == (int)item.RESOURCE_MANAGER_SEQ);
                            if (existMi != null)
                            {
                                existMi.Name = item.TITLE;
                                existMi.Subject = item.TITLE;
                                existMi.Contents = item.CONTENTS;
                                existMi.DeptCode = item.REGUSER_GCODE;
                                existMi.DeptName = item.REGUSER_GNAME;
                                existMi.Modifier = item.REGUSER_NAME;
                                existMi.ModifiedTime = (DateTime.Parse(item.REG_DATE)).ToUniversalTime();
                                existMi.CreateType = "Jinju";
                                existMi.Approval = item.APPROVAL;
                                existMi.StartTime = DateTime.Parse(item.STARTDATE).ToUniversalTime();
                                existMi.EndTime = DateTime.Parse(item.ENDDATE).ToUniversalTime();
                                existMi.MeetingDate = DateTime.Parse(item.STARTDATE).ToUniversalTime();
                                existMi.MeetingRoom = item.RESOURCE_SCATE_NAME;

                                sGSDataContext.MeetingInfos.Update(existMi);
                            }
                            else
                            {
                                var meetingInfo = new SGMeetingInfo
                                {
                                    Id = (int)item.RESOURCE_MANAGER_SEQ,
                                    Name = item.TITLE,

                                    Subject = item.TITLE,
                                    Contents = item.CONTENTS,
                                    DeptCode = item.REGUSER_GCODE,
                                    DeptName = item.REGUSER_GNAME,
                                    Modifier = item.REGUSER_NAME,
                                    ModifiedTime = (DateTime.Parse(item.REG_DATE)).ToUniversalTime(),
                                    CreateType = "Jinju",
                                    Approval = item.APPROVAL,
                                    StartTime = DateTime.Parse(item.STARTDATE).ToUniversalTime(),
                                    EndTime = DateTime.Parse(item.ENDDATE).ToUniversalTime(),
                                    MeetingDate = DateTime.Parse(item.STARTDATE).ToUniversalTime(),
                                    MeetingRoom = item.RESOURCE_SCATE_NAME,
                                };
                                sGSDataContext.MeetingInfos.Add(meetingInfo);
                            }


                        }

                        sGSDataContext.SaveChanges();
                    }

                }
            }
            catch (Exception ex)
            {
                OnException?.Invoke(ex);
            }

            
        }
    }
    

    
    public class MeetingDataRowItem
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
//    {
//  RESOURCE_MANAGER_SEQ: 46022,
//  RESOURCE_FCATE_NAME: '회의실',
//  RESOURCE_FCATE_SEQ: 225,
//  RESOURCE_SCATE_NAME: '3층 문화강좌실',
//  RESOURCE_SCATE_SEQ: 208,
//  REGUSER_ID: 'CSJ0506',
//  REGUSER_NAME: '채수지',
//  REGUSER_GCODE: '53102880000',
//  REGUSER_GNAME: '공원관리과',
//  STARTDATE: 2023-05-24T23:00:00.000Z,
//  ENDDATE: 2023-05-25T10:00:00.000Z,
//  CONTENTS: ' ',
//  APPROVAL: '02',
//  TITLE: '기간제 근로자 채용 교육',
//  REG_DATE: 2023-04-28T02:02:56.000Z,
//  PHONE_NUMBER: '749-8755',
//  RESOURCE_GROUP_SEQ: 17379,
//  REPEAT: '00',
//  BECAUSE: null,
//  FILE_USE: null,
//  REPEAT_STARTDATE: 2023-05-24T15:00:00.000Z,
//  REPEAT_ENDDATE: 2023-05-24T15:00:00.000Z
//}
}
