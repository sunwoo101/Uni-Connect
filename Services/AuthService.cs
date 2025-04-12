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

    public async Task<(bool Success, string Message, LoginResponse? LoginResponse)> RegisterUserAsync(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return (false, "Email is already registered.", null);

        string username = request.Email.Split("@")[0];

        if (await _context.Users.AnyAsync(u => u.Username == username))
            username = await GenerateUniqueUsername(username, _context);

        var newUser = new User
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

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        var loginResponse = new LoginResponse
        {
            Role = newUser.Role.ToString(),
            Username = newUser.Username,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Degree = newUser.Degree
        };

        return (true, "Successfully registered.", loginResponse);
    }

    public async Task<(bool Success, string Message, LoginResponse? LoginResponse)> LoginUserAsync(LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        
        if (user == null || !PasswordHelper.VerifyPassword(request.Password, user.PasswordHash))
            return (false, "Invalid Email or Password.", null);

        var loginResponse = new LoginResponse
        {
            Role = user.Role.ToString(),
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Degree = user.Degree
        };

        return (true, "Successfully logged in.", loginResponse);
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