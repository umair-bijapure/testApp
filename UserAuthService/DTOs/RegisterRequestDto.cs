namespace UserAuthService.DTOs
{
    public class RegisterRequestDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public string DeviceIdentifier { get; set; }
        public string LastKnownIP { get; set; }
        public string UserAgent { get; set; }
        public string OperatingSystem {get;set;}
        public string BrowserName {get;set;}
    }
}
