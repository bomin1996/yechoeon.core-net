using GangseoNewNotices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using SaeolGosiService;
using SaeolGosiService.Messages;
using SmartGuideSystem.DB;
using SmartGuideSystem.Extra.Services;
using SmartGuideSystem.Kiosk.BackgroundWorkers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// MainDB
builder.Services.AddDbContext<SGSDataContext>(
    context =>
    {
        context.UseNpgsql(builder.Configuration.GetConnectionString("PgDb"));
    }
);

builder.Services.AddDbContext<SGSOragcleDataContext>(
    context =>
    {
        context.UseOracle(builder.Configuration.GetConnectionString("OracleDb"), option =>
        {
            option.UseOracleSQLCompatibility("11");
        });
    }
);

builder.Services.AddMemoryCache();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddHostedService<GosiUpdateBackgroundServices>();
//builder.Services.AddHostedService<GangseoNoticesBackServices>();



//builder.Services.AddTransient<GosiUpdateServices>();

builder.Services.AddSaeolGosiService(builder.Configuration);

builder.Services.AddSwaggerGen();





var app = builder.Build();


app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
