/*
    This class contains functions related to posts
*/

using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Utilities;

namespace UniConnect.Services;

public class PostService
{
    private readonly AppDbContext _context;

    public PostService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string Message)> CreatePostAsync(CreatePostRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

        if (user == null)
            return (false, "Something went wrong."); // Bookmark

        // Bookmark: check the request was sent by the user

        var newPost = new Post
        {
            UserId = request.UserId,
            User = user,
            Content = request.Content,
            Image = request.Image,
            Video = request.Video,
            Voice = request.Voice,
            CreationDate = DateTime.UtcNow,
            Event = request.Event
        };

        _context.Posts.Add(newPost); // Add the new post to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Successfully created post.");
    }
}