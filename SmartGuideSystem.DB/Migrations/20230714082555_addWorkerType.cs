using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class addWorkerType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkerType",
                table: "SGUser",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkerType",
                table: "SGUser");
        }
    }
}
