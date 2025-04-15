/*
    This class is the structure for a login response for the frontend
*/

namespace UniConnect.Models.Responses;

public class LoginResponse
{
    public required int Id { get; set; }
    public required string Role { get; set; }
    public required string Username { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Degree { get; set; }
}