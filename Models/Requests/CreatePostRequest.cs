/*
    This class is the structure for a create post request from the frontend
*/

namespace UniConnect.Models.Requests;

public class CreatePostRequest
{
    public int UserId { get; set; } = 0; // Value of UserId is replaced with JWT in function
    public required string Content { get; set; } // The text of the post
    public string? Image { get; set; } // Optional link to image. When implementing probably send a response with the link after image is uploaded.
    public string? Video { get; set; } // Optional link to video. When implementing probably send a response with the link after video is uploaded.
    public string? Voice { get; set; } // Optional link to voice recording. When implementing probably send a response with the link after voice recording is uploaded.
    public EventRequest? Event { get; set; } // Optional event object
}