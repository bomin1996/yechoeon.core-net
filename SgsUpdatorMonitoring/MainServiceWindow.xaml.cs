using HanAutoCon.Services;
using Microsoft.Extensions.DependencyInjection;
using SmartGuideSystem.DB;
using SmartGuideSystem.DBUpdator;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.Extensions.Logging;
using SgsUpdatorMonitoring.Log;
using System.Net.Http;
using System.Net.Http.Headers;
using SgsUpdatorMonitoring.Meeting;


namespace SgsUpdatorMonitoring
{
    /// <summary>
    /// MainServiceWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainServiceWindow : Window
    {
        private readonly SGSOragcleDataContext _orcleDbContext;
        private readonly SGSDataContext _sgsDbContext;
        private readonly AutoConService _autoConService;
        private readonly IServiceProvider _service;
        private System.Windows.Forms.NotifyIcon _trayIcon;
        
        private readonly BackgroundWorker _worker = new BackgroundWorker();
        public ObservableCollection<MessageInfo> MessageList { get; private set; } = new ObservableCollection<MessageInfo>();

        private SSHDownloadClientConfig _sshConfig;
        private string _gosiImagePath;
        private int _updateGosiIntervalMin;
        private int _updateWorkerIntervalMin;

        private int _meetingRoomUpdateMin;

        private const int MAX_LOG_MONITORING_COUNT = 300;

        public MainServiceWindow(ILogger<MainServiceWindow> _logger,IServiceProvider serviceProvider)
        {
            InitializeComponent();

            this.DataContext = this;
            _service = serviceProvider;

        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            TraceManager.AddLog("Window_Loaded");
            _trayIcon = new System.Windows.Forms.NotifyIcon();
            _trayIcon.Icon = new System.Drawing.Icon("./Resource/monitoring.ico");
            _trayIcon.DoubleClick += _trayIcon_DoubleClick;
            _trayIcon.Visible = true;
            _trayIcon.Text = "Sgs Update Monitoring";
            _trayIcon.ContextMenuStrip = new System.Windows.Forms.ContextMenuStrip();
            _trayIcon.ContextMenuStrip.Items.Add("Exit Program", null, OnExitClick);


            var sshConfig = App.Config.GetSection("Updator:SSHConfig");
            _sshConfig = new SSHDownloadClientConfig()
            {
                Host = sshConfig.GetSection("Host").Value,
                UserName = sshConfig.GetSection("UserName").Value,
                Password = sshConfig.GetSection("Password").Value,
                Port = Convert.ToInt32(sshConfig.GetSection("Port").Value),
                PhotoServerPath = sshConfig.GetSection("PhotoServerPath").Value,
                GosiFileDownloadPath = sshConfig.GetSection("GosiFileDownloadPath").Value,
                PhotoDownloadPath = sshConfig.GetSection("PhotoDownloadPath").Value
            };

            _updateWorkerIntervalMin = Convert.ToInt32(App.Config.GetSection("Updator:UpdateWorkerIntervalMin").Value);
            _updateGosiIntervalMin = Convert.ToInt32(App.Config.GetSection("Updator:UpdateGosiIntervalMin").Value);
            _gosiImagePath = App.Config.GetSection("Updator:GosiImagePath").Value;


            _meetingRoomUpdateMin = Convert.ToInt32(App.Config.GetSection("MeetingRoomUpdateMin").Value);

            _worker.DoWork += worker_DoWork;
            _worker.RunWorkerCompleted += worker_RunWorkerCompleted;
            _worker.WorkerSupportsCancellation = true;
            _worker.RunWorkerAsync();

            
        }



        private void OnExitClick(object? sender, EventArgs e)
        {
            TraceManager.AddLog("OnExitClick");
            var result = MessageBox.Show("프로그램을 종료하겠습니까?", "프로그램종료", MessageBoxButton.OKCancel);
            if (result == MessageBoxResult.OK)
            {
                TraceManager.AddLog("Exit");
                if (_worker.IsBusy)
                    _worker.CancelAsync();
                Application.Current.Shutdown();
            }
        }


        bool _isUpdated = false;
        private void worker_DoWork(object sender, DoWorkEventArgs e)
        {
            Thread.Sleep(1000);
            DateTime? lastUpdatedTime = null;
            DateTime? lastMeetingUpdatedTime = null;


            TraceManager.AddLog("worker_DoWork start");
            while (true)
            {
                if (_worker.CancellationPending)
                {
                    e.Cancel = true;  // 작업 취소
                    return;
                }

                if (lastMeetingUpdatedTime == null || (DateTime.Now - lastMeetingUpdatedTime.Value).TotalMinutes > _meetingRoomUpdateMin)
                {
                    //미팅룸 정보 업데이터  
                    AddLoger($"start : {lastMeetingUpdatedTime.ToString()}");
                    UpdateJinjuMeeting();
                    lastMeetingUpdatedTime = DateTime.Now;
                    AddLoger($"end :{lastMeetingUpdatedTime.ToString()}");
                }

                if (_isUpdated)
                {
                    continue;
                }

                if (lastUpdatedTime == null || (DateTime.Now - lastUpdatedTime.Value).TotalMinutes > _updateGosiIntervalMin)
                {
                    try
                    {
                        //오라클 디비 고시공고 업데이터 
                        AddLoger("Start");
                        UpdateSGSDbAndFiles();
                        AddLoger("End");

                        lastUpdatedTime = DateTime.Now;
                        Application.Current?.Dispatcher.Invoke(new Action(() =>
                        {
                            this.txtTime.Text = lastUpdatedTime.ToString();
                        }));
                    }
                    catch (Exception ex)
                    {
                        AddExceptionLoger(ex);
                    }
                }

                Thread.Sleep(1000);
            }
        }

        private void UpdateJinjuMeeting()
        {
            using (var scope = _service.CreateScope())
            {
                var sgDbcontext = scope.ServiceProvider.GetRequiredService<SGSDataContext>();
                var jinjuMeeting = new UpdaterJinjuMeetingData();
                jinjuMeeting.OnException = (exception) =>
                {
                    AddExceptionLoger(exception);
                };

                jinjuMeeting.OnInformation = (msg) =>
                {
                    AddLoger(msg);
                };

                jinjuMeeting.ProcessPath = "meeting\\";
                jinjuMeeting.Update(sgDbcontext);
            }
        }

        private void UpdateSGSDbAndFiles()
        {
            _isUpdated = true;
            using (var scope = _service.CreateScope())
            {
                var sgDbcontext = scope.ServiceProvider.GetRequiredService<SGSDataContext>();
                var oracleContext = scope.ServiceProvider.GetRequiredService<SGSOragcleDataContext>();
                var hanc = scope.ServiceProvider.GetRequiredService<AutoConService>();

                SGSDbUpdator sGSDbUpdator = new SGSDbUpdator(oracleContext, sgDbcontext);
                AddLoger("Create Updator");
                sGSDbUpdator.OnException = (exception) =>
                {
                    AddExceptionLoger(exception);
                };

                sGSDbUpdator.OnInformation = (msg) =>
                {
                    AddLoger(msg);
                };

                //DBupdate완료 
                //var updateFileList = sGSDbUpdator.UpdateGosigonggoGetGosiFile();

                //업데이트 SGGosigongo DB
                var updatedGosiList = sGSDbUpdator.UpdateSGGosigonggo();

                //컨펌 되지 않은 고시 데이터가 있으면  삭제 한다. 
                var removeFileList = sGSDbUpdator.RemoveSGFileAndGosi(updatedGosiList);
                sGSDbUpdator.DeleteGosiFileList(removeFileList, _gosiImagePath);

                //업데이트 된 고시공고 파일 디비인 SGFile을 업데이트 한다. 
                var updateFileList = sGSDbUpdator.UpdateSGFile(updatedGosiList);

                AddLoger("Updator Gosi FileList Count : " + $"{updateFileList.Count()}");

                var downloadedList = sGSDbUpdator.DownloadGosiFile(_sshConfig.Host, _sshConfig.Port, _sshConfig.UserName, _sshConfig.Password, _sshConfig.GosiFileDownloadPath, updateFileList);

                AddLoger("ssh hwp downloadedList Count : " + $"{downloadedList.Count()}");

                sGSDbUpdator.ConvertHwpToImage(hanc, downloadedList, _gosiImagePath);

                AddLoger("ConvertHwpToImage Count : " + $"{downloadedList.Count()}");

                //var failList = sGSDbUpdator.GetFailDownloadListByCurrentGosi();

                //AddLoger("fail FileList : " + $"{failList.Count()}");

                //var failDownloadedList = sGSDbUpdator.DownloadGosiFile(_sshConfig, failList);

                //AddLoger("fail ssh hwp downloadedList Count : " + $"{failDownloadedList.Count()}");
                //sGSDbUpdator.ConvertHwpToImage(hanc, failDownloadedList, _gosiImagePath);

                //AddLoger("fail ConvertHwpToImage Count : " + $"{failDownloadedList.Count()}");


                //6월 2주이후 업데이트
                //var retryList = sGSDbUpdator.RetryGosiFileConvet(_sshConfig, hanc, _gosiImagePath);
                // foreach (var item in retryList)
                // {
                //     AddLoger("RetryGosiFileConvet : " + $"{item.GosiNumber} {item.FileID} {item.FileSeq}");
                // }

            }
            _isUpdated = false;
        }

        private bool RemovePassedDateFile(string filename)
        {
            try
            {
                if (System.IO.File.Exists(filename))
                {
                    System.IO.File.Delete(filename);
                }

                return true;
            }
            catch(Exception ex)
            {
                TraceManager.AddLog(ex.StackTrace);
            }

            return false;
        }

        private void worker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            TraceManager.AddLog("worker_RunWorkerCompleted");
        }

