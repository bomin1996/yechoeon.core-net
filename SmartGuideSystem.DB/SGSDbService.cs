using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartGuideSystem.DB
{
    public static class SGSDbService
    {
        public static void AddSGSDbService(this IServiceCollection services, IConfiguration configuration)
        {
            // MainDB
            services.AddDbContext<SGSDataContext>(
                context =>
                {
                    context.UseNpgsql(configuration.GetConnectionString("SmartGuideDb"));
                }
            );

        }
    }
}
