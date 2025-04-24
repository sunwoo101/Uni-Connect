/*
    This class is the structure for an update profile request from the frontend
*/

using System.ComponentModel.DataAnnotations;

namespace UniConnect.Models.Requests;

public class UpdateProfileRequest
{
    public int UserId { get; set; } = 0;
    public required string Username { get; set; }
    public required string Degree { get; set; }
    public string? ProfileImageURL { get; set; }
}