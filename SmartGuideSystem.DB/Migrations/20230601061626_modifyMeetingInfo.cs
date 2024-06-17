using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class modifyMeetingInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Approval",
                table: "SGMeetingInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreateType",
                table: "SGMeetingInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeptCode",
                table: "SGMeetingInfo",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approval",
                table: "SGMeetingInfo");

            migrationBuilder.DropColumn(
                name: "CreateType",
                table: "SGMeetingInfo");

            migrationBuilder.DropColumn(
                name: "DeptCode",
                table: "SGMeetingInfo");
        }
    }
}
