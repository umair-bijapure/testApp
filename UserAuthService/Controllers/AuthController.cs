using Microsoft.AspNetCore.Mvc;
using UserAuthService.DTOs;
using UserAuthService.Services;
using System.Threading.Tasks;
using UserAuthService.Repositories;
using UserAuthService.Utilities;

namespace UserAuthService.Controllers
{
    [ApiController]
    [Route("api/Auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            var result = await _authService.RegisterAsync(request);
            return result ? Ok("User registered successfully.") : BadRequest("Registration failed.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var response = await _authService.LoginAsync(request);
            if (response == null)
                return Unauthorized("Invalid login credentials.");

            return Ok(response);
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequestDto request)
        {
            var response = await _authService.VerifyOtpAsync(request.Username, request.Otp);

            if (response == null)
                return Unauthorized("Invalid OTP.");

            return Ok(response); // Return the LoginResponseDto object
        }


        
    }
}
