/*
    This class is the structure for a like post request from the frontend
*/

namespace UniConnect.Models.Requests;

public class LikePostRequest
{
    public int UserId { get; set; } = 0;
    public required int PostId { get; set; }
}