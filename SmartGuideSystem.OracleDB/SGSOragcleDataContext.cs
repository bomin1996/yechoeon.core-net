using Microsoft.EntityFrameworkCore;
using SmartGuideSystem.OracleDB.Model;
using System.Reflection.Emit;

namespace SmartGuideSystem.DB
{
    public class SGSOragcleDataContext : DbContext
    {
        public SGSOragcleDataContext(DbContextOptions<SGSOragcleDataContext> options) : base(options)
        {
           
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CMMTNV_USER>()
                .ToView(nameof(CMMTNV_USER))
                .HasKey(t=> t.LOGON_ID);
        }

        public DbSet<CMMTNUSER> Cmmtnusers { get; set; }
        public DbSet<CMMTNDEPT> Cmmtndepts { get; set; }
        public DbSet<CMMTNFILE> CmmntFiles { get; set; }
        public DbSet<OFRTNANOTANCMT> OFRTNANOTANCMTs { get; set; }
        public DbSet<CMMTNV_USER> Cmmtnv_users { get; set; }
        public DbSet<OFREPCTNAPVINGSTAT_GOSI> GOSI_STATs { get; set; }



    }


}
