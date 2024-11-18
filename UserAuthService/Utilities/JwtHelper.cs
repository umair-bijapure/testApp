using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using UserAuthService.Models;
using System.Text;
using Microsoft.Extensions.Configuration;  // Import this for Configuration

namespace UserAuthService.Utilities
{
    public static class JwtHelper
    {
        // This method will generate the JWT token for a user
        public static string GenerateJwtToken(User user, IConfiguration configuration)
        {
            // Read the JWT settings from configuration
            var jwtSettings = configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]); // Fetch the key from appsettings
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var durationInMinutes = Convert.ToDouble(jwtSettings["DurationInMinutes"]);

            // Create the token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()), // Add more claims as needed
                }),
                Expires = DateTime.UtcNow.AddMinutes(durationInMinutes), // Set expiration time
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) // Use the key to sign the JWT
            };

            // Create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token); // Return the token as a string
        }
    }
}
