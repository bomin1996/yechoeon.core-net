using ImportOracleInsaDBService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.ServiceInterface.InsaDB;
using System.Security.Claims;

namespace SmartGuideSystem.NewAdmin.Controllers
{
    [Authorize]
    [Route("api/manage-server")]
    [ApiController]
    public class ManageServerController : ControllerBase
    {
        private readonly SGSDataContext _dataContext;
        //private readonly SGSOragcleDataContext _oracleDataContext;
        private readonly IConfiguration _config;
        private readonly ILogger<ManageServerController> _logger;
        private readonly OracleInsaDBImporter _oracleInsaDBImporter;
        private readonly IInsaDBService _insaDBService;

        //public ManageServerController(SGSDataContext dataContext, ILogger<ManageServerController> logger, SGSOragcleDataContext oracleDataContext, IConfiguration config)
        public ManageServerController(SGSDataContext dataContext, ILogger<ManageServerController> logger, IInsaDBService insaDBService, IConfiguration config)
        {
            _dataContext = dataContext;
            _logger = logger;
            //_oracleDataContext = oracleDataContext;
            _config = config;

            //Importer
            _insaDBService = insaDBService;
        }

        //전체부서업데이트
        //[Authorize(Roles = "SystemAdmin, Admin")]
        //[HttpPost("import-departments-users")]
        //public IActionResult PostImportDepartmentsAndUsersFromOracle()
        //{
        //    try
        //    {
        //        var sGSDbUpdator = new SgsUserUpdator(_oracleDataContext, _dataContext);
        //        sGSDbUpdator.OnException = (exe) =>
        //        {
        //            _logger?.LogError(exe, "Updator");
        //        };
        //        sGSDbUpdator.OnInformation = (msg) =>
        //        {
        //            _logger?.LogInformation(msg);
        //        };

        //        var updatorConfig = new UpdatorConfig();
        //        _config.GetSection("Updator").Bind(updatorConfig);


        //        var sshConfig = updatorConfig.SSHConfig;
        //        //부서 쿼리 
        //        var queryUpdateDept = sGSDbUpdator.UpdateSGDepartment();
        //        //유저 쿼리 
        //        var queryUpdateUserList = sGSDbUpdator.UpdateSGUser();
        //        _logger?.LogInformation("Query All UserCount " + $"{queryUpdateUserList?.Count()}");
        //        //다운로드 
        //        var downloadedList = sGSDbUpdator.DownloadUserFile(sshConfig.Host, sshConfig.Port, sshConfig.UserName, sshConfig.Password, sshConfig.PhotoServerPath, sshConfig.PhotoDownloadPath, queryUpdateUserList);
        //        _logger?.LogInformation("UserCount " + $"{downloadedList?.Count()}");

        //        //변환 
        //        var SucessImageChagneUserList = sGSDbUpdator.ConvertJpgToWebp(downloadedList, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);

        //        _logger?.LogInformation("SucessImageChagneUserList " + $"{SucessImageChagneUserList?.Count()}");

        //        _logger?.LogInformation("Complete All ");
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger?.LogError(ex, "In BackgroundQueue");
        //    }

        //    return Ok();
        //}
        [Authorize(Roles = "SystemAdmin, Admin")]
        [HttpPost("import-departments-users")]
        public IActionResult PostImportDepartmentsAndUsersFromOracle()
        {
            //_oracleInsaDBImporter.ImportAllDepartmentsAndAllUsers();

            _insaDBService.ImportAllDepartmentsAndAllUsers(new InsaDBUpdateOption { UpdateUserPhoto = true});

            return Ok();
        }


        //특정부서만업데이트
        //[Authorize(Roles = "SystemAdmin, Admin, DepartManager")]
        //[HttpPost("update-users-by-deptcode/{deptCode}")]
        //public IActionResult PostUpdateUsersByDeptCode(string deptCode)
        //{
        //    var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
        //    var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
        //    var userDeptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

        //    if (role == "DepartManager" && userDeptCode != deptCode)
        //    {
        //        return Unauthorized();
        //    }

        //    using var transaction = _dataContext.Database.BeginTransaction();

