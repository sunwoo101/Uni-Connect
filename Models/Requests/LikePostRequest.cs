/*
    This class is the structure for a like post request to the frontend
*/

namespace UniConnect.Models.Requests;

public class LikePostRequest
{
    public required int UserId { get; set; }
    public required int PostId { get; set; }
}