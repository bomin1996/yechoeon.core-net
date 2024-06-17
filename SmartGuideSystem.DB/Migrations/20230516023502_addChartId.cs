using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class addChartId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "chartId",
                table: "SGUser",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "chartName",
                table: "SGUser",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "chartId",
                table: "SGDevice",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "chartName",
                table: "SGDevice",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "chartId",
                table: "SGUser");

            migrationBuilder.DropColumn(
                name: "chartName",
                table: "SGUser");

            migrationBuilder.DropColumn(
                name: "chartId",
                table: "SGDevice");

            migrationBuilder.DropColumn(
                name: "chartName",
                table: "SGDevice");
        }
    }
}
