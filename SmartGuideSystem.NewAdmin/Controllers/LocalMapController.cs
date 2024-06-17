using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NotifyKioskServer;
using SmartGuideSystem.Common.Defines;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using System.Security.Claims;
using WebpConverter;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/localmap")]
    [ApiController]
    public class LocalMapController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly ILogger<LocalMapController> _logger;
        private readonly ImageOptions _snapshotOptions;
        public LocalMapController(SGSDataContext dataContext, ILogger<LocalMapController> logger, IOptionsSnapshot<ImageOptions> snapshotOptionsAccessor)
        {
            _dataContext = dataContext;
            _logger = logger;
            _snapshotOptions = snapshotOptionsAccessor.Value;

        }

        [HttpGet]
        public async Task<IEnumerable<SGLocalMap>> Get()
        {
            var result = await _dataContext.LocalMaps.OrderBy(c => c.Name)
                .ToArrayAsync();
            return result;
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPost]
        public async Task<IActionResult> PostLocalMap(SGLocalMap localmap)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            localmap.Modifier = modifier;
            localmap.ModifiedTime = DateTime.UtcNow;

            var name = localmap.Name;
            var AlreadyMap = await _dataContext.LocalMaps.FirstOrDefaultAsync(lm => lm.Name == name);
            if (AlreadyMap != null)
            {
                return BadRequest("이미존재합니다.");
            }

            if (localmap.PhotoDataBase64 != null)
            {
                localmap.Url = await SaveWebpImageFromBase64(localmap.PhotoDataBase64);
            }

            _dataContext.LocalMaps.Add(localmap);
            await _dataContext.SaveChangesAsync();
            return Ok(localmap);
        }

        private async Task<string> SaveWebpImageFromBase64(string photoDataBase64)
        {
            string base64Str = photoDataBase64;
            string extensions = "";
            if (base64Str.StartsWith("data:image/jpeg;base64,"))
            {
                base64Str = base64Str.Replace("data:image/jpeg;base64,", "");
                extensions = ".jpeg";
            }
            else if (base64Str.StartsWith("data:image/png;base64,"))
            {
                base64Str = base64Str.Replace("data:image/png;base64,", "");
                extensions = ".png";
            }
            else if (base64Str.StartsWith("data:image/gif;base64,"))
            {
                base64Str = base64Str.Replace("data:image/gif;base64,", "");
                extensions = ".gif";
            }
            else if (base64Str.StartsWith("data:image/webp;base64,"))
            {
                base64Str = base64Str.Replace("data:image/webp;base64,", "");
                extensions = ".webp";
            }

            var imageData = Convert.FromBase64String(base64Str);
            var tempFilePath = System.IO.Path.GetTempFileName();
            using (var stream = System.IO.File.Create(tempFilePath))
            {
                await stream.WriteAsync(imageData);
            }
            var guid = Guid.NewGuid();
            var filePath = System.IO.Path.Combine(_snapshotOptions.SavePath, "photo", guid.ToString() + ".webp");
            if (extensions == ".webp")
            {
                System.IO.File.Move(tempFilePath, filePath);
            }
            else
            {
                ConvertWebpImageHelper.ConvertImageToWebp(tempFilePath, filePath);
            }
            return Path.GetFileName(filePath);
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPut]
        public async Task<SGLocalMap> PutLocalMap(SGLocalMap localmap)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            localmap.Modifier = modifier;
            localmap.ModifiedTime = DateTime.UtcNow;

            if (localmap.PhotoDataBase64 != null)
            {
                localmap.Url = await SaveWebpImageFromBase64(localmap.PhotoDataBase64);
            }

            _dataContext.LocalMaps.Add(localmap);
            _dataContext.LocalMaps.Update(localmap);
            await _dataContext.SaveChangesAsync();
            return localmap;
        }

        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpDelete("{id}")]
        public async Task DeleteLocalMap(int id)
        {
            _dataContext.LocalMaps.Remove(new SGLocalMap { Id = id });
            await _dataContext.SaveChangesAsync();
            Ok();
        }

  

    }
}
