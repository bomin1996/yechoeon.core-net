using FFMpegCore;
using FFMpegCore.Enums;
using FFMpegCore.Pipes;
using HanChosung;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotifyKioskServer;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.JSON;
using System.Security.Claims;

namespace SmartGuideSystem.Admin.Controllers
{
    [Authorize]
    [Route("api/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        const long LIMIT_UPLOAD_VIDEOFILE_SIZE = 10L * 1024L * 1024L * 1024L; //10GB
        //const long LIMIT_UPLOAD_VIDEOFILE_SIZE = 500L * 1024L * 1024L; //500MB

        private readonly SGSDataContext _dataContext;
        private readonly ILogger<ContentController> _logger;
        private readonly IConfiguration _config;
        private readonly string? _contentFilePath;
        private readonly KioskService _kioskService;
        public ContentController(SGSDataContext dataContext, ILogger<ContentController> logger, IConfiguration config, KioskService kioskService)
        {
            _dataContext = dataContext;
            _logger = logger;
            _config = config;
            _contentFilePath = config.GetSection("Content").GetValue<string>("Path");
            _kioskService = kioskService;
        }

        [HttpGet("{category}")]
        public async Task<IEnumerable<SGContent>> Get(string category)
        {
            var result = await _dataContext.Contents.Where(c => c.Category1 == category && c.UseYn ).OrderBy(c => c.CreatedTime).ToArrayAsync();
            return result;
        }

        [HttpDelete("{id}")]
        public bool DeleteContent(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            var content = _dataContext.Contents.FirstOrDefault(o => o.Id == id);

            if (content == null)
            {
                return false;
            }

            if (role == "DepartManager")
            {
                
            }

            //_dataContext.Contents.Remove(content);
            //return _dataContext.SaveChanges() == 1;

            // 지우지 않고 UseYN = false;

            content.UseYn = false;
            _dataContext.Contents.Update(content);
            return _dataContext.SaveChanges() == 1;
        }
 

        [HttpGet("layouts")]
        //public async Task<IEnumerable<SGContentLayoutJson>> GetLayouts()
        //{
        //    var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
        //    var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;

        //    if (role == "SystemAdmin" || role == "Admin")
        //    {
        //        var result = await _dataContext.ContentLayouts
        //            .OrderBy(sc => sc.Name)
        //            .Select(layout => layout.ToContentLayoutJson())
        //            .ToArrayAsync();

        //        return result;
        //    }
        //    else
        //    {
        //        var result = await _dataContext.ContentLayouts
        //            .Where(o => o.Category1 == deptName)
        //            .OrderBy(sc => sc.Name)
        //            .Select(layout => layout.ToContentLayoutJson())
        //            .ToArrayAsync();

        //        return result;
        //    }
        //}

        public async Task<IActionResult> GetLayouts()
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;


            if (role == "SystemAdmin" || role == "Admin")
            {
                var result = await _dataContext.ContentLayouts
                    .OrderBy(sc => sc.Name)
                    .Select(layout => layout.ToContentLayoutJson())
                    .ToArrayAsync();

                return Ok(result);
            }
            else
            {
                var result = await _dataContext.ContentLayouts
                    .Where(o => o.Category1 == deptName)
                    .OrderBy(sc => sc.Name)
                    .Select(layout => layout.ToContentLayoutJson())
                    .ToArrayAsync();

                return Ok(result);
            }
        }

        [HttpPost("layouts")]
        public async Task<IActionResult> PostLayout(SGContentLayoutJson layoutJson)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            SGContentLayout contentLayout = new SGContentLayout
            {
                Id = layoutJson.Id,
                UseYn = true,
                Name = layoutJson.Name,
                Desc = layoutJson.Desc,
                SearchFilter1 = FindSearchFilter.ChosungDivider(layoutJson.Name),
                ModifiedTime = DateTime.UtcNow,
                Modifier = modifier,
                Category1 = layoutJson.Category1,
                GroupName = layoutJson.Category1,
                ContentLayoutJson = layoutJson,
            };

            _dataContext.ContentLayouts.Update(contentLayout);
            var addedCnt = await _dataContext.SaveChangesAsync();

            if (addedCnt > 0)
            {
                await _kioskService.UpdateDevicesForKioskType(Common.Defines.KioskType.GangseoGosiNotice, "Updated!!");
                //await _kioskService.UpdateDevicesForKioskType(Common.Defines.KioskType.Signage, "Updated!!");

                //if (deviceInfo.ExtraSettings?.ContentLayoutOption is not null)
                //{
                //    var contentLayout = await _dbContext.ContentLayouts
                //        .FirstOrDefaultAsync(map => map.Id == deviceInfo.ExtraSettings.ContentLayoutOption.id);
                //    return contentLayout?.ToContentLayoutJson() ?? null;
                //}

                var signageList = await _dataContext.Devices
                    .Where((di) => di.KioskType == nameof(KioskType.Signage))
                    .ToListAsync();

                var targets = signageList.Where(sd => sd.ExtraSettings?.ContentLayoutOption != null && sd.ExtraSettings.ContentLayoutOption.id == contentLayout.Id);
                foreach (var target in targets)
                {
                    await _kioskService.UpdateDevice(target.DeviceId, "Updated!!");
                }
                

                return Ok(contentLayout.ToContentLayoutJson());
            }
            else
            {
                return Problem("");
            }
        }
        [HttpDelete("layouts/{id}")]
        public bool DeleteContentLayout(int id)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptName = this.HttpContext.User.Claims.First(c => c.Type == "DeptName").Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            var layout = _dataContext.ContentLayouts.FirstOrDefault(o => o.Id == id);

