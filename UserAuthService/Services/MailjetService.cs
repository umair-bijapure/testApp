using Mailjet.Client;
using Mailjet.Client.Resources;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

public class MailjetService
{
    private readonly string apiKey = "6785e60f96338d8dee597bb00e49e2c5";
    private readonly string apiSecret = "8f9d3f338ebf088ba79f606a17de916e";

    public async Task<bool> SendOtpEmail(string name, string email, string otp)
    {
        var client = new MailjetClient(apiKey, apiSecret);

        // Create the message payload
        var requestBody = new JObject
        {
            {
                "Messages", new JArray
                {
                    new JObject
                    {
                        { "From", new JObject { { "Email", "umerbijapure00@gmail.com" }, { "Name", "Umer Bijapure" } } },
                        { "To", new JArray { new JObject { { "Email", email }, { "Name", name } } } },
                        { "Subject", "OTP Verification" },
                        { "TextPart", $"Hello {name}, your OTP is: {otp}" }
                    }
                }
            }
        };

        // Create and configure the request
        var request = new MailjetRequest
        {
            Resource = SendV31.Resource,
            Body = requestBody
        };

        try
        {
            var response = await client.PostAsync(request);
            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                Console.WriteLine($"Failed to send email. Status: {response.StatusCode}, Info: {response.GetErrorMessage()}");
                return false;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }
}
