using HanAutoCon.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using SmartGuideSystem.DB;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using Microsoft.Extensions.Logging;
using System.Threading;

namespace SgsUpdatorMonitoring
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static IConfiguration Config { get; private set; }
        private ServiceProvider serviceProvider;
        Mutex mutex;
        private static readonly string MutexGlobalKey = "Global\\" + "monitoring_version_key";


        public App()
        {
            mutex = new Mutex(false, MutexGlobalKey);

            if (!mutex.WaitOne(0, false))
            {
                MessageBox.Show("프로세스존재함");
                Application.Current.Shutdown();
                return;
            }


            Config = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

            ServiceCollection services = new ServiceCollection();
            ConfigureServices(services);
            serviceProvider = services.BuildServiceProvider();
        }


        

        private void ConfigureServices(ServiceCollection services)
        {
            services.AddDbContext<SGSOragcleDataContext>(
            context =>
            {
                context.UseOracle(App.Config.GetConnectionString("OracleDb"), option =>
                {
                    option.UseOracleSQLCompatibility("11");
                });
            }
            );

            services.AddDbContext<SGSDataContext>(
                context => { context.UseNpgsql(App.Config.GetConnectionString("PgDb")); }
            );
            services.AddSingleton<AutoConService>().AddLogging();
            services.AddSingleton<MainServiceWindow>().AddLogging();
        }

        private void OnStartup(object sender, StartupEventArgs e)
        {
            var mainWindow = serviceProvider.GetService<MainServiceWindow>();
            mainWindow.Show();
        }
    }
}
