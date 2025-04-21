/*
    This class is the structure for a save post request from the frontend
*/

namespace UniConnect.Models.Requests;

public class SavePostRequest
{
    public required int UserId { get; set; }
    public required int PostId { get; set; }
}