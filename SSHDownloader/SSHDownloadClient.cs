using Renci.SshNet;
using Renci.SshNet.Sftp;
using System.Text;
using static System.Net.WebRequestMethods;

namespace SSHDownloader
{
    public class SSHDownloadClient : IDisposable
    {

        private SftpClient _sftp ; 

        public SSHDownloadClient(string host, int port, string username, string userpassword)
        {
            var encoding = new UTF8Encoding(false);
            int euckrCodePage = 51949;  // euc-kr 코드 번호
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            System.Text.Encoding euckr = System.Text.Encoding.GetEncoding(euckrCodePage);


            _sftp = new SftpClient(host, port, username, userpassword);
            _sftp.ConnectionInfo.Encoding = euckr;
            _sftp.Connect();
        }

        //public SSHDownloadClient(string host, int port, string username, string userpassword)
        //{
        //    Config = new SSHDownloadClientConfig();
        //    Config.Host = host;
        //    Config.Port = port;
        //    Config.UserName = username;
        //    Config.Password = userpassword;

        //    var encoding = new UTF8Encoding(false);
        //    int euckrCodePage = 51949;  // euc-kr 코드 번호
        //    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        //    System.Text.Encoding euckr = System.Text.Encoding.GetEncoding(euckrCodePage);


        //    _sftp = new SftpClient(Config.Host, Config.Port, Config.UserName, Config.Password);
        //    _sftp.ConnectionInfo.Encoding = euckr;
        //    _sftp.Connect();
        //}


        public bool Download(string serverPath, string fileName, FileStream saveFileStream)
        {
            try
            {
                _sftp.ChangeDirectory(serverPath);

                if (_sftp.Exists(serverPath))
                {
                    _sftp.DownloadFile(fileName, saveFileStream);
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }


        public IEnumerable<string> GetDirectory(string serverPath)
        {
            var dir = _sftp.ListDirectory(serverPath);
            var list = dir.Select(sff =>
            {
                return sff.Name;
            });
            return list;
        }

        public void Dispose()
        {

            if (_sftp != null)
            {
                if (_sftp.IsConnected)
                {
                    _sftp.Disconnect();
                }
                _sftp.Dispose();
            }
        }

        ~SSHDownloadClient()
        {
            if (_sftp != null )
            {
                if (_sftp.IsConnected)
                {
                    _sftp.Disconnect();
                }
                _sftp.Dispose();
            }
            
        }
        
    }
}