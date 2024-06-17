﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class gosigongo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileSeq",
                table: "SGGosigonggoInfo",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileSeq",
                table: "SGGosigonggoInfo");
        }
    }
}