using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using UserAuthService.Models;
using UserAuthService.Repositories;
using UserAuthService.DTOs;
using UserAuthService.Utilities;


namespace UserAuthService.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly OtpService _otpService;
        private readonly MailjetService _mailjetService;

        // Constructor with Dependency Injection
        public AuthService(
            UserRepository userRepository, 
            OtpService otpService, 
            IConfiguration configuration, 
            MailjetService mailjetService)
        {
            _userRepository = userRepository;
            _otpService = otpService;
            _configuration = configuration;
            _mailjetService = mailjetService;
        }

        // Register Method
        public async Task<bool> RegisterAsync(RegisterRequestDto request)
        {
            if (!IsPasswordValid(request.Password))
            {
                throw new ArgumentException("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
            }

            if (await _userRepository.GetUserByEmailAsync(request.Email) != null)
            {
                throw new InvalidOperationException("Email is already taken.");
            }
            if (await _userRepository.GetUserByUsernameAsync(request.Username) != null)
            {
                throw new InvalidOperationException("Username is already taken.");
            }
            if (await _userRepository.GetUserByPhoneNumberAsync(request.PhoneNumber) != null)
            {
                throw new InvalidOperationException("Phone number is already taken.");
            }

            var hashedPassword = HashingHelper.HashPassword(request.Password);
            var user = new User
            {
                Username = request.Username,
                PasswordHash = hashedPassword,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                DeviceIdentifier = request.DeviceIdentifier,
                LastKnownIP = request.LastKnownIP,
                UserAgent = request.UserAgent,
                TrustedDevice = true,
                OperatingSystem = request.OperatingSystem,
                BrowserName = request.BrowserName
            };

            return await _userRepository.CreateUserAsync(user);
        }

        // Password Validation
        private bool IsPasswordValid(string password)
        {
            var regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$");
            return regex.IsMatch(password);
        }

        // Login Method
        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
        {
            var user = await _userRepository.GetUserByUsernameAsync(request.Username);
            if (user == null || !HashingHelper.VerifyPassword(request.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            bool needsVerification = user.DeviceIdentifier != request.DeviceIdentifier
                || user.LastKnownIP != request.LastKnownIP
                || user.BrowserName != request.BrowserName
                || user.OperatingSystem != request.OperatingSystem;

            if (needsVerification)
            {
                string otp = _otpService.GenerateOtp(user.Username);
                await _mailjetService.SendOtpEmail(user.Username, user.Email, otp);

                user.TrustedDevice = false;
                await _userRepository.UpdateUserAsync(user);

                return new LoginResponseDto { NeedsVerification = true };
            }

            user.LastLoginDate = DateTime.Now;
            await _userRepository.UpdateUserAsync(user);

            return new LoginResponseDto { Token = JwtHelper.GenerateJwtToken(user, _configuration), NeedsVerification = false };
        }

        // Verify OTP Method
        public async Task<LoginResponseDto> VerifyOtpAsync(string username, string otp)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null)
            {
                throw new KeyNotFoundException($"User not found for username: {username}");
            }

            bool isOtpValid = _otpService.VerifyOtp(username, otp);

            if (!isOtpValid)
            {
                throw new UnauthorizedAccessException("Invalid OTP.");
            }

            user.TrustedDevice = true;
            await _userRepository.UpdateUserAsync(user);

            return new LoginResponseDto
            {
                Token = JwtHelper.GenerateJwtToken(user, _configuration),
                NeedsVerification = false
            };
        }
    }
}
