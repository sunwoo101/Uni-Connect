/*
    This class is the structure for a login response from the frontend
*/

namespace UniConnect.Models.Responses;

public class UserResponse
{
    public required int Id { get; set; }
    public required string Role { get; set; }
    public required string Username { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Degree { get; set; }
    public string? ProfileImageURL { get; set; }
}