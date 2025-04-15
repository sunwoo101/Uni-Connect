using Microsoft.AspNetCore.Mvc;
using UniConnect.Models.Requests;
using UniConnect.Models.Responses;
using UniConnect.Services;

namespace UniConnect.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private readonly PostService _postService;

    public PostController(PostService postService)
    {
        _postService = postService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(CreatePostRequest request)
    {
        var result = await _postService.CreatePostAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }
}