/*
    This class contains auth functions such as login, register and password reset
*/

using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Utilities;

namespace UniConnect.Services;

public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string Message, UserResponse? responseData)> RegisterUserAsync(RegisterRequest request)
    {
        request.FirstName = SanitizeName(request.FirstName);
        request.LastName = SanitizeName(request.LastName);
        request.Degree = SanitizeName(request.Degree);

        if (await _context.Users.AnyAsync(u => u.Email == request.Email)) // Check if the email is already registered
            return (false, "Email is already registered.", null);

        string username = request.Email.Split("@")[0]; // Extract username from the user's email

        if (await _context.Users.AnyAsync(u => u.Username == username)) // Check if someone else already has the username
            username = await GenerateUniqueUsername(username, _context); // Add a number to the username

        User newUser = new User
        {
            Role = Role.Student,
            Username = username,
            PasswordHash = PasswordHelper.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Degree = request.Degree,
            CreationDate = DateTime.UtcNow
        };

        _context.Users.Add(newUser); // Add the new user to the EF tracking system
        await _context.SaveChangesAsync(); // Update the DB

        UserResponse responseData = new UserResponse // Create a response for the frontend
        {
            Id = newUser.Id,
            Role = newUser.Role.ToString(),
            Username = newUser.Username,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Degree = newUser.Degree,
            PostCount = 0,
            FriendCount = 0
        };

        return (true, "Successfully registered.", responseData);
    }

    public async Task<(bool Success, string Message, UserResponse? responseData)> LoginUserAsync(LoginRequest request)
    {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email); // Look for the email that matches with the login email

        if (user == null || !PasswordHelper.VerifyPassword(request.Password, user.PasswordHash)) // Check if the email exists and password is correct
            return (false, "Invalid email or password.", null);

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

        return (true, "Successfully logged in.", responseData);
    }

    private async static Task<string> GenerateUniqueUsername(string username, AppDbContext context)
    {
        int i = 1;

        while (await context.Users.AnyAsync(u => u.Username == $"{username}{i}")) // Run while username + i exists
        {
            i++;
        }

        return username + i;
    }

    private string SanitizeName(string name)
{
    // Remove any character that is not a letter (A-Z or a-z)
    return new string(name.Where(char.IsLetter).ToArray());
}
}