using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class addMeetingInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SGMeetingInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MeetingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeptName = table.Column<string>(type: "text", nullable: false),
                    MeetingRoom = table.Column<string>(type: "text", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Contents = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGMeetingInfo", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SGMeetingInfo_Name",
                table: "SGMeetingInfo",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_SGMeetingInfo_SearchFilter1",
                table: "SGMeetingInfo",
                column: "SearchFilter1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SGMeetingInfo");
        }
    }
}
