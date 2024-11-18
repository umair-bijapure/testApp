using System;

namespace UserAuthService.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string DeviceIdentifier { get; set; }
        public string LastKnownIP { get; set; }
        public string UserAgent { get; set; }

        public string OperatingSystem {get;set;}

        public string BrowserName {get;set;}
        public bool TrustedDevice { get; set; }
        public DateTime LastLoginDate { get; set; }
         
    }
}
