/*
    This class is the structure for a fetch posts request from the frontend
*/

namespace UniConnect.Models.Requests;

public class FetchPostsRequest
{
    public required bool FirstFetch { get; set; }
    public required int UserId { get; set; } // Run algorithm on this user to show relevant content
    public required int PostIdAnchor { get; set; } // Get posts that are later than this post
    public string? PostFilter { get; set; } // Filter what posts to add to the response
}