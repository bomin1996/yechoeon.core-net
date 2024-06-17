using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class addprofiledata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileGrade",
                table: "SGUser",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileJobDescription",
                table: "SGUser",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileGrade",
                table: "SGUser");

            migrationBuilder.DropColumn(
                name: "ProfileJobDescription",
                table: "SGUser");
        }
    }
}
