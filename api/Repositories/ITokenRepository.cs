using HelpdeskAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace HelpdeskAPI.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(User user);
    }
}
