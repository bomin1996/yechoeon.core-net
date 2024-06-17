using ImportOracleInsaDBService.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.OracleDB.Model;
using SmartGuideSystem.OracleDB.Updator;
using SmartGuideSystem.ServiceInterface.InsaDB;
using SmartGuideSystem.UserUpdator;

namespace ImportOracleInsaDBService
{
    public class OracleInsaDBImporter : IInsaDBService
    {
        private IConfiguration _config;
        private readonly ILogger<OracleInsaDBImporter> _logger;
        //private readonly IHttpClientFactory _httpClientFactory;
        private readonly SGSDataContext _dataContext;
        private readonly SGSOragcleDataContext _oracleDataContext;

        public OracleInsaDBImporter(SGSDataContext dataContext, SGSOragcleDataContext oracleDataContext, IConfiguration configuration, ILogger<OracleInsaDBImporter> logger)
        {
            _logger = logger;
            _dataContext = dataContext;
            _oracleDataContext = oracleDataContext;
            _config = configuration;
        }

        public void ImportAllDepartmentsAndAllUsers(InsaDBUpdateOption option) 
        {
            var sGSDbUpdator = new SgsUserUpdator(_oracleDataContext, _dataContext);
            sGSDbUpdator.OnException = (exe) =>
            {
                _logger?.LogError(exe, "Updator");
            };
            sGSDbUpdator.OnInformation = (msg) =>
            {
                _logger?.LogInformation(msg);
            };

            var updatorConfig = new UpdatorConfig();
            _config.GetSection("Updator").Bind(updatorConfig);


            var sshConfig = updatorConfig.SSHConfig;
            //부서 쿼리 
            var queryUpdateDept = sGSDbUpdator.UpdateSGDepartment();
            //유저 쿼리 
            //var queryUpdateUserList = sGSDbUpdator.UpdateSGUser();
            List<SGUser> queryUpdateUserList = new List<SGUser>();

            if (option.ForcedUpdate)
            {
                queryUpdateUserList = sGSDbUpdator.ForcedUpdateSGUser();
            }
            else
            {
                queryUpdateUserList = sGSDbUpdator.UpdateSGUser();
            }

            if (option.UpdateUserPhoto)
            {
                _logger?.LogInformation("Query All UserCount " + $"{queryUpdateUserList?.Count()}");
                //다운로드 
                var downloadedList = sGSDbUpdator.DownloadUserFile(sshConfig.Host, sshConfig.Port, sshConfig.UserName, sshConfig.Password, sshConfig.PhotoServerPath, sshConfig.PhotoDownloadPath, queryUpdateUserList);
                _logger?.LogInformation("UserCount " + $"{downloadedList?.Count()}");

                //변환 
                var SucessImageChagneUserList = sGSDbUpdator.ConvertJpgToWebp(downloadedList, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);

                _logger?.LogInformation("SucessImageChagneUserList " + $"{SucessImageChagneUserList?.Count()}");
            }

            _logger?.LogInformation("Complete All ");
        }

