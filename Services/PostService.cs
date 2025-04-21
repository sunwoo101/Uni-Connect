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

    public async Task<(bool Success, string Message, List<PostResponse> responseData)> FetchPostsAsync(FetchPostsRequest request)
    {
        int limit = 10;
        // Bookmark: The first fetch posts request wont include PostIdAnchor. Instead get the latest posts

        // Start building the query
        IQueryable<Post> query = _context.Posts;

        // Apply filter from PostIdAnchor if this isn't the first fetch of the feed
        if (!request.FirstFetch)
        {
            query = query.Where(p => p.Id < request.PostIdAnchor);
        }

        // Apply filter for only Saved posts
        if (request.PostFilter == PostFilter.Saved.ToString())
        {
            query = query.Where(p => p.Saves.Any(s => s.UserId == request.UserId));
        }

        List<Post> posts = await query
            .OrderByDescending(p => p.CreationDate)
            .Include(p => p.User)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
            .Include(p => p.Saves)
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
            LikeCount = p.Likes.Count(),
            CommentCount = p.Comments.Count(),
            SaveCount = p.Saves.Count(),
            LikedByYou = p.Likes.Any(like => like.UserId == request.UserId),
            SavedByYou = p.Saves.Any(like => like.UserId == request.UserId),
            Event = p.Event
        }).ToList();

        if (!responseData.Any())
            return (true, "No more posts to load.", responseData);

        return (true, "Successfully fetched posts.", responseData);
    }

    public async Task<(bool Success, string Message)> AddLikeAsync(LikePostRequest request)
    {
        if (await _context.Likes.AnyAsync(l => l.UserId == request.UserId && l.PostId == request.PostId)) // Check if the like already exists
            return (true, "Liked post.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
        var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId);

        if (user == null || post == null)
            return (false, "Invalid post or user.");

        Like newLike = new Like
        {
            UserId = request.UserId,
            PostId = request.PostId,
            User = user,
            Post = post
        };

        _context.Likes.Add(newLike); // Add the new like to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Liked post.");
    }

    public async Task<(bool Success, string Message)> RemoveLikeAsync(LikePostRequest request)
    {
        var like = await _context.Likes.FirstOrDefaultAsync(l => l.UserId == request.UserId && l.PostId == request.PostId);
        if (like == null)
            return (true, "Removed like from post.");

        _context.Likes.Remove(like); // Remove the like from the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Removed like from post.");
    }

    public async Task<(bool Success, string Message)> AddSaveAsync(SavePostRequest request)
    {
        if (await _context.Saves.AnyAsync(s => s.UserId == request.UserId && s.PostId == request.PostId)) // Check if the save already exists
            return (true, "Saved post.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
        var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId);

        if (user == null || post == null)
            return (false, "Invalid post or user.");

        Save newSave = new Save
        {
            UserId = request.UserId,
            PostId = request.PostId,
            User = user,
            Post = post
        };

        _context.Saves.Add(newSave); // Add the new save to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Saved post.");
    }

    public async Task<(bool Success, string Message)> RemoveSaveAsync(SavePostRequest request)
    {
        var save = await _context.Saves.FirstOrDefaultAsync(s => s.UserId == request.UserId && s.PostId == request.PostId);
        if (save == null)
            return (true, "Removed save from post.");

        _context.Saves.Remove(save); // Remove the save from the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Removed save from post.");
    }
}