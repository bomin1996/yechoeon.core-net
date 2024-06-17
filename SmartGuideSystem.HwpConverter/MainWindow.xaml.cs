using HanAutoCon.Services;
using Microsoft.Extensions.DependencyInjection;
using SmartGuideSystem.DB;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Windows;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.HwpConverter.Data;
using HanAutoCon.Utils;
using Microsoft.Win32;
using Microsoft.EntityFrameworkCore;

namespace SmartGuideSystem.HwpConverter
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        enum GosiTimeFormatStyle
        {
            yyyy_MM_dd,
            yyyyMMdd,
        }


        private const int SHOWING_MAX_LOG_COUNT = 300;

        private readonly IServiceProvider _service;
        private readonly ILogger<MainWindow> _logger;
        private System.Windows.Forms.NotifyIcon _trayIcon;

        private readonly BackgroundWorker _worker = new BackgroundWorker();
        public ObservableCollection<LogMessageInfo> WorkerMessageList { get; private set; } = new ObservableCollection<LogMessageInfo>();

        private bool _isUpdated = false;
        private int _updateGosiConvertIntervalMin = 10;
        private string _sourceHwpFolderPath;
        private string _complteGosiFolderPath;

        public MainWindow(ILogger<MainWindow> logger, IServiceProvider serviceProvider)
        {
            InitializeComponent();

            this.DataContext = this;
            _logger = logger;
            _service = serviceProvider;
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            _trayIcon = new System.Windows.Forms.NotifyIcon();
            _trayIcon.Icon = new System.Drawing.Icon("./Resource/monitoring.ico");
            _trayIcon.DoubleClick += _trayIcon_DoubleClick;
            _trayIcon.Visible = true;
            _trayIcon.Text = "Sgs Update Monitoring";
            _trayIcon.ContextMenuStrip = new System.Windows.Forms.ContextMenuStrip();
            _trayIcon.ContextMenuStrip.Items.Add("RegistModule", null, RegistorModule);
            _trayIcon.ContextMenuStrip.Items.Add("Exit Program", null, OnExitClick);


            try
            {
                _updateGosiConvertIntervalMin = Convert.ToInt32(App.Config.GetSection("GosiConvertUpdator:UpdateGosiConvertIntervalMin").Value);
                _complteGosiFolderPath = App.Config.GetSection("GosiConvertUpdator:CompltePath").Value ?? "";
                _sourceHwpFolderPath = App.Config.GetSection("GosiConvertUpdator:SourceHwpFolderPath").Value ?? "";
            }
            catch (Exception ex)
            {

                AddLogger(ex);
            }


            _worker.DoWork += worker_DoWork;
            _worker.RunWorkerCompleted += worker_RunWorkerCompleted;
            _worker.WorkerSupportsCancellation = true;
            _worker.RunWorkerAsync();


            this.btnStart.IsEnabled = false;
            this.btnStop.IsEnabled = false;

        }

        //private void LoadConfig()
        //{
        //    try
        //    {
        //        _updateGosiConvertIntervalMin = Convert.ToInt32(App.Config.GetSection("GosiConvertUpdator:UpdateGosiConvertIntervalMin").Value);
        //        _complteGosiFolderPath = App.Config.GetSection("GosiConvertUpdator:CompltePath").Value ?? "";
        //        _sourceHwpFolderPath = App.Config.GetSection("GosiConvertUpdator:SourceHwpFolderPath").Value ?? "";
        //    }
        //    catch (Exception ex){

        //        AddLogger(ex);
        //    }
        //}

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


        private void Window_Unloaded(object sender, RoutedEventArgs e)
        {

        }



        private void worker_DoWork(object sender, DoWorkEventArgs e)
        {


            Thread.Sleep(1000);
            DateTime? lastUpdatedTime = null;

            Application.Current?.Dispatcher.Invoke(new Action(() =>
            {
                this.AddLogger("Backgournd Woker Started.");
            }));

            while (true)
            {
                if (_worker.CancellationPending)
                {
                    e.Cancel = true;  // 작업 취소

                    Application.Current?.Dispatcher.Invoke(new Action(() =>
                    {
                        this.AddLogger("Backgournd Woker Canceled");
                        this.btnStart.IsEnabled = true;
                        this.btnStop.IsEnabled = false;
                        
                    }));


                    return;
                }
                else
                {
                    Application.Current?.Dispatcher.Invoke(new Action(() =>
                    {
                        this.btnStart.IsEnabled = false;
                        this.btnStop.IsEnabled = true;
                    }));
                }
                

                if (_isUpdated)
                {
                    continue;
                }

                if (lastUpdatedTime == null || (DateTime.Now - lastUpdatedTime.Value).TotalMinutes > _updateGosiConvertIntervalMin)
                {
                    try
                    {
                        //오라클 디비 고시공고 업데이터 
                        AddLogger("Start");
                        DoHwpConvert();
                        AddLogger("End");

                        lastUpdatedTime = DateTime.Now;

                        Application.Current?.Dispatcher.Invoke(new Action(() =>
                        {
                            this.txtTime.Text = lastUpdatedTime.ToString();
                        }));
                    }
                    catch (Exception ex)
                    {
                        AddLogger(ex);
                    }
                }

                Thread.Sleep(1000);
            }
        }


        private void DoHwpConvert()
        {
            _isUpdated = true;
            using (var scope = _service.CreateScope())
            {
                var sgDbcontext = scope.ServiceProvider.GetRequiredService<SGSDataContext>();

                var hanc = scope.ServiceProvider.GetRequiredService<AutoConService>();

                // SSH 다운로드 파일인지 확인 
                var downloadedGosiFileList = sgDbcontext.SGFileInfos.Where(f => f.ProcessStatus == "Downloaded" && f.FailCount < 5).ToList();
                var validGosiFileList = new List<SGFileInfo>();

                // 유효한 날짜의 파일인지 확인 
                downloadedGosiFileList.ForEach(f =>
                {
                    var gosi = sgDbcontext.GosigoggoInfos.FirstOrDefault(g => g.NotAncmtMgtNo == f.NotAncmtMgtNo);
                    if (gosi != null && ValidCurrentDateGosi(gosi, GosiTimeFormatStyle.yyyy_MM_dd))
                    {
                        validGosiFileList.Add(f);
                    }
                });

                foreach (var fileInfo in validGosiFileList)
                {
                    if (ConvertHwpToImage(fileInfo, hanc, _sourceHwpFolderPath, _complteGosiFolderPath))
                    {
                        try
                        {
                            fileInfo.ProcessStatus = "Complete";
                            sgDbcontext.SGFileInfos.Update(fileInfo);

                            var gosi = sgDbcontext.GosigoggoInfos.FirstOrDefault(g => g.NotAncmtMgtNo == fileInfo.NotAncmtMgtNo);
                            gosi.ProcessStatus = "Complete";

                            sgDbcontext.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            AddLogger(ex);
                        }

                        AddLogger("Converted Complete : " + fileInfo.FileID);
                    }
                    else
                    {
                        try
                        {
                            fileInfo.FailCount += 1;
                            sgDbcontext.SGFileInfos.Update(fileInfo);

                            if (fileInfo.FailCount == 5)
                            {
                                var gosi = sgDbcontext.GosigoggoInfos.FirstOrDefault(g => g.NotAncmtMgtNo == fileInfo.NotAncmtMgtNo);
                                gosi.ProcessStatus = "Fail";
                            }
                            
                            sgDbcontext.SaveChanges();
                        }
                        catch (Exception ex)
                        {
                            AddLogger(ex);
                        }

                        AddLogger("Convert Fail : " + fileInfo.FileID);
                    }
                }
                
            }

            _isUpdated = false;
        }


        public bool ConvertHwpToImage(SGFileInfo sgFile, AutoConService hanc, string downloadGosiRootPath, string complteGosiRootPath)
        {
            var dateTimeFolderName = System.IO.Path.GetFileName(sgFile.FilePath);
            if (string.IsNullOrEmpty(dateTimeFolderName)) { return false; }

            var downloadGosiFileFullPath = System.IO.Path.Combine(downloadGosiRootPath, dateTimeFolderName, sgFile.SysFileName);
            var complteGosiPath = System.IO.Path.Combine(complteGosiRootPath, dateTimeFolderName);
            if (System.IO.Directory.Exists(complteGosiPath) == false)
            {
                System.IO.Directory.CreateDirectory(complteGosiPath);
            }

            //1차 JPG파일로 변환 
            var ConvertJpgFilePath = System.IO.Path.Combine(complteGosiPath, Guid.NewGuid().ToString() + ".jpg");
            if (sgFile.FileExt.ToLower() == "hwp" || sgFile.FileExt.ToLower() == "hwpx" || sgFile.FileExt.ToLower() == "pdf")
            {
                var convertedInfo = hanc.ConvertTo(downloadGosiFileFullPath, ConvertJpgFilePath, "JPG");

                if (convertedInfo.DstFilePathList != null)
                {
                    var imgList = convertedInfo.DstFilePathList.ToArray();
                    if (imgList != null && imgList.Length > 0)
                    {
                        sgFile.ImageList = new string[imgList.Length];
                        for (int i = 0; i < imgList.Length; i++)
                        {
                            var webpFolderPath = System.IO.Path.Combine(complteGosiPath + "_webp");
                            if (System.IO.Directory.Exists(webpFolderPath) == false)
                            {
                                System.IO.Directory.CreateDirectory(webpFolderPath);
                            }
                            var webpFileName = System.IO.Path.Combine(webpFolderPath, System.IO.Path.GetFileNameWithoutExtension(imgList[i]) + ".webp");

                            //Webp로 변경
                            ConvertImageHelper.ConvertJpgToWebp(imgList[i], webpFileName);
                            string relativeImagePath = "";
                            if (System.IO.File.Exists(webpFileName))
                            {
                                relativeImagePath = webpFileName.Replace(complteGosiRootPath, "");
                            }
                            else
                            {
                                relativeImagePath = imgList[i].Replace(complteGosiRootPath, "");
                            }
                            sgFile.ImageList[i] = relativeImagePath;
                        }
                    }
                }

                if (convertedInfo.PageTextList != null)
                {
                    sgFile.TTSTextList = convertedInfo.PageTextList.ToArray();
                }
                return true;

            }
            else
            {
                return false;
            }
        }


        private bool ValidCurrentDateGosi(SGGosigonggoInfo gosi, GosiTimeFormatStyle timeFormatStyle)
        {
            //string now = DateTime.Now.ToString("yyyyMMdd");

            //string now = DateTime.Now.ToString("yyyyMMdd"); //진주/의령은 이렇게
            //string now = DateTime.Now.ToString("yyyy-MM-dd"); //강서 // 새올시스템용

            var resultGosiInfoList = new List<SGGosigonggoInfo>();
            //string now = DateTime.Now.ToString("yyyyMMdd"); //진주/의령은 이렇게
            //string now = DateTime.Now.ToString("yyyy-MM-dd"); //강서 // 새올시스템용
            string now;
            switch (timeFormatStyle)
            {
                case GosiTimeFormatStyle.yyyy_MM_dd:
                    now = DateTime.Now.ToString("yyyy-MM-dd");
                    break;
                case GosiTimeFormatStyle.yyyyMMdd:
                default:
                    now = DateTime.Now.ToString("yyyy-MM-dd");
                    break;
            }



            if ((gosi.StartPeriod != null && gosi.StartPeriod.CompareTo(now) <= 0) 
                && (gosi.EndPeriod != null && gosi.EndPeriod.CompareTo(now) >= 0))
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        private void worker_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            TraceManager.AddLog("worker_RunWorkerCompleted");
        }

        private void AddLogger(string mes)
        {
            Application.Current.Dispatcher.Invoke(new Action(() =>
            {
                AddWorkerLogMessages(mes);
            }));
        }

        private void AddLogger(Exception exception)
        {
            Application.Current.Dispatcher.Invoke(new Action(() =>
            {
                AddWorkerLogMessages(exception?.Message);
                AddWorkerLogMessages(exception?.StackTrace);
            }));
        }

        private void AddWorkerLogMessages(string message)
        {

            this.WorkerMessageList.Add(LogMessageInfo.SetMessageInfo(DateTime.Now.ToString(), message));
            TraceManager.AddLog(message);
            int overCount = this.WorkerMessageList.Count - SHOWING_MAX_LOG_COUNT;
            if (overCount > 0)
            {
                for (int i = 0; i < overCount; i++)
                {
                    WorkerMessageList.RemoveAt(0);
                }
            }
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

        private void RegistorModule(object? sender, EventArgs e)
        {
            var dllPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "FilePathCheckerModuleExample.dll");

            RegistryKey hncKey = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Hnc\", true);
            if (hncKey == null)
            {
                MessageBox.Show("Not found hwp");
            }
            //컴퓨터\HKEY_CURRENT_USER\SOFTWARE\Hnc\HwpAutomation
            var autoKey = hncKey.OpenSubKey(@"HwpAutomation", true);
            if (autoKey == null)
            {
                autoKey = hncKey.CreateSubKey("HwpAutomation", true);
            }

            var moduleKey = autoKey.OpenSubKey(@"Modules", true);
            if (moduleKey == null)
            {
                moduleKey = hncKey.CreateSubKey("Modules", true);
            }

            moduleKey.SetValue("MyModule", dllPath);

        }

        
        private void Button_Click_Stop(object sender, RoutedEventArgs e)
        {
            this.btnStart.IsEnabled = false;
            this.btnStop.IsEnabled = false;
            
            _worker.CancelAsync();

            this.AddLogger("Backgournd Woker CancellationPending...");

        }

        private void Button_Click_Start(object sender, RoutedEventArgs e)
        {
            this.btnStart.IsEnabled = false;
            this.btnStop.IsEnabled = false;
            _worker.RunWorkerAsync();

            this.AddLogger("Backgournd Woker Starting...");
        }

        private async void Button_Click_Connect(object sender, RoutedEventArgs e)
        {
            using (var scope = _service.CreateScope())
            {
                var sgDbcontext = scope.ServiceProvider.GetRequiredService<SGSDataContext>();

                var count = await sgDbcontext.GosigoggoInfos.CountAsync();

                MessageBox.Show("Gosi Count :" + count);
            }
        }
        private void Button_Click_QueryGosi(object sender, RoutedEventArgs e)
        {

        }
    }
}
