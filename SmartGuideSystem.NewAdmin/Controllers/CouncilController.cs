using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model.JSON;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/council")]
    [ApiController]
    public class CouncilController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        private readonly IConfiguration _config;
        private readonly ILogger<CouncilController> _logger;

        public CouncilController(SGSDataContext dataContext, ILogger<CouncilController> logger, SGSOragcleDataContext oracleDataContext, IConfiguration config)
        {
            _dataContext = dataContext;
            _logger = logger;
            _config = config;
        }

        [HttpPost("council-settings")]
        public async Task<IActionResult> PostCouncilSettings([FromForm] IFormFile? file, [FromForm] string greeting, [FromForm] string profile, [FromForm] string arrange, [FromForm] string chairmanId)
        {
            string imageUrl = "";

            if (file != null && file.Length > 0)
            {
                var session = _config.GetSection("Image");
                var savePath = session?["SavePath"] ?? "";

                long size = file.Length;
                string extension = System.IO.Path.GetExtension(file.FileName);
                var guid = Guid.NewGuid();
                var filePath = System.IO.Path.Combine(savePath, guid.ToString() + extension);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                imageUrl = "serverimages/" + Path.GetFileName(filePath);
            }



            //var ids = JsonSerializer.Deserialize<string[]>(arrange) ?? new string[0];





            var config = _dataContext.AdminConfigs.FirstOrDefault(r => r.Name == "Council");
            if (config == null || config.Config == null)
            {
                JsonObject json = new JsonObject();
                json.Add("greeting", greeting);
                json.Add("profile", profile);
                json.Add("memberIds", JsonArray.Parse(arrange));
                json.Add("chairmanId", chairmanId);
                if (!string.IsNullOrEmpty(imageUrl))
                {
                    json.Add("profileImageUrl", imageUrl);
                }

                config = new DB.Model.SGAdminConfig
                {
                    Name = "Council",
                    ModifiedTime = DateTime.UtcNow,
                    Modifier = "Admin",
                    Config = json
                };
                _dataContext.AdminConfigs.Add(config);
            }
            else
            {
                config.Config["greeting"] = greeting;
                config.Config["profile"] = profile;
                config.Config["memberIds"] = JsonArray.Parse(arrange);
                config.Config["chairmanId"] = chairmanId;

                if (!string.IsNullOrEmpty(imageUrl))
                {
                    config.Config["profileImageUrl"] = imageUrl;
                }

                _dataContext.AdminConfigs.Update(config);
            }


            _dataContext.SaveChanges();
            return Ok();
        }

        [HttpGet("council-settings")]
        public async Task<IActionResult> GetCouncilSettings()
        {
            var members = await _dataContext.Users
                      .Where(user => user.DeptCode == "99999999999")
                      .OrderBy(user => user.Name)
                      .ToArrayAsync();

            //sGCouncilConfigJson.Add("members", JsonSerializer.SerializeToNode(members));

            var config = _dataContext.AdminConfigs.FirstOrDefault(r => r.Name == "Council");
            if (config == null || config.Config == null)
            {
                //JsonObject json = new JsonObject()
                //json.Add("greeting", "");
                //json.Add("profile", "");
                //json.Add("memberIds", new JsonArray());
                //http://localhost:44463/serverimages/04bbe762-05aa-436a-a8c1-b84efed66964.webp

                SGCouncilConfigJson json = new SGCouncilConfigJson();
                var jsonDoc = JsonSerializer.SerializeToDocument(json);

                return Ok(json);
            }
            else
            {
                string json = config.Config.ToString();
                var cc = JsonSerializer.Deserialize<SGCouncilConfigJson>(json);

                return Ok(config.Config);
            }
        }
    }


    //public class CouncilSettings
    //{
    //    public IFormFile file { get; set; }
    //    public string greeting { get; set; }
    //    public string profile { get; set; }
    //    public string[] arrage { get; set; }
    //}
}
