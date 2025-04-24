/*
    This class contains auth functions such as login, register and password reset
*/

using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Utilities;

namespace UniConnect.Services;

public class ProfileService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public ProfileService(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    public async Task<(bool Success, string Message, UserResponse? responseData)> UpdateProfileAsync(UpdateProfileRequest request)
    {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId); // Look for the user that matches with the request

        if (user == null) // Invalid user check
            return (false, "Invalid user.", null);

        if (request.Username != user.Username)
        {
            bool usernameExists = await _context.Users.AnyAsync(u => u.Username == request.Username); // Check if the username is available

            if (usernameExists)
                return (false, "Username is not available.", null);
        }

        user.Username = request.Username;
        user.Degree = request.Degree;

        if ((user.ProfileImageURL != null || user.ProfileImageURL == "") && request.ProfileImageURL != user.ProfileImageURL)
        {
            var fileName = Path.GetFileName(user.ProfileImageURL);
            var filePath = Path.Combine(_environment.WebRootPath, "uploads", "images", fileName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }

        user.ProfileImageURL = request.ProfileImageURL;

        await _context.SaveChangesAsync(); // Update the DB

        UserResponse responseData = new UserResponse // Create a response for the frontend
        {
            Id = user.Id,
            Role = user.Role.ToString(),
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Degree = user.Degree,
            ProfileImageURL = user.ProfileImageURL,
            PostCount = _context.Posts.Count(p => p.UserId == user.Id),
            FriendCount = _context.Friendships.Count(f => f.UserId == user.Id),
        };

        return (true, "Successfully updated profile.", responseData);
    }
}