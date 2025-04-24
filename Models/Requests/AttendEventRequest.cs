/*
    This class is the structure for a attend event request from the frontend
*/

namespace UniConnect.Models.Requests;

public class AttendEventRequest
{
    public int UserId { get; set; } = 0;
    public required int EventId { get; set; }
}