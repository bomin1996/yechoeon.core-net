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

namespace SmartGuideSystem.HwpConverter
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
            try
            {
                services.AddDbContext<SGSDataContext>(
                    context => { context.UseNpgsql(App.Config.GetConnectionString("PgDb")); }
                );
                services.AddSingleton<AutoConService>().AddLogging();
                services.AddSingleton<MainWindow>().AddLogging();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.StackTrace);
            }

        }

        private void OnStartup(object sender, StartupEventArgs e)
        {
            var mainWindow = serviceProvider.GetService<MainWindow>();
            mainWindow.Show();
        }
    }
}
