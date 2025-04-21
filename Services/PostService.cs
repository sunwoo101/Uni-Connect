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
        };

        _context.Posts.Add(newPost); // Add the new post to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        if (request.Event != null)
        {
            Event newEvent = new Event
            {
                PostId = newPost.Id,
                Post = newPost,
                Title = request.Event.Title,
                DateAndTime = DateTime.Parse(request.Event.DateAndTime, null, System.Globalization.DateTimeStyles.RoundtripKind),
                Location = request.Event.Location
            };

            _context.Events.Add(newEvent); // Add the new event to the EF tracking system
            await _context.SaveChangesAsync(); // Update the DB

            newPost.Event = newEvent; // Add the event to post
            await _context.SaveChangesAsync(); // Update the DB
        }

        return (true, "Successfully created post.");
    }

    // Used for fetching a singular post (for post modal)
    public async Task<(bool Success, string Message, PostResponse? responseData)> FetchPostAsync(FetchPostRequest request)
    {
        Post? post = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
            .Include(p => p.Saves)
            .Include(p => p.Event)
                .ThenInclude(e => e.Attendees)
            .FirstOrDefaultAsync(p => p.Id == request.PostId);

        if (post == null)
            return (false, "Post no longer exists.", null);

        PostResponse responseData = new PostResponse
        {
            Id = post.Id,
            User = new UserResponse
            {
                Id = post.User.Id,
                Role = post.User.Role.ToString(),
                Username = post.User.Username,
                FirstName = post.User.FirstName,
                LastName = post.User.LastName,
                Degree = post.User.Degree,
                ProfileImageURL = post.User.ProfileImageURL,
                PostCount = _context.Posts.Count(p => p.UserId == post.User.Id),
                FriendCount = _context.Friendships.Count(f => f.UserId == post.User.Id),
            },
            Content = post.Content,
            Image = post.Image,
            Video = post.Video,
            Voice = post.Voice,
            CreationDate = post.CreationDate.ToString("o"),
            LikeCount = post.Likes.Count(),
            CommentCount = post.Comments.Count(),
            SaveCount = post.Saves.Count(),
            LikedByYou = post.Likes.Any(l => l.UserId == request.UserId),
            SavedByYou = post.Saves.Any(s => s.UserId == request.UserId),
            Event = post.Event == null ? null : new EventResponse
            {
                Id = post.Event.Id,
                Title = post.Event.Title,
                DateAndTime = post.Event.DateAndTime.ToUniversalTime().ToString("o"),
                Location = post.Event.Location,
                AttendeeCount = post.Event.Attendees.Count(),
                IsAttendee = post.Event.Attendees.Any(a => a.UserId == request.UserId)
            }
        };
        
        return (true, "Successfully fetched post.", responseData);
    }

    // Used for fetching posts for feed, saved, and profile
    public async Task<(bool Success, string Message, List<PostResponse> responseData)> FetchPostsAsync(FetchPostsRequest request)
    {
        int limit = 10;

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

        // Apply filter for only the user's posts
        if (request.PostFilter == PostFilter.User.ToString())
        {
            query = query.Where(p => p.UserId == request.UserId);
        }

        List<Post> posts = await query
            .OrderByDescending(p => p.Id)
            .Include(p => p.User)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
            .Include(p => p.Saves)
            .Include(p => p.Event)
                .ThenInclude(e => e.Attendees)
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
                ProfileImageURL = p.User.ProfileImageURL,
                PostCount = _context.Posts.Count(p2 => p2.UserId == p.User.Id),
                FriendCount = _context.Friendships.Count(f => f.UserId == p.User.Id)
            },
            Content = p.Content,
            Image = p.Image,
            Video = p.Video,
            Voice = p.Voice,
            CreationDate = p.CreationDate.ToString("o"),
            LikeCount = p.Likes.Count(),
            CommentCount = p.Comments.Count(),
            SaveCount = p.Saves.Count(),
            LikedByYou = p.Likes.Any(l => l.UserId == request.UserId),
            SavedByYou = p.Saves.Any(s => s.UserId == request.UserId),
            Event = p.Event == null ? null : new EventResponse
            {
                Id = p.Event.Id,
                Title = p.Event.Title,
                DateAndTime = p.Event.DateAndTime.ToString("o"),
                Location = p.Event.Location,
                AttendeeCount = p.Event.Attendees.Count(),
                IsAttendee = p.Event.Attendees.Any(a => a.UserId == request.UserId)
            }
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

    public async Task<(bool Success, string Message)> AddEventAttendeeAsync(AttendEventRequest request)
    {
        if (await _context.Attendees.AnyAsync(a => a.UserId == request.UserId && a.EventId == request.EventId)) // Check if the save already exists
            return (true, "Marked as attending.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
        var event_ = await _context.Events.FirstOrDefaultAsync(e => e.Id == request.EventId);

        if (user == null || event_ == null)
            return (false, "Invalid event or user.");

        Attendee newAttendee = new Attendee
        {
            UserId = request.UserId,
            EventId = request.EventId,
            User = user,
            Event = event_
        };

        _context.Attendees.Add(newAttendee); // Add the new attendee to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "Marked as attending.");
    }

    public async Task<(bool Success, string Message)> RemoveEventAttendeeAsync(AttendEventRequest request)
    {
        var attendee = await _context.Attendees.FirstOrDefaultAsync(a => a.UserId == request.UserId && a.EventId == request.EventId);
        if (attendee == null)
            return (true, "No longer attending.");

        _context.Attendees.Remove(attendee); // Remove the attendee from the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        return (true, "No longer attending.");
    }
}