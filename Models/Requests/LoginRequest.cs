/*
    This class is the structure for a login request to the frontend
*/

using System.ComponentModel.DataAnnotations;

namespace UniConnect.Models.Requests;

public class LoginRequest
{
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
}