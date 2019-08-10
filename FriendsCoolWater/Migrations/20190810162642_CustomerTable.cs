using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FriendsCoolWater.Migrations
{
    public partial class CustomerTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirmName = table.Column<string>(maxLength: 30, nullable: false),
                    CustomerName = table.Column<string>(maxLength: 30, nullable: true),
                    Address = table.Column<string>(maxLength: 80, nullable: true),
                    Description = table.Column<string>(maxLength: 100, nullable: true),
                    UnitPerDay = table.Column<short>(nullable: false),
                    UnitPrice = table.Column<short>(nullable: false),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
