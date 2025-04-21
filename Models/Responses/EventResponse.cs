/*
    This class is the structure for a login respone to the frontend
*/

namespace UniConnect.Models.Responses;

public class EventResponse // Events are embedded into posts. Description of the event is within the post that the user creates
{
    public required int Id { get; set; }
    public required string Title { get; set; } // Title of the event
    public required string DateAndTime { get; set; } // Date and time of event
    public required string Location { get; set; } // Location of the event
    public required int AttendeeCount { get; set; }
    public required bool IsAttendee { get; set; } // True if the user is an attendee
}