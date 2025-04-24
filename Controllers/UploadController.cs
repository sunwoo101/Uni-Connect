using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UniConnect.Models.Responses;
using UniConnect.Services;

namespace UniConnect.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly UploadService _uploadService;

    public UploadController(UploadService uploadService)
    {
        _uploadService = uploadService;
    }

    [HttpPost("image")]
    public async Task<IActionResult> UploadImage(IFormFile request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Ok(new ApiResponse<object>(false, "Unauthorized"));

        var result = await _uploadService.UploadImageAsync(request);

        return Ok(new ApiResponse<string?>(result.Success, result.Message, result.responseData));
    }

    [HttpPost("video")]
    public async Task<IActionResult> UploadVideo(IFormFile request)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
            return Ok(new ApiResponse<object>(false, "Unauthorized"));

        var result = await _uploadService.UploadVideoAsync(request);

        return Ok(new ApiResponse<string?>(result.Success, result.Message, result.responseData));
    }
}