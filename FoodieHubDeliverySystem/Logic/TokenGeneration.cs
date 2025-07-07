using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodieHubDeliverySystem.Logic
{
    public class TokenGeneration
    {
        private readonly IConfiguration _config;
        public TokenGeneration(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(string userId)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, userId)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JwtSettings:DurationInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
