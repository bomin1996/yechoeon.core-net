using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class gosimodify : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Inserted",
                table: "SGGosigonggoInfo",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "SGGosigonggoInfo",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcessStatus",
                table: "SGGosigonggoInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FailCount",
                table: "SGFileInfo",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ProcessStatus",
                table: "SGFileInfo",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SGGosigonggoInfo_FileID",
                table: "SGGosigonggoInfo",
                column: "FileID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SGGosigonggoInfo_FileID",
                table: "SGGosigonggoInfo");

            migrationBuilder.DropColumn(
                name: "Inserted",
                table: "SGGosigonggoInfo");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "SGGosigonggoInfo");

            migrationBuilder.DropColumn(
                name: "ProcessStatus",
                table: "SGGosigonggoInfo");

            migrationBuilder.DropColumn(
                name: "FailCount",
                table: "SGFileInfo");

            migrationBuilder.DropColumn(
                name: "ProcessStatus",
                table: "SGFileInfo");
        }
    }
}
