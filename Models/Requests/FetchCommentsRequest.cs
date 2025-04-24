/*
    This class is the structure for a fetch comments request from the frontend
*/

namespace UniConnect.Models.Requests;

public class FetchCommentsRequest
{
    public required bool FirstFetch { get; set; }
    public required int UserId { get; set; }
    public required int PostId { get; set; }
    public required int CommentIdAnchor { get; set; } // Get comments that are later than this comment
    public int? ParentCommentId { get; set; }
}