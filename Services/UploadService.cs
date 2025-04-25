/*
    This class contains upload functions
*/

using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace UniConnect.Services;

public class UploadService
{
    private readonly string _connectionString;
    private readonly string _imageContainerName;
    private readonly string _videoContainerName;

    public UploadService(IConfiguration configuration)
    {
        _connectionString = configuration.GetValue<string>("AzureStorage_ConnectionString");
        _imageContainerName = configuration.GetValue<string>("AzureStorage_ImageContainerName");
        _videoContainerName = configuration.GetValue<string>("AzureStorage_VideoContainerName");
    }

    public async Task<(bool Success, string Message, string? responseData)> UploadImageAsync(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return (false, "No image provided.", null);

        var allowedImageTypes = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" };
        var extension = Path.GetExtension(image.FileName).ToLower();

        if (!allowedImageTypes.Contains(extension))
            return (false, "Unsupported image format. Allowed formats: jpg, jpeg, png, gif, bmp, webp.", null);

        if (image.Length > 5 * 1024 * 1024) // 5MB
        {
            return (false, "Image size exceeds the maximum limit of 5MB.", null);
        }

        try
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(_imageContainerName);

            // Ensure the container exists
            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            // Generate a unique file name
            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var blobClient = containerClient.GetBlobClient(fileName);

            // Upload the image
            using (var stream = image.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }

            // Return the URL of the uploaded file
            string fileUrl = blobClient.Uri.ToString();
            return (true, "Successfully uploaded image.", fileUrl);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            // For example, using Serilog or another logging mechanism
            return (false, $"An error occurred during the upload process: {ex.Message}", null);
        }
    }

    public async Task<(bool Success, string Message, string? responseData)> UploadVideoAsync(IFormFile video)
    {
        if (video == null || video.Length == 0)
            return (false, "No video provided.", null);

        var allowedVideoTypes = new[] { ".mp4", ".mov", ".avi", ".webm", ".mkv" };
        var extension = Path.GetExtension(video.FileName).ToLower();

        if (!allowedVideoTypes.Contains(extension))
            return (false, "Unsupported video format. Allowed formats: mp4, mov, avi, webm, mkv.", null);

        if (video.Length > 50 * 1024 * 1024) // 50MB
        {
            return (false, "Video size exceeds the maximum limit of 50MB.", null);
        }

        try
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(_videoContainerName);

            // Ensure the container exists
            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            // Generate a unique file name
            var fileName = Guid.NewGuid() + Path.GetExtension(video.FileName);
            var blobClient = containerClient.GetBlobClient(fileName);

            // Upload the video
            using (var stream = video.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }

            // Return the URL of the uploaded file
            string fileUrl = blobClient.Uri.ToString();
            
            return (true, "Successfully uploaded video.", fileUrl);
        }
        catch (Exception ex)
        {
            // Log the exception if needed
            // For example, using Serilog or another logging mechanism
            return (false, $"An error occurred during the upload process: {ex.Message}", null);
        }
    }
}