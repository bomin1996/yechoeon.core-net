using Microsoft.EntityFrameworkCore.Migrations;
using SmartGuideSystem.DB.Model.JSON;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class AddLoginUserExtraSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<LoginUserExtraSettings>(
                name: "ExtraSettings",
                table: "SGLoginUser",
                type: "json",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtraSettings",
                table: "SGLoginUser");
        }
    }
}
