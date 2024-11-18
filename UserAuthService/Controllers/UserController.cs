using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UserAuthService.Models;
using UserAuthService.Services;

namespace UserAuthService.Controllers
{
    [ApiController]
    [Route("api/User")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("getByUsername/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var user = await _userService.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return NotFound($"No user found with username: {username}");
            }

            return Ok(user);
        }

        [HttpGet("getByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"No user found with email: {email}");
            }

            return Ok(user);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            var isUpdated = await _userService.UpdateUserAsync(user);
            if (isUpdated)
            {
                return Ok("User updated successfully.");
            }

            return StatusCode(500, "Error updating user.");
        }
    }
}
