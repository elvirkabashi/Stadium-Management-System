using JwtAuthenticationManager.Data;
using JwtAuthenticationManager.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JwtAuthenticationManager.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JwtAuthenticationManager.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserDbContext _context;
        private UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            IAuthService authService,
            UserManager<ApplicationUser> userManager,
            UserDbContext context,
            IConfiguration configuration
        )
        {
            _authService = authService;
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var result = await _authService.Login(dto);

                if (result.Item1 == null)
                {
                    return BadRequest(new { message = result.message });
                }

                return Ok(result.Item1);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in login: " + ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(model.Email.Trim());

                if (userExists != null)
                    return BadRequest(new { message = "This user already exists. Please use your credentials to log in." });

                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber.Trim(),
                };

                var result = await _userManager.CreateAsync(user, model.Password.Trim());

                if (!result.Succeeded) return BadRequest(new { message = "Could not create your user. Please try again." });

                var addedToRole = await _userManager.AddToRoleAsync(user, "User");

                if (!addedToRole.Succeeded)
                    return BadRequest(new { message = "Could not create your user. Please try again." });                

                var mycustomer = new RegisteredDto
                {
                    Id = user.Id
                };

                return Ok(mycustomer);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while registering!");
            }
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto dto)
        {
            try
            {
                var result = await _authService.RefreshToken(dto.RefreshToken);

                if (result.newAccessToken == null)
                {
                    return BadRequest("Error in refresh token");
                }

                return Ok(new
                {
                    AccessToken = result.newAccessToken,
                    RefreshToken = result.newRefreshToken
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error refreshing token: " + ex.Message });
            }
        }

    }
}
