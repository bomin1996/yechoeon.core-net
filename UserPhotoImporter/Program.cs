// See https://aka.ms/new-console-template for more information
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model;

Console.WriteLine("Hello, World!");

//HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

//builder.Services
//               .AddDbContext<SGSDataContext>(
//               context => context.UseNpgsql(builder.Configuration.GetConnectionString("SmartGuideDb"))
//               );


var configuration = new ConfigurationBuilder()
     .AddJsonFile($"appsettings.json");
var config = configuration.Build();
var connectionString1 = config.GetValue<string>("SGS");
var connectionString2 = config.GetValue<string>("Oracle");
var photoFileDirPath = config.GetValue<string>("ImportInputPath");
var photoSavePath = config.GetValue<string>("ImportOutputPath");


var options1 = new DbContextOptionsBuilder<SGSDataContext>()
    .UseNpgsql(connectionString1)
    .Options;

var options2 = new DbContextOptionsBuilder<SGSOragcleDataContext>()
    .UseOracle(connectionString2, options => options.UseOracleSQLCompatibility("11"))
    .Options;

using var sgsDBCtx = new SGSDataContext(options1);
var userList = await sgsDBCtx.Users.ToListAsync();
var userMapByLoginId = userList.Where(u => !string.IsNullOrEmpty(u.LoginID))
    .ToDictionary(x => x.LoginID, x => x);


var countOfUser = userMapByLoginId.Count();
//userList.ForEach(x => Console.WriteLine($"이름:{x.Name} - LoginId:{x.LoginID} - SId:{x.Sid}"));

using var oracleDBCtx = new SGSOragcleDataContext(options2);

var viewUserList = await oracleDBCtx.Cmmtnv_users.Where(c => c.USE_YN == "1").ToListAsync();
var viewUserMapByLoginId = viewUserList.Where(u => !string.IsNullOrEmpty(u.LOGON_ID) && !string.IsNullOrEmpty(u.USR_SID))
    .ToDictionary(x => x.LOGON_ID, x => x);

var viewUserMapBySId = viewUserList.Where(u => !string.IsNullOrEmpty(u.LOGON_ID) && !string.IsNullOrEmpty(u.USR_SID))
    .ToDictionary(x => x.USR_SID, x => x);

var files = System.IO.Directory.GetFiles(photoFileDirPath);

List<SGUser> updatedUserList = new List<SGUser>();

foreach (var file in files)
{
    var fileNameOnly = Path.GetFileNameWithoutExtension(file);
    if (viewUserMapBySId.TryGetValue(fileNameOnly, out var userBySid))
    {
        if (userMapByLoginId.TryGetValue(userBySid.LOGON_ID, out var userByLoginId))
        {

            var guid = Guid.NewGuid();
            var saveFilePath = System.IO.Path.Combine(photoSavePath, guid.ToString() + ".webp");

            try
            {
                WebpConverter.ConvertWebpImageHelper.ConvertJpgToWebp(file, saveFilePath);
                userByLoginId.Photo = Path.GetFileName(saveFilePath);
                updatedUserList.Add(userByLoginId);
            }
            catch (Exception ex)
            { 
                Console.WriteLine(ex.ToString());

                try
                {
                    var saveFilePath2 = System.IO.Path.Combine(photoSavePath, guid.ToString() + Path.GetExtension(file));
                    File.Copy(file, saveFilePath2, true);
                    userByLoginId.Photo = Path.GetFileName(saveFilePath2);
                    updatedUserList.Add(userByLoginId);
                }
                catch 
                { 
                }
                

            }
        }
    }
}

sgsDBCtx.Users.UpdateRange(updatedUserList);
var updatedCount = await sgsDBCtx.SaveChangesAsync();

Console.WriteLine($"Update User Count:[{updatedUserList.Count}] - DB Updated User Count:[{updatedCount}]");