        //    List<SGUser> newUserList = new List<SGUser>();
        //    List<SGUser> changeDeptUserList = new List<SGUser>();
        //    List<SGUser> removedUserList = new List<SGUser>();
        //    List<SGUser> updatedUserList = new List<SGUser>();
        //    List<SGUser> noUpdatedUserList = new List<SGUser>();

        //    List<CMMTNUSER> oracleList = new List<CMMTNUSER>();
        //    try
        //    {
        //        var sgsDbUpdator = new SgsUserUpdator(_oracleDataContext, _dataContext);
                
        //        sgsDbUpdator.OnException = (exe) =>
        //        {
        //            _logger?.LogError(exe, "Updator");
        //        };
        //        sgsDbUpdator.OnInformation = (msg) =>
        //        {
        //            _logger?.LogInformation(msg);
        //        };

                

        //        var updatorConfig = new UpdatorConfig();
        //        _config.GetSection("Updator").Bind(updatorConfig);
        //        var sshConfig = updatorConfig.SSHConfig;


        //        //1. 오라클 DB에서 부서 유저 정보를 가져온다. 사용안함 휴직 다 포함해서 가져온다.
        //        var oracleUserList = _oracleDataContext.GetCMMTNUserByDeptCode(deptCode);
        //        oracleList.AddRange(oracleUserList);
        //        var sgsUserList = _dataContext.Users
        //            .Where(u => u.DeptCode == deptCode) // CreateType != "SGS" 수동추가 제외
        //            .Where(u => u.CreateType != "SGS")
        //            .ToList();



        //        oracleUserList.ForEach(oracleUser =>
        //        {
        //            var existUser = sgsUserList.FirstOrDefault(sgsUser => sgsUser.Sid == oracleUser.USR_SID);
        //            if (existUser != null)
        //            {
        //                if (oracleUser.USE_YN != "1" ||
        //                (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == true)
        //                {
        //                    removedUserList.Add(existUser);
        //                    existUser.UseYn = false;
        //                }
        //                else if (existUser.UpdateDateTime == null || existUser.UpdateDateTime.CompareTo(oracleUser.MOD_DT) < 0)
        //                {
        //                    var updatedUser = oracleUser.UpdateToSGUser(existUser);
        //                    updatedUserList.Add(updatedUser);
        //                }
        //                else
        //                {
        //                    noUpdatedUserList.Add(existUser);
        //                }

        //                sgsUserList.Remove(existUser);
        //            }
        //            else if (oracleUser.USE_YN == "1" && 
        //                (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == false )
        //            {
        //                newUserList.Add(oracleUser.ConvertToSGUser());
        //            } 
        //            else // 휴직 / 사용하지 않는 계정들
        //            {

        //            }
        //        });
                
        //        // 위에서 안걸러진 유저들은 다른팀으로 이동되었다.
        //        changeDeptUserList.AddRange(sgsUserList);

        //        changeDeptUserList.ForEach(changeDeptUser =>
        //        {
        //            var oracleUser = _oracleDataContext.Cmmtnusers
        //                .FirstOrDefault(x => x.USR_ID == changeDeptUser.Sid);

        //            if (oracleUser != null && oracleUser.USE_YN == "1" &&
        //                (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == false)
        //            {
        //                var updatedUser = oracleUser.UpdateToSGUser(changeDeptUser);
        //                updatedUserList.Add(updatedUser);
        //            } 
        //        });


        //        // insert New UserList
        //        _dataContext.Users.AddRange(newUserList);
        //        _dataContext.Users.UpdateRange(updatedUserList);
        //        _dataContext.Users.RemoveRange(removedUserList);

        //        _dataContext.SaveChanges();


        //        transaction.Commit();


        //        newUserList.ForEach(newUser => {


        //            //string sshPhotoPath = newUser.SearchFilter3;
        //            //SSH 다운로드 
        //            // download image file 
        //            // var result = DownloadFile(srcPath, dstPath);



