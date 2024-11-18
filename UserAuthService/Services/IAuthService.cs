using System.Threading.Tasks;
using UserAuthService.DTOs;

namespace UserAuthService.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterRequestDto request);
        Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
        Task<LoginResponseDto> VerifyOtpAsync(string username, string otp);
    }
}
