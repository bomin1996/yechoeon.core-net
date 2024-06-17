using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Migrations;
using SmartGuideSystem.DB.Model;
using SmartGuideSystem.DB.Model.YC;

namespace SmartGuideSystem.DB
{
    public class SGSDataContext : DbContext
    {
        public SGSDataContext(DbContextOptions<SGSDataContext> options) : base(options)
        {
            //this.Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Device>()
            //    .HasOne(d => d.OrganizationChart)
            //.WithOne();

            //https://learn.microsoft.com/ko-kr/ef/core/modeling/relationships?tabs=fluent-api%2Cfluent-api-simple-key%2Csimple-key

            //modelBuilder.Entity<Device>()
            //    .HasOne(d => d.OrganizationChart)
            //    .WithMany()
            //    .HasForeignKey(d => d.Id);


            //modelBuilder.Entity<OrganizationInfo>(entity => 
            //{
            //    entity.HasOne(o => o.ParentOrganization)
            //        .WithMany(o => o.ChildOrganizationInfos)
            //        .HasForeignKey(o => o.ParentOrganizationID)
            //        .IsRequired(false)
            //        .OnDelete(deleteBehavior: DeleteBehavior.Restrict);
            //});

            modelBuilder.Entity<SGDepartment>(entity =>
            {
                entity.HasOne(o => o.ParentDepartment)
                    .WithMany(o => o.ChildDepartments)
                    .HasForeignKey(o => o.ParentDeptCode)
                    .IsRequired(false)
                    .OnDelete(deleteBehavior: DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<SGBuildingInfo>(entity =>
            {
                entity.HasMany(o => o.Floors)
                    .WithOne(o => o.BuildingInfo)
                    .HasForeignKey(o => o.BuildingId)
                    .IsRequired(false)
                    .OnDelete(deleteBehavior: DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<SGGosigonggoInfo>(entity =>
            {
                entity.HasMany(o => o.FileInfos)
                    .WithOne(o => o.GosigonggoInfo)
                    .HasForeignKey(o => o.NotAncmtMgtNo)
                    .IsRequired(false)
                    .OnDelete(deleteBehavior: DeleteBehavior.NoAction);

            });

            //modelBuilder.Entity<SGOrganizationChart>(entity => 
            //{
            //    entity.HasIndex(o => o.Name)
            //    .IsUnique();
            //});


            //modelBuilder.Entity<SGOrganizationChart>(entity =>
            //{
            //    entity


            //});
        }

        //public DbSet<User> Users { get; set; }
        //public DbSet<Device> Devices { get; set; }

        //public DbSet<BuildingInfo> BuildingInfos { get; set; }
        //public DbSet<FloorInfo> FloorInfos { get; set; }


        //public DbSet<Member> Members { get; set; }

        //public DbSet<OrganizationInfo> OrganizationInfos { get; set; }

        //public DbSet<OrganizationChart> OrganizationCharts { get; set;}

        //public DbSet<GosigoggoInfo> GosigoggoInfos { get; set; }
        //public DbSet<NoticeInfo> NoticeInfos { get; set; }

        public DbSet<SGUser> Users { get; set; }
        public DbSet<SGDevice> Devices { get; set; }
        public DbSet<SGBuildingInfo> BuildingInfo { get; set; }
        public DbSet<SGFloor> Floors { get; set; }
        public DbSet<SGDepartment> Departments { get; set; }
        public DbSet<SGTeam> Teams { get; set; }
        public DbSet<SGOrganizationChart> OrganizationCharts { get; set;}
        public DbSet<SGGosigonggoInfo> GosigoggoInfos { get; set; }
        public DbSet<SGFileInfo> SGFileInfos { get; set; }
        public DbSet<SGLoginUser> LoginUsers { get; set; }
        public DbSet<SGNoticeInfo> NoticeInfos { get; set; }
        public DbSet<SGNotice> Notices { get; set; }
        public DbSet<SGSeatPosChart> SeatPosCharts { get; set; }

        public DbSet<SGAdminConfig> AdminConfigs { get; set; }
        public DbSet<SGMeetingInfo> MeetingInfos { get; set; }

        public DbSet<SGContent> Contents { get; set; }
        public DbSet<SGContentLayout> ContentLayouts { get; set; }
        public DbSet<SGLocalMap> LocalMaps { get; set; }


        public DbSet<YCSchedule> YCSchedules { get; set; }
        public DbSet<YCWatcher> YCWatchers { get; set; }

        public void Load(SGOrganizationChart organizationChart)
        {
            /*
            SGUser deptLeader = null;
            SGUser topDeptLeader = null;

            if (!string.IsNullOrEmpty(organizationChart.DeptLeaderId))
            {
                deptLeader = this.Users.FirstOrDefault(u => u.Sid == organizationChart.DeptLeaderId);
            }
            if (!string.IsNullOrEmpty(organizationChart.TopDeptLeaderId))
            {
                topDeptLeader = this.Users.FirstOrDefault(u => u.Sid == organizationChart.TopDeptLeaderId);
            }

            organizationChart.DeptLeader = deptLeader;
            organizationChart.Teams = new List<SGTeam>();

            if (organizationChart.ChartJson.Teams!= null)
            {
                foreach (var team in organizationChart.ChartJson.Teams)
                {
                    var sgteam = new SGTeam();

                    sgteam.Name = team.Name;
                    sgteam.Title = team.Title;
                    sgteam.DeptCode = organizationChart.DeptCode;
                    sgteam.OfficeFax = team.OfficeFax;
                    sgteam.OfficeTel = team.OfficeTel;
                    sgteam.JobDescription = team.JobDescription;
                    sgteam.Lines = new List<List<SGUser>>();
                    
                    if (!string.IsNullOrEmpty(team.TeamLeaderId))
                    {
                        sgteam.Leader = this.Users.FirstOrDefault(u => u.Sid == team.TeamLeaderId);
                    }

                    foreach (var line in team.Lines)
                    {
                        var userList = new List<SGUser>();

                        foreach (var sid in line)
                        {
                            var user = this.Users.FirstOrDefault(u => u.Sid == sid);
                            if (user != null)
                            {
                                userList.Add(user);
                            }
                        }

                        sgteam.Lines.Add(userList);
                    }

                    organizationChart.Teams.Add(sgteam);
                }
            }

            if ( !string.IsNullOrEmpty(organizationChart.DeptCode))
            {
                var department = this.Departments.FirstOrDefault(d => d.DeptCode == organizationChart.DeptCode);
                organizationChart.Department = department;
            }
            */
        }

        public async Task LoadAsync(SGOrganizationChart organizationChart)
        {
            /*
            SGUser deptLeader = null;
            SGUser topDeptLeader = null;

            if (!string.IsNullOrEmpty(organizationChart.DeptLeaderId))
            {
                deptLeader = await this.Users.FirstOrDefaultAsync(u => u.Sid == organizationChart.DeptLeaderId);
            }
            if (!string.IsNullOrEmpty(organizationChart.TopDeptLeaderId))
            {
                topDeptLeader =await  this.Users.FirstOrDefaultAsync(u => u.Sid == organizationChart.TopDeptLeaderId);
            }

            organizationChart.DeptLeader = deptLeader;
            organizationChart.Teams = new List<SGTeam>();

            if (organizationChart.ChartJson.Teams != null)
            {
                foreach (var team in organizationChart.ChartJson.Teams)
                {
                    var sgteam = new SGTeam();

                    sgteam.Name = team.Name;
                    sgteam.Title = team.Title;
                    sgteam.DeptCode = organizationChart.DeptCode;
                    sgteam.OfficeFax = team.OfficeFax;
                    sgteam.OfficeTel = team.OfficeTel;
                    sgteam.JobDescription = team.JobDescription;
                    sgteam.Lines = new List<List<SGUser>>();

                    if (!string.IsNullOrEmpty(team.TeamLeaderId))
                    {
                        sgteam.Leader = this.Users.FirstOrDefault(u => u.Sid == team.TeamLeaderId);
                    }

                    foreach (var line in team.Lines)
                    {
                        var userList = new List<SGUser>();

                        foreach (var sid in line)
                        {
                            var user = await this.Users.FirstOrDefaultAsync(u => u.Sid == sid);
                            if (user != null)
                            {
                                userList.Add(user);
                            }
                        }

                        sgteam.Lines.Add(userList);
                    }

                    organizationChart.Teams.Add(sgteam);
                }
            }

            if (!string.IsNullOrEmpty(organizationChart.DeptCode))
            {
                var department = await this.Departments.FirstOrDefaultAsync(d => d.DeptCode == organizationChart.DeptCode);
                organizationChart.Department = department;
            }
            */
        }

        public void MigrateDBFirstTime()
        {
            this.Database.Migrate();
        }

        public void MakeDummyData()
        {
            var departList = new List<SGDepartment>()
            {
                new SGDepartment
                {
                    ParentDeptCode = null,
                    Name = "진주시청",
                    DeptFullName = "진주시청",
                    DeptCode = "1000",
                    OfficeTel = "010-1234-5678",
                    OfficeFax = "011-1234-5678",
                    Depth = 2,
                    UseYn = true,
                },
                  new SGDepartment
                {
                    ParentDeptCode = "1000",
                    Name = "건설국",
                    DeptFullName = "진주시청 건설국",
                    DeptCode = "1010",
                    OfficeTel = "010-1234-5678",
                    OfficeFax = "011-1234-5678",
                    Depth = 3,
                    UseYn = true,
                },
                                 new SGDepartment
                {
                    ParentDeptCode = "1010",
                    Name = "건설과",
                    DeptFullName = "건설국 건설과",
                    DeptCode = "1011",
                    OfficeTel = "010-1234-5678",
                    OfficeFax = "011-1234-5678",
                    Depth = 4,
                    UseYn = true,
                },
            };

            var userList = new List<SGUser>()
            {
                new SGUser
                {
                    Sid = "S0001",
                    Name = "윤석열",
                    DeptCode = "1011",
                    DeptName = "건설과",
                    UseYn= true,
                    JobDescription = "건축\n폐쇄",
                    OfficeTel = "017-1111-2222",
                    OfficeFax ="012-2222-9999",
                    TeamName = "건축팀",
                    TeamPosition = "건축팀장",
                },
                                new SGUser
                {
                    Sid = "S0002",
                    Name = "한동훈",
                    DeptCode = "1011",
                    DeptName = "건설과",
                    UseYn= true,
                    JobDescription = "도로\n폐쇄",
                    OfficeTel = "017-1111-2222",
                    OfficeFax ="012-2222-9999",
                    TeamName = "건축팀",
                    TeamPosition = null,
                },
                                                new SGUser
                {
                    Sid = "S0003",
                    Name = "정진석",
                    DeptCode = "1011",
                    DeptName = "건설과",
                    UseYn= true,
                    JobDescription = "건축\n폐쇄",
                    OfficeTel = "017-1111-2222",
                    OfficeFax ="012-2222-9999",
                    TeamName = "건축팀",
                    TeamPosition = null,
                }
            };


            this.Departments.AddRange(departList);
            this.Users.AddRange(userList);

            this.SaveChanges();

           
        }

    }


}

////SGBuildingInfo
//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//, values: new object[] { "진주시청", "1000", (new int[0]) });
//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//, values: new object[] { "진주시의회", "2000", (new int[0]) });
//// Department
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { null, "진주시청", "1000", "010-1234-5678", "011-1234-5678", "", 0, null, true });

//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1000", "건설국", "1010", "010-1234-5678", "011-1234-5678", "", 1, null, true });

//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1010", "건설과", "1011", "010-1234-5678", "011-1234-5678", "", 2, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1010", "도시과", "1012", "010-1234-5678", "011-1234-5678", "", 2, null, true });



//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1000", "재경국", "1020", "010-1234-5678", "011-1234-5678", "", 1, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1020", "세무과", "1021", "010-1234-5678", "011-1234-5678", "", 2, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "1020", "재무과", "1022", "010-1234-5678", "011-1234-5678", "", 2, null, true });


//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { null, "진주시의회", "2000", "010-1234-5678", "011-1234-5678", "", 0, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "2000", "의회사무국", "2010", "010-1234-5678", "011-1234-5678", "", 1, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "2010", "의회사무1과", "2011", "010-1234-5678", "011-1234-5678", "", 2, null, true });
//migrationBuilder.InsertData(table: "SGDepartment", columns: new[] { "ParentDeptCode", "Name", "DeptCode", "OfficeTel", "OfficeFax", "JobDescription", "Depth", "UpdateDateTime", "UseYn" }
//    , values: new object[] { "2010", "의회사무2과", "2012", "010-1234-5678", "011-1234-5678", "", 2, null, true });


//// User
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0001", "윤석열", "1011", true, "건축\n폐쇄", "017-1111-2222", "012-2222-9999", "건축팀", "건축팀장" });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0002", "한동훈", "1011", true, "도로\n폐쇄", "017-1111-2222", "012-2222-9999", "건축팀", null });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0003", "정진석", "1011", true, "정비\n폐쇄", "017-1111-2222", "012-2222-9999", "건축팀", null });


//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0004", "조국", "1011", true, "인테리어\n폐쇄", "017-1111-2222", "012-2222-9999", "철거팀", "철거팀장" });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0005", "정청래", "1011", true, "포장\n폐쇄", "017-1111-2222", "012-2222-9999", "철거팀", null });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0006", "유시민", "1011", true, "철거\n폐쇄", "017-1111-2222", "012-2222-9999", "철거팀", null });


//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0007", "안철수", "1011", true, "중도\n배신", "017-1111-2222", "012-2222-9999", "도배팀", "도배팀장" });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0008", "유승민", "1011", true, "도배\n폐쇄", "017-1111-2222", "012-2222-9999", "도배팀", null });
//migrationBuilder.InsertData(table: "SGUser", columns: new[] { "Sid", "Name", "DeptCode", "UseYn", "JobDescription", "OfficeTel", "OfficeFax", "TeamName", "TeamPosition" }
//    , values: new object[] { "S0009", "이준석", "1011", true, "타일\n폐쇄", "017-1111-2222", "012-2222-9999", "도배팀", null });



//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//, values: new object[] { "진주시청", "53100000000", (new int[0]) });
//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//, values: new object[] { "진주시의회", "999999", (new int[0]) });
//// Department
//migrationBuilder.InsertData(table: "SGLoginUser", columns: new[] { "LoginId", "Name", "Password", "Role" }
//, values: new object[] { "se", "Engineer", "1234", "SE" });


//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//           , values: new object[] { "진주시청", "53100000000", (new int[0]) });
//migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
//, values: new object[] { "진주시의회", "999999", (new int[0]) });
//// Department
//migrationBuilder.InsertData(table: "SGLoginUser", columns: new[] { "LoginId", "Name", "Password", "Role" }
//, values: new object[] { "SysAdmin", "SystemAdmin", "AQAAAAEAAYagAAAAEBfm4czJ3Fsmhu39yRywgey0UwhBwphCCP6lWfaw03mZNj2xygQGDWLzCDo8pmAJbg==", "SystemAdmin" });