using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FriendsCoolWater.Migrations
{
    public partial class TeamEmployeeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TeamEmployees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Fk_TeamId = table.Column<int>(nullable: false),
                    Fk_EmployeeId = table.Column<string>(maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamEmployees_AspNetUsers_Fk_EmployeeId",
                        column: x => x.Fk_EmployeeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamEmployees_Teams_Fk_TeamId",
                        column: x => x.Fk_TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeamEmployees_Fk_EmployeeId",
                table: "TeamEmployees",
                column: "Fk_EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamEmployees_Fk_TeamId",
                table: "TeamEmployees",
                column: "Fk_TeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeamEmployees");
        }
    }
}