        //            var isSecessSSHDonwload = sgsDbUpdator.DownloadUserProfilePhotoBySGUser(sshConfig.Host, sshConfig.Port, sshConfig.UserName, sshConfig.Password, 
        //                sshConfig.PhotoServerPath, sshConfig.PhotoDownloadPath, newUser);
        //            if (isSecessSSHDonwload)
        //            {
        //                //유효한 URL 폴더로 이동 시킨 후 Webp Convert 
        //                //실패하면 유효한 URL로 Jpg 이동 시킴 
        //                var isConveredWebp = sgsDbUpdator.ConvertProfilePhotoImage(newUser, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);
        //                if (isConveredWebp)
        //                {
        //                    _logger?.LogInformation($"Photo Update 성공  아이디 : ${newUser.Sid} , 이름 : ${newUser.Name}");
        //                }
        //            }
        //        });

        //        _dataContext.Users.UpdateRange(newUserList);
        //        _dataContext.SaveChanges();

        //        ////2. SGUser DB에  추가 하거나 업데이트 한다. 
        //        //oracleUserList.ForEach(orguser =>
        //        //{
        //        //    SGUser updatedOrAddedUser = null; 
        //        //    var existUser = _dataContext.Users.FirstOrDefault(d => d.Sid == orguser.USR_SID);
        //        //    if (existUser == null)
        //        //    {
        //        //        //신규
        //        //        var addeduser = orguser.ConvertToSGUser();
        //        //        _dataContext.Users.Add(addeduser);
        //        //        updatedOrAddedUser = addeduser;
        //        //    }
        //        //    else if (existUser.UpdateDateTime == null || existUser.UpdateDateTime.CompareTo(orguser.MOD_DT) < 0)
        //        //    {
        //        //        //MOD_DT를 보고 Updatetime보다 빠르면 업데이트 한다. 
        //        //        var updatedUser = orguser.UpdateToSGUser(existUser);
        //        //        _dataContext.Users.Update(updatedUser);
        //        //        updatedOrAddedUser = updatedUser;
        //        //    }
        //        //    else
        //        //    {
        //        //        //아무것도 하지 않음. 
        //        //    }

        //        //    if (updatedOrAddedUser != null) 
        //        //    {
        //        //        //SSH 다운로드 
        //        //        var isSecessSSHDonwload = sgsDbUpdator.DownloadUserProfilePhotoBySGUser(sshConfig, updatedOrAddedUser);
        //        //        if (isSecessSSHDonwload)
        //        //        {
        //        //            //유효한 URL 폴더로 이동 시킨 후 Webp Convert 
        //        //            //실패하면 유효한 URL로 Jpg 이동 시킴 
        //        //            var isConveredWebp = sgsDbUpdator.ConvertProfilePhotoImage(updatedOrAddedUser, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);
        //        //            if (isConveredWebp)
        //        //            {
        //        //                _logger?.LogInformation($"Photo Update 실패  아이디 : ${updatedOrAddedUser.Sid} , 이름 : ${updatedOrAddedUser.Name}");
        //        //            }
        //        //        }
        //        //    }

        //        //    _dataContext.SaveChanges();
        //        //});
        //        _logger?.LogInformation("Complete All ");

        //    }
        //    catch (Exception ex)
        //    {
        //        _logger?.LogError(ex, "In BackgroundQueue");
        //    }
        //    return Ok(newUserList);
        //}

        [Authorize(Roles = "SystemAdmin, Admin, DepartManager")]
        [HttpPost("update-users-by-deptcode/{deptCode}")]
        public IActionResult PostUpdateUsersByDeptCode(string deptCode)
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var userDeptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role == "DepartManager" && userDeptCode != deptCode)
            {
                return Unauthorized();
            }

            List<SGUser> newUserList = _insaDBService.UpdateUsersByDeptCode(deptCode, new InsaDBUpdateOption { UpdateUserPhoto = true });
           