            if (layout == null)
            {
                return false;
            }

            _dataContext.ContentLayouts.Remove(layout);
            return _dataContext.SaveChanges() == 1;
        }

        [HttpPost]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_contentFilePath, guid.ToString() + extension);

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

            var tempDir = Path.Combine(_contentFilePath, "TempImages");

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


        [RequestSizeLimit(LIMIT_UPLOAD_VIDEOFILE_SIZE)] //10GB
        [RequestFormLimits(MultipartBodyLengthLimit = LIMIT_UPLOAD_VIDEOFILE_SIZE)] //10GB
        [HttpPost("videos")]
        public async Task<IActionResult> OnPostUploadVideoAsync(IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);

            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_contentFilePath, guid.ToString() + extension);

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



        [RequestSizeLimit(LIMIT_UPLOAD_VIDEOFILE_SIZE)] 
        [RequestFormLimits(MultipartBodyLengthLimit = LIMIT_UPLOAD_VIDEOFILE_SIZE)] 
        [HttpPost("uploadcontent/{category}")]
        public async Task<IActionResult> OnPostUploadContentAsync(string category, IFormFile file)
        {
            long size = file.Length;
            string extension = System.IO.Path.GetExtension(file.FileName);
            string name = System.IO.Path.GetFileNameWithoutExtension(file.FileName);
            string folderName = DateTime.Now.ToString("yyyyMM");
            long duration = 0;
            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_contentFilePath, folderName, guid.ToString() + extension);
            int contentWidth = 0;
            int contentHeight = 0;
            System.IO.Directory.CreateDirectory(System.IO.Path.Combine(_contentFilePath, folderName));
            var thumbnailPath = System.IO.Path.ChangeExtension(filePath, ".png");
            if (file.Length > 0)
            {
                if (extension.ToUpper() == ".MP4")
                {
                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(stream);
                    }
                    try
                    {
                        await FFMpeg.SnapshotAsync(filePath, thumbnailPath, new System.Drawing.Size(640, -1), captureTime: TimeSpan.FromSeconds(3), streamIndex: 0);
                        var mediaInfo = await FFProbe.AnalyseAsync(filePath);
                        duration = Convert.ToInt64(mediaInfo.Duration.TotalMilliseconds);
                        contentWidth = mediaInfo.PrimaryVideoStream.Width;
                        contentHeight = mediaInfo.PrimaryVideoStream.Height;

                    }
                    catch (Exception exex)
                    {
                        _logger.LogError(exex, "FFMpeg Snapshot Error");
                    }


                }
                else if (extension.ToUpper() == ".JPG" || extension.ToUpper() == ".PNG" ||
                    extension.ToUpper() == ".WEBP" || extension.ToUpper() == ".JPEG" || 
                    extension.ToUpper() == ".BMP" || extension.ToUpper() == ".GIF")
                {
                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(stream);
                    }

                    thumbnailPath = System.IO.Path.ChangeExtension(filePath, ".webp");
                    WebpConverter.ConvertWebpImageHelper.ConvertImageToWebp(filePath, thumbnailPath);
                    var infoTable = WebpConverter.ConvertWebpImageHelper.GetImageInfoTable(filePath);
                    if (infoTable.ContainsKey("Width"))
                    {
                        contentWidth = (int)infoTable["Width"];
                    }
                    if (infoTable.ContainsKey("Height"))
                    {
                        contentHeight = (int)infoTable["Height"];
                    }
                }
                else
                {
                    return BadRequest("Not support video format");

                }




            }
            else
            {
                throw new NotSupportedException();
            }

            string urlPath = System.IO.Path.Combine("content", folderName, guid.ToString() + extension);
            string thumbnailUrlPath = System.IO.Path.Combine("content", folderName, guid.ToString() + System.IO.Path.GetExtension(thumbnailPath));
            var content = new SGContent
            {
                ContentType = extension.ToLower() == ".mp4" ? "video" : "image",
                Url = urlPath.Replace('\\', '/'),
                Name = name,
                UploadFileName = file.FileName,
                Thumbnail = thumbnailUrlPath.Replace('\\', '/'),
                Duration = duration,
                GroupName = category,
                Category1 = category,
                CreatedTime = DateTime.UtcNow,
                Size = size,
                Width = contentWidth,
                Height = contentHeight,
                UseYn = true,
            };

            _dataContext.Contents.Add(content);
            await _dataContext.SaveChangesAsync();
            

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(content);
        }
    }


}
