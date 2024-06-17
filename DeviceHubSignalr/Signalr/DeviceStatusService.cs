namespace DeviceHubSignalr.Signalr
{
    public class DeviceStatusService
    {

        Dictionary<string, DateTime> _statusDic = new Dictionary<string, DateTime>();

        public IReadOnlyDictionary<string, DateTime> DeviceStatusDic { get {  return _statusDic; } }

        public void UpdateDeviceStatus(string deviceId)
        {
            if (_statusDic.TryAdd(deviceId, DateTime.Now))
            {

            }
            else
            {
                _statusDic[deviceId] = DateTime.Now;    
            }
        }
    }
}
