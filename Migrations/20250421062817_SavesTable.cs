using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniConnect.Migrations
{
    /// <inheritdoc />
    public partial class SavesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Save_Posts_PostId",
                table: "Save");

            migrationBuilder.DropForeignKey(
                name: "FK_Save_Users_UserId",
                table: "Save");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Save",
                table: "Save");

            migrationBuilder.RenameTable(
                name: "Save",
                newName: "Saves");

            migrationBuilder.RenameIndex(
                name: "IX_Save_UserId",
                table: "Saves",
                newName: "IX_Saves_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Save_PostId",
                table: "Saves",
                newName: "IX_Saves_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Saves",
                table: "Saves",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Saves_Posts_PostId",
                table: "Saves",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Saves_Users_UserId",
                table: "Saves",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Saves_Posts_PostId",
                table: "Saves");

            migrationBuilder.DropForeignKey(
                name: "FK_Saves_Users_UserId",
                table: "Saves");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Saves",
                table: "Saves");

            migrationBuilder.RenameTable(
                name: "Saves",
                newName: "Save");

            migrationBuilder.RenameIndex(
                name: "IX_Saves_UserId",
                table: "Save",
                newName: "IX_Save_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Saves_PostId",
                table: "Save",
                newName: "IX_Save_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Save",
                table: "Save",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Save_Posts_PostId",
                table: "Save",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Save_Users_UserId",
                table: "Save",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
