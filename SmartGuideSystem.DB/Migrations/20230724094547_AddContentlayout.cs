using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SmartGuideSystem.DB.Model.JSON;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class AddContentlayout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SGContentLayout",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupName = table.Column<string>(type: "text", nullable: true),
                    Category1 = table.Column<string>(type: "text", nullable: true),
                    Category2 = table.Column<string>(type: "text", nullable: true),
                    Category3 = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Desc = table.Column<string>(type: "text", nullable: true),
                    UseYn = table.Column<bool>(type: "boolean", nullable: false),
                    LayoutType = table.Column<string>(type: "text", nullable: true),
                    ContentLayoutJson = table.Column<SGContentLayoutJson>(type: "json", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGContentLayout", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SGContentLayout_Name",
                table: "SGContentLayout",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SGContentLayout_SearchFilter1",
                table: "SGContentLayout",
                column: "SearchFilter1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SGContentLayout");
        }
    }
}
