using Microsoft.AspNetCore.Mvc;
using UniConnect.Models.Responses;
using UniConnect.Services;

namespace UniConnect.Controllers;

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
    public async Task<IActionResult> UploadImage([FromForm] IFormFile request)
    {
        var result = await _uploadService.UploadImage(request);

        return Ok(new ApiResponse<string?>(result.Success, result.Message, result.responseData));
    }
}