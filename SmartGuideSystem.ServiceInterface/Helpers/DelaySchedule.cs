using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.ServiceInterface.Helpers
{
    public class DelaySchedule
    {
        public bool FirstTimeForcedUpdate { get; }
        public int Hours24 { get; }
        public int Minutes { get; }

        private DateTime? _lastUpdatedTime;

        public DelaySchedule( int hours24 = -1, int minutes = -1, bool firstTimeForceUpdate = true)
        {
            this.Minutes = minutes;
            this.Hours24= hours24;
            this.FirstTimeForcedUpdate= firstTimeForceUpdate;
        }

        public async Task WaitUpdateTime()
        {
            if (!_lastUpdatedTime.HasValue && FirstTimeForcedUpdate)
            {
                _lastUpdatedTime= DateTime.Now;
                return;
            }

            var now = DateTime.Now;

            await Task.Delay(1000 * 60);

            // 구현중 비로직 미완성
        }
    }
}
