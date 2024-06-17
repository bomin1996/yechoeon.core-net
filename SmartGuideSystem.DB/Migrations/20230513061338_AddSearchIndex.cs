using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class AddSearchIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_SGUser_Name",
                table: "SGUser",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_SGUser_SearchFilter1",
                table: "SGUser",
                column: "SearchFilter1");

            migrationBuilder.CreateIndex(
                name: "IX_SGSeatPosChart_SearchFilter1",
                table: "SGSeatPosChart",
                column: "SearchFilter1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SGUser_Name",
                table: "SGUser");

            migrationBuilder.DropIndex(
                name: "IX_SGUser_SearchFilter1",
                table: "SGUser");

            migrationBuilder.DropIndex(
                name: "IX_SGSeatPosChart_SearchFilter1",
                table: "SGSeatPosChart");
        }
    }
}
