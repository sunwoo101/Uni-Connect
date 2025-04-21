using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniConnect.Migrations
{
    /// <inheritdoc />
    public partial class EventsAndAttendees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendee_Event_EventId",
                table: "Attendee");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendee_Users_UserId",
                table: "Attendee");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Posts_PostId",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Event",
                table: "Event");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendee",
                table: "Attendee");

            migrationBuilder.RenameTable(
                name: "Event",
                newName: "Events");

            migrationBuilder.RenameTable(
                name: "Attendee",
                newName: "Attendees");

            migrationBuilder.RenameIndex(
                name: "IX_Event_PostId",
                table: "Events",
                newName: "IX_Events_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendee_UserId",
                table: "Attendees",
                newName: "IX_Attendees_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendee_EventId",
                table: "Attendees",
                newName: "IX_Attendees_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Events",
                table: "Events",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendees",
                table: "Attendees",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendees_Events_EventId",
                table: "Attendees",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendees_Users_UserId",
                table: "Attendees",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Posts_PostId",
                table: "Events",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendees_Events_EventId",
                table: "Attendees");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendees_Users_UserId",
                table: "Attendees");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Posts_PostId",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Events",
                table: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attendees",
                table: "Attendees");

            migrationBuilder.RenameTable(
                name: "Events",
                newName: "Event");

            migrationBuilder.RenameTable(
                name: "Attendees",
                newName: "Attendee");

            migrationBuilder.RenameIndex(
                name: "IX_Events_PostId",
                table: "Event",
                newName: "IX_Event_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendees_UserId",
                table: "Attendee",
                newName: "IX_Attendee_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Attendees_EventId",
                table: "Attendee",
                newName: "IX_Attendee_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Event",
                table: "Event",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attendee",
                table: "Attendee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendee_Event_EventId",
                table: "Attendee",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendee_Users_UserId",
                table: "Attendee",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Posts_PostId",
                table: "Event",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }
    }
}
