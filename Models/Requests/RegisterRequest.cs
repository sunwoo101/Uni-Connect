/*
    This class is the structure for a register request from the frontend
*/

using System.ComponentModel.DataAnnotations;

namespace UniConnect.Models.Requests;

public class RegisterRequest
{
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Degree { get; set; }
}