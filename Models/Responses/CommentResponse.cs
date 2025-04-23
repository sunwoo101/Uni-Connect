/*
    This class is the structure for a comment respone to the frontend
*/

using UniConnect.Models.Entities;

namespace UniConnect.Models.Responses;

public class CommentResponse
{
    public required int Id { get; set; }
    public required UserResponse User { get; set; }
    public required string Content { get; set; }
    public required string CreationDate { get; set; }
    public int? ParentCommentId { get; set; }
    public required bool ContainsReplies { get; set; }
}