        private void _trayIcon_DoubleClick(object sender, EventArgs e)
        {
            if (this.WindowState == WindowState.Minimized)
            {
                this.WindowState = WindowState.Normal;
            }

            this.Show();
            this.Activate();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            e.Cancel = true;
            this.Hide();
        }


        public void AddLoger(string mes)
        {
            Application.Current.Dispatcher.Invoke(new Action(() =>
            {
                //this.MessageList.Add(MessageInfo.SetMessageInfo(DateTime.Now.ToString(), mes));
                AddMessageList(mes);
            }));

        }

        public void AddExceptionLoger(Exception exception)
        {
            Application.Current.Dispatcher.Invoke(new Action(() =>
            {
                //this.MessageList.Add(MessageInfo.SetMessageInfo(DateTime.Now.ToString(), exception.Message));
                //this.MessageList.Add(MessageInfo.SetMessageInfo(DateTime.Now.ToString(), exception.StackTrace));
                AddMessageList(exception?.StackTrace);
            }));
        }


        public void AddMessageList(string message)
        {           

            this.MessageList.Add(MessageInfo.SetMessageInfo(DateTime.Now.ToString(), message));
            TraceManager.AddLog(message);
            int overCount = this.MessageList.Count - MAX_LOG_MONITORING_COUNT; 
            if(overCount > 0)
            {
                for (int i = 0; i < overCount; i++)
                {
                    MessageList.RemoveAt(0);
                }
            }
        }

        public async Task<bool> UpdateKioskRequest()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7192/");

                HttpContent content = new FormUrlEncodedContent(new[]
                {
                        new KeyValuePair<string, string>("notification", "aaaa"),
                        new KeyValuePair<string, string>("content", "aaaa")
                    });
                content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                
                using (var response = await client.PostAsync("api/KioskInfo/JsonTest", content))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
    }

    public class SSHDownloadClientConfig
    {
        public string Host { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }

        public int Port { get; set; }

        public string PhotoServerPath { get; set; }
        public string GosiFileDownloadPath { get; set; }
        public string PhotoDownloadPath { get; set; }
        public string PhotoConvertPath { get; set; }


    }
}
