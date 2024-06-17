using FFMpegCore;
using ImportOracleInsaDBService;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using NotifyKioskServer;
using SmartGuideSystem.Admin.Helpers;
using SmartGuideSystem.DB;
using SmartGuideSystem.NewAdmin;
using SmartGuideSystem.NewAdmin.Const;
using SmartGuideSystem.NewAdmin.Controllers;
using System.Security.Claims;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services
    .AddDbContext<SGSDataContext>(
    context => context.UseNpgsql(builder.Configuration.GetConnectionString("SmartGuideDb"))
    );

builder.Services.Configure<ImageOptions>(builder.Configuration.GetSection(ImageOptions.SessionName));
builder.Services.AddAuthentication(SGSConst.AUTH_COOKIE_KEY_NAME)
    .AddCookie(SGSConst.AUTH_COOKIE_KEY_NAME, options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
        options.SlidingExpiration = true;
        options.LoginPath = "/Account/Login";
    });

// Add services to the container.
builder.Services.AddNotifyKioskServer(builder.Configuration);
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSwaggerGen();
}
builder.Services.AddWindowsService();
//builder.Services.AddOracleInsaDBImporter(builder.Configuration);

var app = builder.Build();


//Migration DB
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<SGSDataContext>();
    context?.Database.Migrate();
}


// Configure the HTTP request pipeline.
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
    builder.Configuration.GetSection("Image").GetValue<string>("SavePath")),
    RequestPath = "/serverimages"
});


GlobalFFOptions.Configure(options => { options.BinaryFolder = AppDomain.CurrentDomain.BaseDirectory; options.TemporaryFilesFolder = AppDomain.CurrentDomain.BaseDirectory; });

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
//app.UseEndpoints(_ => { });

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapWhen(y => !y.Request.Path.StartsWithSegments("/api"), client =>
    {
        client.UseSpa(x => x.UseProxyToSpaDevelopmentServer("http://127.0.0.1:5173/"));
    });
    
}

app.MapFallbackToFile("index.html");
app.Run();
