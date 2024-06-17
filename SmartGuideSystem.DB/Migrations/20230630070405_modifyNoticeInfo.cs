using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SmartGuideSystem.DB.Migrations
{
    /// <inheritdoc />
    public partial class modifyNoticeInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SGNotice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    PostDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeptName = table.Column<string>(type: "text", nullable: false),
                    DeptCode = table.Column<string>(type: "text", nullable: false),
                    Contents = table.Column<string>(type: "text", nullable: false),
                    Views = table.Column<int>(type: "integer", nullable: false),
                    ImageFiles = table.Column<string[]>(type: "text[]", nullable: true),
                    AttachmentFiles = table.Column<string[]>(type: "text[]", nullable: true),
                    NoticeType = table.Column<string>(type: "text", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdateDateTime = table.Column<string>(type: "text", nullable: true),
                    SearchFilter1 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter2 = table.Column<string>(type: "text", nullable: true),
                    SearchFilter3 = table.Column<string>(type: "text", nullable: true),
                    ModifiedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modifier = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SGNotice", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SGNotice");
        }
    }
}
