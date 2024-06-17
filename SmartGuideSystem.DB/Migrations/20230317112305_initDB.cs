using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SmartGuideSystem.DB.Model.JSON;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class initDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SGBuildingInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeptCode = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    FloorIds = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGBuildingInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SGDepartment",
                columns: table => new
                {
                    DeptCode = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DeptFullName = table.Column<string>(type: "text", nullable: true),
                    ParentDeptCode = table.Column<string>(type: "text", nullable: true),
                    OfficeTel = table.Column<string>(type: "text", nullable: true),
                    OfficeFax = table.Column<string>(type: "text", nullable: true),
                    JobDescription = table.Column<string>(type: "text", nullable: true),
                    Depth = table.Column<int>(type: "integer", nullable: false),
                    DeptSeq = table.Column<string>(type: "text", nullable: true),
                    DeptSe = table.Column<string>(type: "text", nullable: true),
                    DeptRank = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime2 = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime3 = table.Column<string>(type: "text", nullable: true),
                    UseYn = table.Column<bool>(type: "boolean", nullable: false),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGDepartment", x => x.DeptCode);
                    table.ForeignKey(
                        name: "FK_SGDepartment_SGDepartment_ParentDeptCode",
                        column: x => x.ParentDeptCode,
                        principalTable: "SGDepartment",
                        principalColumn: "DeptCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SGDevice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeviceId = table.Column<string>(type: "text", nullable: false),
                    KioskType = table.Column<string>(type: "text", nullable: false),
                    DeptCode = table.Column<string>(type: "text", nullable: true),
                    DeptName = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    ModifierId = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true),
                    Use = table.Column<bool>(type: "boolean", nullable: false),
                    Desc = table.Column<string>(type: "text", nullable: true),
                    OrgChartId = table.Column<int>(type: "integer", nullable: true),
                    OrgChartName = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGDevice", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SGGosigonggoInfo",
                columns: table => new
                {
                    NotAncmtMgtNo = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    GosiNumber = table.Column<string>(type: "text", nullable: true),
                    PostDate = table.Column<string>(type: "text", nullable: true),
                    DeptCode = table.Column<string>(type: "text", nullable: true),
                    Subject = table.Column<string>(type: "text", nullable: true),
                    Contents = table.Column<string>(type: "text", nullable: true),
                    StartPeriod = table.Column<string>(type: "text", nullable: true),
                    EndPeriod = table.Column<string>(type: "text", nullable: true),
                    FileID = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime2 = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime3 = table.Column<string>(type: "text", nullable: true),
                    GosiType = table.Column<string>(type: "text", nullable: true),
                    GosiRegNo = table.Column<string>(type: "text", nullable: true),
                    Tel = table.Column<string>(type: "text", nullable: true),
                    Mail = table.Column<string>(type: "text", nullable: true),
                    DELETEYN = table.Column<string>(name: "DELETE_YN", type: "text", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGGosigonggoInfo", x => x.NotAncmtMgtNo);
                });

            migrationBuilder.CreateTable(
                name: "SGLoginUser",
                columns: table => new
                {
                    LoginId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    DeptCode = table.Column<string>(type: "text", nullable: true),
                    DeptName = table.Column<string>(type: "text", nullable: true),
                    DeptFullName = table.Column<string>(type: "text", nullable: true),
                    Desc = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true),
                    LastLoggedInTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGLoginUser", x => x.LoginId);
                });

            migrationBuilder.CreateTable(
                name: "SGNoticeInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    PostDate = table.Column<string>(type: "text", nullable: false),
                    DeptName = table.Column<string>(type: "text", nullable: true),
                    DeptCode = table.Column<string>(type: "text", nullable: true),
                    Contents = table.Column<string>(type: "text", nullable: false),
                    Views = table.Column<int>(type: "integer", nullable: false),
                    ImageFiles = table.Column<string[]>(type: "text[]", nullable: false),
                    AttachmentFiles = table.Column<string[]>(type: "text[]", nullable: false),
                    NoticeType = table.Column<int>(type: "integer", nullable: false),
                    CreateDateTime = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGNoticeInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SGOrganizationChart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeptCode = table.Column<string>(type: "text", nullable: false),
                    DeptName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Desc = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    UseYn = table.Column<bool>(type: "boolean", nullable: true),
                    ChartType = table.Column<string>(type: "text", nullable: true),
                    OfficeTel = table.Column<string>(type: "text", nullable: true),
                    OfficeFax = table.Column<string>(type: "text", nullable: true),
                    DepartJob = table.Column<string>(type: "text", nullable: true),
                    DeptLeaderId = table.Column<string>(type: "text", nullable: true),
                    TopDeptLeaderId = table.Column<string>(type: "text", nullable: true),
                    ChartJson = table.Column<SGOrganizationChartJson>(type: "json", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGOrganizationChart", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SGTeam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeptCode = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    OfficeTel = table.Column<string>(type: "text", nullable: true),
                    OfficeFax = table.Column<string>(type: "text", nullable: true),
                    JobDescription = table.Column<string>(type: "text", nullable: true),
                    UseYn = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGTeam", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SGUser",
                columns: table => new
                {
                    Sid = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    LoginID = table.Column<string>(type: "text", nullable: true),
                    Photo = table.Column<string>(type: "text", nullable: true),
                    DeptCode = table.Column<string>(type: "text", nullable: true),
                    DeptName = table.Column<string>(type: "text", nullable: true),
                    DeptDescription = table.Column<string>(type: "text", nullable: true),
                    TeamName = table.Column<string>(type: "text", nullable: true),
                    TeamPosition = table.Column<string>(type: "text", nullable: true),
                    PositionCode = table.Column<string>(type: "text", nullable: true),
                    PositionName = table.Column<string>(type: "text", nullable: true),
                    GradeCode = table.Column<string>(type: "text", nullable: true),
                    GradeName = table.Column<string>(type: "text", nullable: true),
                    OfficeTel = table.Column<string>(type: "text", nullable: true),
                    OfficeFax = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    JobDescription = table.Column<string>(type: "text", nullable: true),
                    UseYn = table.Column<bool>(type: "boolean", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime2 = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime3 = table.Column<string>(type: "text", nullable: true),
                    UserRank = table.Column<int>(type: "integer", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true),
                    OrgChartId = table.Column<int>(type: "integer", nullable: true),
                    OrgChartName = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGUser", x => x.Sid);
                });

            migrationBuilder.CreateTable(
                name: "SGFloor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BuildingId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    ButtonName = table.Column<string>(type: "text", nullable: true),
                    FloorImage = table.Column<string>(type: "text", nullable: true),
                    Items = table.Column<SGFloorItem[]>(type: "json", nullable: true),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGFloor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SGFloor_SGBuildingInfo_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "SGBuildingInfo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SGFileInfo",
                columns: table => new
                {
                    FileID = table.Column<string>(type: "text", nullable: false),
                    FileSeq = table.Column<int>(type: "integer", nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    SysFileName = table.Column<string>(type: "text", nullable: true),
                    UserFileName = table.Column<string>(type: "text", nullable: true),
                    FileExt = table.Column<string>(type: "text", nullable: true),
                    FileSize = table.Column<string>(type: "text", nullable: true),
                    RegDt = table.Column<string>(type: "text", nullable: true),
                    ImageList = table.Column<string[]>(type: "text[]", nullable: true),
                    TTSTextList = table.Column<string[]>(type: "text[]", nullable: true),
                    NotAncmtMgtNo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGFileInfo", x => new { x.FileID, x.FileSeq });
                    table.ForeignKey(
                        name: "FK_SGFileInfo_SGGosigonggoInfo_NotAncmtMgtNo",
                        column: x => x.NotAncmtMgtNo,
                        principalTable: "SGGosigonggoInfo",
                        principalColumn: "NotAncmtMgtNo");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SGDepartment_ParentDeptCode",
                table: "SGDepartment",
                column: "ParentDeptCode");

            migrationBuilder.CreateIndex(
                name: "IX_SGDevice_DeviceId",
                table: "SGDevice",
                column: "DeviceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SGFileInfo_NotAncmtMgtNo",
                table: "SGFileInfo",
                column: "NotAncmtMgtNo");

            migrationBuilder.CreateIndex(
                name: "IX_SGFloor_BuildingId",
                table: "SGFloor",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_SGOrganizationChart_Name",
                table: "SGOrganizationChart",
                column: "Name",
                unique: true);





            migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
                       , values: new object[] { "진주시청", "53100000000", (new int[0]) });
            migrationBuilder.InsertData(table: "SGBuildingInfo", columns: new[] { "Name", "DeptCode", "FloorIds" }
            , values: new object[] { "진주시의회", "999999", (new int[0]) });
            // Department
            migrationBuilder.InsertData(table: "SGLoginUser", columns: new[] { "LoginId", "Name", "Password", "Role" }
            , values: new object[] { "SysAdmin", "SystemAdmin", "AQAAAAEAAYagAAAAEBfm4czJ3Fsmhu39yRywgey0UwhBwphCCP6lWfaw03mZNj2xygQGDWLzCDo8pmAJbg==", "SystemAdmin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SGDepartment");

            migrationBuilder.DropTable(
                name: "SGDevice");

            migrationBuilder.DropTable(
                name: "SGFileInfo");

            migrationBuilder.DropTable(
                name: "SGFloor");

            migrationBuilder.DropTable(
                name: "SGLoginUser");

            migrationBuilder.DropTable(
                name: "SGNoticeInfo");

            migrationBuilder.DropTable(
                name: "SGOrganizationChart");

            migrationBuilder.DropTable(
                name: "SGTeam");

            migrationBuilder.DropTable(
                name: "SGUser");

            migrationBuilder.DropTable(
                name: "SGGosigonggoInfo");

            migrationBuilder.DropTable(
                name: "SGBuildingInfo");
        }
    }
}
