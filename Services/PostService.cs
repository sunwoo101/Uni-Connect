/*
    This class contains functions related to posts
*/

using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;

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
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);

        if (user == null)
            return (false, "Something went wrong."); // Bookmark

        // Bookmark: check the request was sent by the user

        Post newPost = new Post
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

    public async Task<(bool Success, string Message, List<PostResponse> responseData)> FetchPostsAsync(FetchPostsRequest request, int limit = 10)
    {
        // Bookmark: The first fetch posts request wont include PostIdAnchor. Instead get the latest posts
        List<Post> posts = await _context.Posts
            .Where(request.FirstFetch ? p => p.Id > 0 : p => p.Id < request.PostIdAnchor)
            .OrderByDescending(p => p.CreationDate)
            .Include(p => p.User)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
            .Include(p => p.Event)
            .Take(limit)
            .ToListAsync();

        List<PostResponse> responseData = posts.Select(p => new PostResponse
        {
            Id = p.Id,
            User = new UserResponse
            {
                Id = p.User.Id,
                Role = p.User.Role.ToString(),
                Username = p.User.Username,
                FirstName = p.User.FirstName,
                LastName = p.User.LastName,
                Degree = p.User.Degree,
                ProfileImageURL = p.User.ProfileImageURL
            },
            Content = p.Content,
            Image = p.Image,
            Video = p.Video,
            Voice = p.Voice,
            CreationDate = p.CreationDate,
            Likes = p.Likes,
            Comments = p.Comments,
            Event = p.Event
        }).ToList();

        if (!responseData.Any())
            return (true, "No more posts to load.", responseData);

        return (true, "Successfully fetched posts.", responseData);
    }
}