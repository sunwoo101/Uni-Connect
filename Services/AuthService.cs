using Microsoft.EntityFrameworkCore;
using UniConnect.Models.Entities;
using UniConnect.Models.Requests;
using UniConnect.Utilities;

namespace UniConnect.Services;

public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string? ErrorMessage)> RegisterUserAsync(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return (false, "Email is already registered.");

        string username = request.Email.Split("@")[0];

        if (await _context.Users.AnyAsync(u => u.Username == username))
            username = await GenerateUniqueUsername(username, _context);

        var newUser = new User
        {
            Username = username,
            PasswordHash = PasswordHelper.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Degree = request.Degree,
            CreationDate = DateTime.UtcNow
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return (true, null);
    }

    public async Task<(bool Success, string? ErrorMessage)> LoginUserAsync(LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        
        if (user == null || !PasswordHelper.VerifyPassword(request.Password, user.PasswordHash))
            return (false, "Invalid Email or Password.");

        return (true, null);
    }

    private async static Task<string> GenerateUniqueUsername(string username, AppDbContext context)
    {
        int i = 1;
        while (await context.Users.AnyAsync(u => u.Username == $"{username}{i}"))
        {
            i++;
        }
        return username + i;
    }
}