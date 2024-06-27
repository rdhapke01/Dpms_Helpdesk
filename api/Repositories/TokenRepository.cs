using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace HelpdeskAPI.Repositories
{
    public class TokenRepository:ITokenRepository
    {
        private readonly IConfiguration configuration;

        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateJWTToken(User user)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                configuration["JWT:Issuer"],
                configuration["Jwt:Audience"],
                expires: DateTime.Now.AddDays(1),
               signingCredentials: credential

                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
