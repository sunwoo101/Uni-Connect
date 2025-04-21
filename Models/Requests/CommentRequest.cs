/*
    This class is the structure for a login request from the frontend
*/

namespace UniConnect.Models.Requests;

public class CommentRequest
{
    public required int UserId { get; set; }
    public required int PostId { get; set; }
    public required string Content { get; set; }
    public int? ParentCommentId { get; set; }
}