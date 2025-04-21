/*
    This class is the structure for a comment respone to the frontend
*/

using UniConnect.Models.Entities;

namespace UniConnect.Models.Responses;

public class CommentResponse
{
    public required int Id { get; set; }
    public required User User { get; set; }
    public required string Content { get; set; }
    public required string CreationDate { get; set; }
    public List<CommentResponse> Replies { get; set; } = new();
}