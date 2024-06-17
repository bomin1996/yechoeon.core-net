﻿// <auto-generated />
using System;
using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SmartGuideSystem.DB;
using SmartGuideSystem.DB.Model.JSON;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    [DbContext(typeof(SGSDataContext))]
    [Migration("20230630070405_modifyNoticeInfo")]
    partial class modifyNoticeInfo
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGAdminConfig", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<JsonObject>("Config")
                        .HasColumnType("json");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.HasKey("Name");

                    b.ToTable("SGAdminConfig");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGBuildingInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("FloorIds")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SGBuildingInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGDepartment", b =>
                {
                    b.Property<string>("DeptCode")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "deptCode");

                    b.Property<string>("DeptFullName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "deptFullName");

                    b.Property<string>("DeptRank")
                        .HasColumnType("text");

                    b.Property<string>("DeptSe")
                        .HasColumnType("text");

                    b.Property<string>("DeptSeq")
                        .HasColumnType("text");

                    b.Property<int>("Depth")
                        .HasColumnType("integer")
                        .HasAnnotation("Relational:JsonPropertyName", "depth");

                    b.Property<string>("JobDescription")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "jobDescription");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "name");

                    b.Property<string>("OfficeFax")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "officeFax");

                    b.Property<string>("OfficeTel")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "officeTel");

                    b.Property<string>("ParentDeptCode")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "parentDeptCode");

                    b.Property<string>("ParentDeptName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "parentDeptName");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime2")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime3")
                        .HasColumnType("text");

                    b.Property<bool>("UseYn")
                        .HasColumnType("boolean")
                        .HasAnnotation("Relational:JsonPropertyName", "useYn");

                    b.HasKey("DeptCode");

                    b.HasIndex("ParentDeptCode");

                    b.ToTable("SGDepartment");

                    b.HasAnnotation("Relational:JsonPropertyName", "childDepartments");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGDevice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DeptCode")
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .HasColumnType("text");

                    b.Property<string>("Desc")
                        .HasColumnType("text");

                    b.Property<string>("DeviceId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DeviceExtraSettings>("ExtraSettings")
                        .HasColumnType("json");

                    b.Property<string>("KioskType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("ModifierId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("OrgChartId")
                        .HasColumnType("integer")
                        .HasAnnotation("Relational:JsonPropertyName", "orgChartId");

                    b.Property<string>("OrgChartName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "orgChartName");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<bool>("Use")
                        .HasColumnType("boolean");

                    b.Property<int?>("chartId")
                        .HasColumnType("integer")
                        .HasAnnotation("Relational:JsonPropertyName", "chartId");

                    b.Property<string>("chartName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "chartName");

                    b.HasKey("Id");

                    b.HasIndex("DeviceId")
                        .IsUnique();

                    b.ToTable("SGDevice");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGFileInfo", b =>
                {
                    b.Property<string>("FileID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<int>("FileSeq")
                        .HasColumnType("integer");

                    b.Property<int>("FailCount")
                        .HasColumnType("integer");

                    b.Property<string>("FileExt")
                        .HasColumnType("text");

                    b.Property<string>("FilePath")
                        .HasColumnType("text");

                    b.Property<string>("FileSize")
                        .HasColumnType("text");

                    b.Property<string[]>("ImageList")
                        .HasColumnType("text[]");

                    b.Property<string>("NotAncmtMgtNo")
                        .HasColumnType("text");

                    b.Property<string>("ProcessStatus")
                        .HasColumnType("text");

                    b.Property<string>("RegDt")
                        .HasColumnType("text");

                    b.Property<string>("SysFileName")
                        .HasColumnType("text");

                    b.Property<string[]>("TTSTextList")
                        .HasColumnType("text[]");

                    b.Property<string>("UserFileName")
                        .HasColumnType("text");

                    b.HasKey("FileID", "FileSeq");

                    b.HasIndex("NotAncmtMgtNo");

                    b.ToTable("SGFileInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGFloor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("BuildingId")
                        .HasColumnType("integer");

                    b.Property<string>("ButtonName")
                        .HasColumnType("text");

                    b.Property<string>("FloorImage")
                        .HasColumnType("text");

                    b.Property<int?>("FloorMapType")
                        .HasColumnType("integer");

                    b.Property<SGFloorItem[]>("Items")
                        .HasColumnType("json");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("SGFloor");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGGosigonggoInfo", b =>
                {
                    b.Property<string>("NotAncmtMgtNo")
                        .HasColumnType("text");

                    b.Property<string>("Contents")
                        .HasColumnType("text");

                    b.Property<string>("DELETE_YN")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .HasColumnType("text");

                    b.Property<string>("EndPeriod")
                        .HasColumnType("text");

                    b.Property<string>("FileID")
                        .HasColumnType("text");

                    b.Property<string>("GosiNumber")
                        .HasColumnType("text");

                    b.Property<string>("GosiRegNo")
                        .HasColumnType("text");

                    b.Property<string>("GosiType")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Inserted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdated")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Mail")
                        .HasColumnType("text");

                    b.Property<string>("PostDate")
                        .HasColumnType("text");

                    b.Property<string>("ProcessStatus")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<string>("StartPeriod")
                        .HasColumnType("text");

                    b.Property<string>("Subject")
                        .HasColumnType("text");

                    b.Property<string>("Tel")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime2")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime3")
                        .HasColumnType("text");

                    b.HasKey("NotAncmtMgtNo");

                    b.HasIndex("FileID");

                    b.ToTable("SGGosigonggoInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGLoginUser", b =>
                {
                    b.Property<string>("LoginId")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .HasColumnType("text");

                    b.Property<string>("DeptFullName")
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .HasColumnType("text");

                    b.Property<string>("Desc")
                        .HasColumnType("text");

                    b.Property<LoginUserExtraSettings>("ExtraSettings")
                        .HasColumnType("json");

                    b.Property<DateTime?>("LastLoggedInTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginId");

                    b.ToTable("SGLoginUser");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGMeetingInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Approval")
                        .HasColumnType("text");

                    b.Property<string>("Contents")
                        .HasColumnType("text");

                    b.Property<string>("CreateType")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("MeetingDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("MeetingRoom")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name");

                    b.HasIndex("SearchFilter1");

                    b.ToTable("SGMeetingInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGNotice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string[]>("AttachmentFiles")
                        .HasColumnType("text[]");

                    b.Property<string>("Contents")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateDateTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string[]>("ImageFiles")
                        .HasColumnType("text[]");

                    b.Property<DateTime?>("ModifiedTime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("NoticeType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PostDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<int>("Views")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("SGNotice");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGNoticeInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string[]>("AttachmentFiles")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("Contents")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CreateDateTime")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .HasColumnType("text");

                    b.Property<string[]>("ImageFiles")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<int>("NoticeType")
                        .HasColumnType("integer");

                    b.Property<string>("PostDate")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<int>("Views")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("SGNoticeInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGOrganizationChart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<SGOrganizationChartJson>("ChartJson")
                        .HasColumnType("json");

                    b.Property<string>("ChartType")
                        .HasColumnType("text");

                    b.Property<string>("DepartJob")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DeptLeaderId")
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Desc")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OfficeFax")
                        .HasColumnType("text");

                    b.Property<string>("OfficeTel")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<string>("TopDeptLeaderId")
                        .HasColumnType("text");

                    b.Property<bool?>("UseYn")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("SGOrganizationChart");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGSeatPosChart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<SGSeatPosChartJson>("ChartJson")
                        .HasColumnType("json");

                    b.Property<string>("ChartType")
                        .HasColumnType("text");

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DeptName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Desc")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<bool>("UseYn")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("SearchFilter1");

                    b.ToTable("SGSeatPosChart");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGTeam", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DeptCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("JobDescription")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("OfficeFax")
                        .HasColumnType("text");

                    b.Property<string>("OfficeTel")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<bool>("UseYn")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("SGTeam");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGUser", b =>
                {
                    b.Property<string>("Sid")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "sid");

                    b.Property<string>("CreateType")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "createType");

                    b.Property<string>("DeptCode")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "deptCode");

                    b.Property<string>("DeptDescription")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "deptDescription");

                    b.Property<string>("DeptName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "deptName");

                    b.Property<string>("Email")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "email");

                    b.Property<string>("GradeCode")
                        .HasColumnType("text");

                    b.Property<string>("GradeName")
                        .HasColumnType("text");

                    b.Property<string>("JobDescription")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "jobDescription");

                    b.Property<string>("LoginID")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Modifier")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "name");

                    b.Property<string>("OfficeFax")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "officeFax");

                    b.Property<string>("OfficeTel")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "officeTel");

                    b.Property<int?>("OrgChartId")
                        .HasColumnType("integer")
                        .HasAnnotation("Relational:JsonPropertyName", "orgChartId");

                    b.Property<string>("OrgChartName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "orgChartName");

                    b.Property<string>("Photo")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "photo");

                    b.Property<string>("PositionCode")
                        .HasColumnType("text");

                    b.Property<string>("PositionName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "positionName");

                    b.Property<string>("ProfileGrade")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "profileGrade");

                    b.Property<string>("ProfileJobDescription")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "profileJobDescription");

                    b.Property<string>("SearchFilter1")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter2")
                        .HasColumnType("text");

                    b.Property<string>("SearchFilter3")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "status");

                    b.Property<string>("TeamName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "teamName");

                    b.Property<string>("TeamPosition")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "teamPosition");

                    b.Property<string>("UpdateDateTime")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime2")
                        .HasColumnType("text");

                    b.Property<string>("UpdateDateTime3")
                        .HasColumnType("text");

                    b.Property<bool>("UseYn")
                        .HasColumnType("boolean")
                        .HasAnnotation("Relational:JsonPropertyName", "useYn");

                    b.Property<int?>("UserRank")
                        .HasColumnType("integer");

                    b.Property<int?>("chartId")
                        .HasColumnType("integer")
                        .HasAnnotation("Relational:JsonPropertyName", "chartId");

                    b.Property<string>("chartName")
                        .HasColumnType("text")
                        .HasAnnotation("Relational:JsonPropertyName", "chartName");

                    b.HasKey("Sid");

                    b.HasIndex("Name");

                    b.HasIndex("SearchFilter1");

                    b.ToTable("SGUser");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGDepartment", b =>
                {
                    b.HasOne("SmartGuideSystem.DB.Model.SGDepartment", "ParentDepartment")
                        .WithMany("ChildDepartments")
                        .HasForeignKey("ParentDeptCode")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("ParentDepartment");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGFileInfo", b =>
                {
                    b.HasOne("SmartGuideSystem.DB.Model.SGGosigonggoInfo", "GosigonggoInfo")
                        .WithMany("FileInfos")
                        .HasForeignKey("NotAncmtMgtNo")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("GosigonggoInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGFloor", b =>
                {
                    b.HasOne("SmartGuideSystem.DB.Model.SGBuildingInfo", "BuildingInfo")
                        .WithMany("Floors")
                        .HasForeignKey("BuildingId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("BuildingInfo");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGBuildingInfo", b =>
                {
                    b.Navigation("Floors");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGDepartment", b =>
                {
                    b.Navigation("ChildDepartments");
                });

            modelBuilder.Entity("SmartGuideSystem.DB.Model.SGGosigonggoInfo", b =>
                {
                    b.Navigation("FileInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
