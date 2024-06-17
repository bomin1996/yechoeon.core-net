using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class addCreatetype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreateType",
                table: "SGUser",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateType",
                table: "SGUser");
        }
    }
}
