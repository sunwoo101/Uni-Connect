/*
    This class is the structure for an add comment request from the frontend
*/

namespace UniConnect.Models.Requests;

public class AddCommentRequest
{
    public required int UserId { get; set; }
    public required int PostId { get; set; }
    public required string Content { get; set; }
    public int? ParentCommentId { get; set; }
}