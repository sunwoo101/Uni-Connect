/*
    This class is the structure for a save post request from the frontend
*/

namespace UniConnect.Models.Requests;

public class SavePostRequest
{
    public int UserId { get; set; } = 0;
    public required int PostId { get; set; }
}