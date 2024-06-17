using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly ILogger<ImagesController> _logger;
        private readonly ImageOptions _snapshotOptions;
        public ImagesController(ILogger<ImagesController> logger, IOptionsSnapshot<ImageOptions> snapshotOptionsAccessor)
        {
            _logger = logger;
            _snapshotOptions = snapshotOptionsAccessor.Value;
        }

        [HttpPost]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_snapshotOptions.SavePath, guid.ToString() + extension);

            if (file.Length > 0)
            {
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { path = System.IO.Path.GetFileName(filePath), size });
        }

        [HttpPost("temp")]
        public async Task<IActionResult> OnPostUploadTempAsync(IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var tempDir = Path.Combine(_snapshotOptions.SavePath, "TempImages");

            var guid = Guid.NewGuid();
            var dateDir = DateTime.Now.ToString("yyyyMM");

            var filePath = System.IO.Path.Combine(tempDir, dateDir, guid.ToString() + extension);

            if (file.Length > 0)
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }

            var TempPath = Path.Combine("TempImages", dateDir, Path.GetFileName(filePath));
            //var TempPath =$"TempImages/{dateDir}/{Path.GetFileName(filePath)}";

            return Ok(new { path = TempPath, size });
        }

        [RequestSizeLimit(10L * 1024L * 1024L * 1024L)]
        [RequestFormLimits(MultipartBodyLengthLimit = 10L * 1024L * 1024L * 1024L)]
        [HttpPost("videos")]
        public async Task<IActionResult> OnPostUploadVideoAsync(IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_snapshotOptions.SavePath, guid.ToString() + extension);

            if (file.Length > 0)
            {
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { path = System.IO.Path.GetFileName(filePath), size });
        }





        [HttpPost("long-running-task")]
        public async Task<ActionResult> Run()
        {
            Response.StatusCode = 200;
            Response.ContentType = "text/event-stream";
            Response.ContentLength = 30;

            var sw = new StreamWriter(Response.Body);

            for (var i = 0; i < 30; i++)
            {
                await Task.Delay(1000);
                await sw.WriteAsync("1");
                await sw.FlushAsync();
            }
            return Ok();
        }
    }

    public class ImageOptions
    {
        public const string SessionName = "Image";

        public string SavePath { get; set; } = String.Empty;
    }
}
