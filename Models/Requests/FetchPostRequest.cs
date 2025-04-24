/*
    This class is the structure for a singular fetch post request from the frontend
*/

namespace UniConnect.Models.Requests;

public class FetchPostRequest
{
    public int UserId { get; set; } = 0;
    public required int PostId { get; set; }
}