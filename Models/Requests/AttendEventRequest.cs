/*
    This class is the structure for a attend event request from the frontend
*/

namespace UniConnect.Models.Requests;

public class AttendEventRequest
{
    public required int UserId { get; set; }
    public required int EventId { get; set; }
}