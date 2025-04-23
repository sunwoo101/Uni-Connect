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
    public async Task<IActionResult> Create([FromBody] CreatePostRequest request)
    {
        var result = await _postService.CreatePostAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("fetch")]
    public async Task<IActionResult> Fetch([FromBody] FetchPostsRequest request)
    {
        var result = await _postService.FetchPostsAsync(request);

        return Ok(new ApiResponse<List<PostResponse>>(result.Success, result.Message, result.responseData));
    }

    [HttpPost("fetchSingular")]
    public async Task<IActionResult> FetchSingular([FromBody] FetchPostRequest request)
    {
        var result = await _postService.FetchPostAsync(request);

        return Ok(new ApiResponse<PostResponse>(result.Success, result.Message, result.responseData));
    }

    [HttpPost("like")]
    public async Task<IActionResult> Like([FromBody] LikePostRequest request)
    {
        var result = await _postService.AddLikeAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("removeLike")]
    public async Task<IActionResult> RemoveLike([FromBody] LikePostRequest request)
    {
        var result = await _postService.RemoveLikeAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("save")]
    public async Task<IActionResult> Save([FromBody] SavePostRequest request)
    {
        var result = await _postService.AddSaveAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("removeSave")]
    public async Task<IActionResult> RemoveSave([FromBody] SavePostRequest request)
    {
        var result = await _postService.RemoveSaveAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("attendEvent")]
    public async Task<IActionResult> AddEventAttendee([FromBody] AttendEventRequest request)
    {
        var result = await _postService.AddEventAttendeeAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("removeAttendEvent")]
    public async Task<IActionResult> RemoveEventAttendee([FromBody] AttendEventRequest request)
    {
        var result = await _postService.RemoveEventAttendeeAsync(request);

        return Ok(new ApiResponse<object>(result.Success, result.Message));
    }

    [HttpPost("addComment")]
    public async Task<IActionResult> AddComment([FromBody] AddCommentRequest request)
    {
        var result = await _postService.AddCommentAsync(request);

        return Ok(new ApiResponse<CommentResponse>(result.Success, result.Message, result.responseData));
    }

    [HttpPost("fetchComments")]
    public async Task<IActionResult> FetchComments([FromBody] FetchCommentsRequest request)
    {
        var result = await _postService.FetchCommentsAsync(request);

        return Ok(new ApiResponse<List<CommentResponse>>(result.Success, result.Message, result.responseData));
    }
}