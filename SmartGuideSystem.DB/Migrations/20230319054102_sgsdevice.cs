using Microsoft.EntityFrameworkCore.Migrations;
using SmartGuideSystem.DB.Model.JSON;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class sgsdevice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DeviceExtraSettings>(
                name: "ExtraSettings",
                table: "SGDevice",
                type: "json",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtraSettings",
                table: "SGDevice");
        }
    }
}
