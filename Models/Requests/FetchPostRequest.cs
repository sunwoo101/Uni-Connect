/*
    This class is the structure for a singular fetch post request to the frontend
*/

namespace UniConnect.Models.Requests;

public class FetchPostRequest
{
    public required int UserId { get; set; }
    public required int PostId { get; set; }
}