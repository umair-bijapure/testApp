using System.Threading.Tasks;
using UserAuthService.Models;
using UserAuthService.Repositories;

namespace UserAuthService.Services
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetUserByEmailAsync(email);
        }


        public async Task<bool> UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUserAsync(user);
            return true;
        }


    }
}
