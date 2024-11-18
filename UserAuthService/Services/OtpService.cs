namespace UserAuthService.Services
{
    public class OtpService
    {
        private static readonly Lazy<OtpService> _instance = new(() => new OtpService());
        private readonly Dictionary<string, (string otp, DateTime generatedAt)> _otpStorageWithExpiry;

        private OtpService()
        {
            _otpStorageWithExpiry = new Dictionary<string, (string otp, DateTime generatedAt)>();
        }

        public static OtpService Instance => _instance.Value;

        public string GenerateOtp(string username)
        {
            string otp = new Random().Next(100000, 999999).ToString();
            _otpStorageWithExpiry[username] = (otp, DateTime.UtcNow);

            Console.WriteLine($"Generated OTP for {username}: {otp}");
            PrintOtpStorage();
            return otp;
        }

        public bool VerifyOtp(string username, string otp)
        {
            Console.WriteLine($"Verifying OTP for {username}: {otp}");
            PrintOtpStorage();

            if (_otpStorageWithExpiry.TryGetValue(username, out var otpData))
            {
                var (storedOtp, generatedAt) = otpData;

                if ((DateTime.UtcNow - generatedAt).TotalMinutes > 5)
                {
                    Console.WriteLine($"OTP expired for {username}. Generated at: {generatedAt}");
                    _otpStorageWithExpiry.Remove(username);
                    return false;
                }

                Console.WriteLine($"Stored OTP for {username}: {storedOtp}");
                return storedOtp == otp;
            }

            Console.WriteLine($"No OTP found for {username}. Current Storage: {string.Join(", ", _otpStorageWithExpiry.Keys)}");
            return false;
        }

        private void PrintOtpStorage()
        {
            Console.WriteLine("Current OTP Storage:");
            foreach (var kvp in _otpStorageWithExpiry)
            {
                string username = kvp.Key;
                var (otp, generatedAt) = kvp.Value;
                Console.WriteLine($"Username: {username}, OTP: {otp}, Generated At: {generatedAt}");
            }
        }
    }
}
