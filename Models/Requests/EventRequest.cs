/*
    This class is the structure for a login request from the frontend
*/

namespace UniConnect.Models.Requests;

public class EventRequest // Events are embedded into posts. Description of the event is within the post that the user creates
{
    public required string Title { get; set; } // Title of the event
    public required string DateAndTime { get; set; } // Date and time of event
    public required string Location { get; set; } // Location of the event
}