            return Ok(newUserList);
        }

        [HttpGet("signage-info")]
        public IActionResult GetSignageInfo()
        {
            var role = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value;
            var modifier = this.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var deptCode = this.HttpContext.User.Claims.First(c => c.Type == "DeptCode").Value;

            if (role != "SystemAdmin" && role != "Admin")
            {
                var loginUser = _dataContext.LoginUsers.FirstOrDefault(u => u.LoginId == modifier);

                if (loginUser == null || loginUser.ExtraSettings == null || loginUser.ExtraSettings.UseMenus == null || !loginUser.ExtraSettings.UseMenus.Contains("Signage") )
                {
                    return Unauthorized("권한이 없습니다.");
                }
            }

            var con = _config["Signage"];
            var session = _config.GetSection("Signage");

            return Ok(new { Src = session["Src"], Style = session["Style"] });
        }

        //[HttpPost("council-settings")]
        //public async Task<IActionResult> PostCouncilSettings([FromForm]  IFormFile? file, [FromForm] string greeting, [FromForm] string profile, [FromForm] string arrange, [FromForm] string chairmanId)
        //{
        //    string imageUrl = "";

        //    if (file != null && file.Length > 0)
        //    {
        //        var session = _config.GetSection("Image");
        //        var savePath = session?["SavePath"] ?? "";

        //        long size = file.Length;
        //        string extension = System.IO.Path.GetExtension(file.FileName);
        //        var guid = Guid.NewGuid();
        //        var filePath = System.IO.Path.Combine(savePath, guid.ToString() + extension);

        //        using (var stream = System.IO.File.Create(filePath))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        imageUrl = "serverimages/" + Path.GetFileName(filePath);
        //    }



        //    //var ids = JsonSerializer.Deserialize<string[]>(arrange) ?? new string[0];



            

        //    var config = _dataContext.AdminConfigs.FirstOrDefault(r => r.Name == "Council");
        //    if (config == null || config.Config == null)
        //    {
        //        JsonObject json = new JsonObject();
        //        json.Add("greeting", greeting);
        //        json.Add("profile", profile);
        //        json.Add("memberIds", JsonArray.Parse(arrange));
        //        json.Add("chairmanId", chairmanId);
        //        if (!string.IsNullOrEmpty(imageUrl))
        //        {
        //            json.Add("profileImageUrl", imageUrl);
        //        }

        //        config = new DB.Model.SGAdminConfig
        //        {
        //            Name = "Council",
        //            ModifiedTime = DateTime.UtcNow,
        //            Modifier = "Admin",
        //            Config = json
        //        };
        //        _dataContext.AdminConfigs.Add(config);
        //    }
        //    else 
        //    {
        //        config.Config["greeting"] = greeting;
        //        config.Config["profile"] = profile;
        //        config.Config["memberIds"] = JsonArray.Parse(arrange);
        //        config.Config["chairmanId"] = chairmanId;

        //        if (!string.IsNullOrEmpty(imageUrl))
        //        {
        //            config.Config["profileImageUrl"] = imageUrl;
        //        }

        //        _dataContext.AdminConfigs.Update(config);
        //    }

            
        //    _dataContext.SaveChanges();
        //    return Ok();
        //}

        //[HttpGet("council-settings")]
        //public async Task<IActionResult> GetCouncilSettings()
        //{
        //    var members = await _dataContext.Users
        //              .Where(user => user.DeptCode == "99999999999")
        //              .OrderBy(user => user.Name)
        //              .ToArrayAsync();

        //    //sGCouncilConfigJson.Add("members", JsonSerializer.SerializeToNode(members));

        //    var config = _dataContext.AdminConfigs.FirstOrDefault(r => r.Name == "Council");
        //    if (config == null || config.Config == null)
        //    {
        //        //JsonObject json = new JsonObject()
        //        //json.Add("greeting", "");
        //        //json.Add("profile", "");
        //        //json.Add("memberIds", new JsonArray());
        //        //http://localhost:44463/serverimages/04bbe762-05aa-436a-a8c1-b84efed66964.webp

        //        SGCouncilConfigJson json = new SGCouncilConfigJson();
        //        var jsonDoc = JsonSerializer.SerializeToDocument(json);

        //        return Ok(json);
        //    }
        //    else
        //    {
        //        string json = config.Config.ToString();
        //        var cc = JsonSerializer.Deserialize<SGCouncilConfigJson>(json);

        //        return Ok(config.Config);
        //    }
        //}
    }

    
}
