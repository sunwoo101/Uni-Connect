/*
    This class contains upload functions
*/

namespace UniConnect.Services;

public class UploadService
{
    private readonly IWebHostEnvironment _environment;

    public UploadService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<(bool Success, string Message, string? responseData)> UploadImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return (false, "No image provided.", null);

        var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads/images");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create)) // Bookmark: use Azure API for deployment
        {
            await image.CopyToAsync(stream);
        }

        var fileUrl = $"/uploads/images/{fileName}";

        return (true, "Successfully registered.", fileUrl);
    }
}