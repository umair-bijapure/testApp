using System.Threading.Tasks;
using UserAuthService.Models;

namespace UserAuthService.Services
{
    public interface IUserService
    {
      
        Task<User> GetUserByUsernameAsync(string username);
        Task<User> GetUserByEmailAsync(string email);
        Task<bool> UpdateUserAsync(User user);
        
    }
}
