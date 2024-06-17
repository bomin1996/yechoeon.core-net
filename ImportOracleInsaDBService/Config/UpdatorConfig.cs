using SSHDownloader;

namespace ImportOracleInsaDBService.Config
{
    public class UpdatorConfig
    {
      
        public int UpdateInterval { get; set; }
        public int UpdateGosiInterval { get; set; }
        public string GosiImagePath { get; set; }
 

        public SSHDownloadConfig SSHConfig { get; set; }
    }

    public class SSHDownloadConfig
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
