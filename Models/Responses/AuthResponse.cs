/*
    This class is the structure for an auth response to the frontend
*/

namespace UniConnect.Models.Responses;

public class AuthResponse
{
    public required UserResponse UserResponse { get; set; }
    public required string Token { get; set; }
}