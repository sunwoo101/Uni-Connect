using Microsoft.AspNetCore.Mvc;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Services;

namespace UniConnect.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await _authService.RegisterUserAsync(request);

        return Ok(new ApiResponse<UserResponse>(result.Success, result.Message, result.responseData));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginUserAsync(request);

        return Ok(new ApiResponse<UserResponse>(result.Success, result.Message, result.responseData));
    }
}