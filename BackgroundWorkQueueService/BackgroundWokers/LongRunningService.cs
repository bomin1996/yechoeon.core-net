using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace SmartGuideSystem.Admin.BackgroundWokers
{
    public class LongRunningService : BackgroundService
    {
        private readonly ILogger<LongRunningService> _logger;

        private readonly BackgroundWorkerQueue queue;

        public LongRunningService(BackgroundWorkerQueue queue, ILogger<LongRunningService> logger)
        {
            this.queue = queue;
            this._logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("LongRunningService Started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                var workItem = await queue.DequeueAsync(stoppingToken);
                _logger.LogInformation("Dequeued Item!");
                await workItem(stoppingToken);
            }
        }
    }
}
