using Microsoft.EntityFrameworkCore.Migrations;

namespace FriendsCoolWater.Migrations
{
    public partial class EmployeeInCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Collections",
                maxLength: 450,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Collections",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 50);

            migrationBuilder.CreateIndex(
                name: "IX_Collections_CreatedBy",
                table: "Collections",
                column: "CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_AspNetUsers_CreatedBy",
                table: "Collections",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_AspNetUsers_CreatedBy",
                table: "Collections");

            migrationBuilder.DropIndex(
                name: "IX_Collections_CreatedBy",
                table: "Collections");

            migrationBuilder.AlterColumn<string>(
                name: "ModifiedBy",
                table: "Collections",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 450,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "Collections",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 450);
        }
    }
}
