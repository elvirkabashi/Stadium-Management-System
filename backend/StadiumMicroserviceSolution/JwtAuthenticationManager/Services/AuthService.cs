using JwtAuthenticationManager.Data;
using JwtAuthenticationManager.Dtos;
using JwtAuthenticationManager.Helpers;
using JwtAuthenticationManager.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApplicationUser> userManager, UserDbContext context, IConfiguration configuration) {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
        }
        public async Task<(User, string message)> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Username);
            if (user == null) return (null, "User not found");

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (isPasswordValid)
            {
                var token = GenerateJwtToken(user);
                var roles = await _userManager.GetRolesAsync(user);

                if (roles.Contains("Admin"))
                {
                    return (new User
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        Email = user.Email,
                        Roles = await _userManager.GetRolesAsync(user),
                        Token = token,
                    }, string.Empty);
                }

                if (roles.Contains("User"))
                {
                    return (new User
                    {
                        Id = user.Id,
                        Username = user.UserName,
                        Email = user.Email,
                        Roles = await _userManager.GetRolesAsync(user),
                        Token = token,
                    }, string.Empty);
                }

                return (new User
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Roles = await _userManager.GetRolesAsync(user),
                    Token = token,
                }, string.Empty);
            }
            return (null, "Invalid login attempt");
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING");

            var claims = new List<Claim>
                {
                    new(ClaimTypes.NameIdentifier, user.Id),
                    new(ClaimTypes.Name, user.UserName)
                };

            var roles = _userManager.GetRolesAsync(user).Result;
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
