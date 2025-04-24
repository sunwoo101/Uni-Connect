using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Services;

namespace UniConnect.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _profileService;

    public ProfileController(ProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpPost("update")]
    public async Task<IActionResult> Register([FromBody] UpdateProfileRequest request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Ok(new ApiResponse<object>(false, "Unauthorized"));

        request.UserId = int.Parse(userIdClaim);
        
        var result = await _profileService.UpdateProfileAsync(request);

        return Ok(new ApiResponse<UserResponse?>(result.Success, result.Message, result.responseData));
    }
}