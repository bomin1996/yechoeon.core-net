
using GangseoNewNotices;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using SaeolGosiService;
using SmartGuideSystem.DB;
using SmartGuideSystem.Kiosk.BackgroundWorkers;
using SmartGuideSystem.Kiosk.Models;
using SmartGuideSystem.Kiosk.Services;
using SmartGuideSystem.Kiosk.Signalr;
using UiryeongNotice;

namespace SmartGuideSystem.Kiosk
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //builder.Services.AddControllersWithViews();
            builder.Services.AddControllers();

            // SignalR
            builder.Services.AddSingleton<IUserIdProvider, KioskIdProvider>();
            builder.Services.AddSingleton<DeviceStatusService>();
            builder.Services.AddSignalR();

            // MainDB
            builder.Services.AddDbContext<SGSDataContext>(
                context =>
                {
                    context.UseNpgsql(builder.Configuration.GetConnectionString("SmartGuideDb"));
                }
            );

            builder.Services.AddHttpClient();
            builder.Services.AddWindowsService();


            builder.Services.AddSingleton<WeatherAndAirService>();
            builder.Services.AddHostedService<WeatherWorkerService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddMemoryCache();

            

            var app = builder.Build();

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();
            // React Image가 개발환경에서 public path를 접근할 수  없어 설정
            var cacheMaxAgeOneWeek = (60 * 60 * 24 * 7).ToString();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                builder.Configuration.GetSection("Image").GetValue<string>("SavePath")),
                RequestPath = "/serverimages",
            });

            app.UseRouting();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            app.MapFallbackToFile("index.html");
            app.MapHub<DeviceNotificationHub>("/DeviceNotificationHub");
            app.Run();
        }
    }
}