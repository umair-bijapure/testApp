namespace UserAuthService.DTOs
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public bool NeedsVerification { get; set; }
    }
}