        public List<SGUser> UpdateUsersByDeptCode(string deptCode, InsaDBUpdateOption option) 
        {
            using var transaction = _dataContext.Database.BeginTransaction();

            List<SGUser> newUserList = new List<SGUser>();
            List<SGUser> changeDeptUserList = new List<SGUser>();
            List<SGUser> removedUserList = new List<SGUser>();
            List<SGUser> updatedUserList = new List<SGUser>();
            List<SGUser> noUpdatedUserList = new List<SGUser>();

            List<CMMTNUSER> oracleList = new List<CMMTNUSER>();
            try
            {
                var sgsDbUpdator = new SgsUserUpdator(_oracleDataContext, _dataContext);

                sgsDbUpdator.OnException = (exe) =>
                {
                    _logger?.LogError(exe, "Updator");
                };
                sgsDbUpdator.OnInformation = (msg) =>
                {
                    _logger?.LogInformation(msg);
                };



                var updatorConfig = new UpdatorConfig();
                _config.GetSection("Updator").Bind(updatorConfig);
                var sshConfig = updatorConfig.SSHConfig;


                //1. 오라클 DB에서 부서 유저 정보를 가져온다. 사용안함 휴직 다 포함해서 가져온다.
                var oracleUserList = _oracleDataContext.GetCMMTNUserByDeptCode(deptCode);
                oracleList.AddRange(oracleUserList);
                var sgsUserList = _dataContext.Users
                    .Where(u => u.DeptCode == deptCode) // CreateType != "SGS" 수동추가 제외
                    .Where(u => u.CreateType != "SGS")
                    .ToList();



                oracleUserList.ForEach(oracleUser =>
                {
                    var existUser = sgsUserList.FirstOrDefault(sgsUser => sgsUser.Sid == oracleUser.USR_SID);
                    if (existUser != null)
                    {
                        if (oracleUser.USE_YN != "1" ||
                        (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == true)
                        {
                            removedUserList.Add(existUser);
                            existUser.UseYn = false;
                        }
                        else if (existUser.UpdateDateTime == null || existUser.UpdateDateTime.CompareTo(oracleUser.MOD_DT) < 0)
                        {
                            var updatedUser = oracleUser.UpdateToSGUser(existUser);
                            updatedUserList.Add(updatedUser);
                        }
                        else
                        {
                            noUpdatedUserList.Add(existUser);
                        }

                        sgsUserList.Remove(existUser);
                    }
                    else if (oracleUser.USE_YN == "1" &&
                        (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == false)
                    {
                        newUserList.Add(oracleUser.ConvertToSGUser());
                    }
                    else // 휴직 / 사용하지 않는 계정들
                    {

                    }
                });

                // 위에서 안걸러진 유저들은 다른팀으로 이동되었다.
                changeDeptUserList.AddRange(sgsUserList);

                changeDeptUserList.ForEach(changeDeptUser =>
                {
                    var oracleUser = _oracleDataContext.Cmmtnusers
                        .FirstOrDefault(x => x.USR_ID == changeDeptUser.Sid);

                    if (oracleUser != null && oracleUser.USE_YN == "1" &&
                        (oracleUser.USR_WORK_STATE_CODE?.StartsWith("D") ?? false) == false)
                    {
                        var updatedUser = oracleUser.UpdateToSGUser(changeDeptUser);
                        updatedUserList.Add(updatedUser);
                    }
                });


                // insert New UserList
                _dataContext.Users.AddRange(newUserList);
                _dataContext.Users.UpdateRange(updatedUserList);
                _dataContext.Users.RemoveRange(removedUserList);

                _dataContext.SaveChanges();


                transaction.Commit();


                newUserList.ForEach(newUser => {


                    //string sshPhotoPath = newUser.SearchFilter3;
                    //SSH 다운로드 
                    // download image file 
                    // var result = DownloadFile(srcPath, dstPath);



                    var isSecessSSHDonwload = sgsDbUpdator.DownloadUserProfilePhotoBySGUser(sshConfig.Host, sshConfig.Port, sshConfig.UserName, sshConfig.Password,
                        sshConfig.PhotoServerPath, sshConfig.PhotoDownloadPath, newUser);
                    if (isSecessSSHDonwload)
                    {
                        //유효한 URL 폴더로 이동 시킨 후 Webp Convert 
                        //실패하면 유효한 URL로 Jpg 이동 시킴 
                        var isConveredWebp = sgsDbUpdator.ConvertProfilePhotoImage(newUser, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);
                        if (isConveredWebp)
                        {
                            _logger?.LogInformation($"Photo Update 성공  아이디 : ${newUser.Sid} , 이름 : ${newUser.Name}");
                        }
                    }
                });

                _dataContext.Users.UpdateRange(newUserList);
                _dataContext.SaveChanges();

                ////2. SGUser DB에  추가 하거나 업데이트 한다. 
                //oracleUserList.ForEach(orguser =>
                //{
                //    SGUser updatedOrAddedUser = null; 
                //    var existUser = _dataContext.Users.FirstOrDefault(d => d.Sid == orguser.USR_SID);
                //    if (existUser == null)
                //    {
                //        //신규
                //        var addeduser = orguser.ConvertToSGUser();
                //        _dataContext.Users.Add(addeduser);
                //        updatedOrAddedUser = addeduser;
                //    }
                //    else if (existUser.UpdateDateTime == null || existUser.UpdateDateTime.CompareTo(orguser.MOD_DT) < 0)
                //    {
                //        //MOD_DT를 보고 Updatetime보다 빠르면 업데이트 한다. 
                //        var updatedUser = orguser.UpdateToSGUser(existUser);
                //        _dataContext.Users.Update(updatedUser);
                //        updatedOrAddedUser = updatedUser;
                //    }
                //    else
                //    {
                //        //아무것도 하지 않음. 
                //    }

                //    if (updatedOrAddedUser != null) 
                //    {
                //        //SSH 다운로드 
                //        var isSecessSSHDonwload = sgsDbUpdator.DownloadUserProfilePhotoBySGUser(sshConfig, updatedOrAddedUser);
                //        if (isSecessSSHDonwload)
                //        {
                //            //유효한 URL 폴더로 이동 시킨 후 Webp Convert 
                //            //실패하면 유효한 URL로 Jpg 이동 시킴 
                //            var isConveredWebp = sgsDbUpdator.ConvertProfilePhotoImage(updatedOrAddedUser, sshConfig.PhotoDownloadPath, sshConfig.PhotoConvertPath);
                //            if (isConveredWebp)
                //            {
                //                _logger?.LogInformation($"Photo Update 실패  아이디 : ${updatedOrAddedUser.Sid} , 이름 : ${updatedOrAddedUser.Name}");
                //            }
                //        }
                //    }

                //    _dataContext.SaveChanges();
                //});
                _logger?.LogInformation("Complete All ");

            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "In BackgroundQueue");
            }

            return newUserList;
        }
    }

    public static class InsaServicesConfiguration
    {
        public static void AddOracleInsaDBImporter(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SGSOragcleDataContext>(
                context =>
                {
                    context.UseOracle(configuration.GetConnectionString("OracleDb"), option =>
                    {
                        option.UseOracleSQLCompatibility("11");
                    });
                }
            );

            services.AddTransient<IInsaDBService, OracleInsaDBImporter>();
            //services.AddHostedService<GangseoNoticesBackServices>();
        }

        //public static void AddAllServices(this IServiceCollection services, IConfiguration configuration)
        //{


        //    services.AddDbContext<SGSOragcleDataContext>(
        //        context =>
        //        {
        //            context.UseOracle(configuration.GetConnectionString("OracleDb"), option =>
        //            {
        //                option.UseOracleSQLCompatibility("11");
        //            });
        //        }
        //    );

        //    //services.AddTransient<IMyService, MyService>();
        //    services.AddHostedService<GangseoNoticesBackServices>();
        //}
    }
}
