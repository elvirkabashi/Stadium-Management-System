using JwtAuthenticationManager.Data;
using JwtAuthenticationManager.Dtos;
using JwtAuthenticationManager.Helpers;
using JwtAuthenticationManager.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtAuthenticationManager.Services;
public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly UserDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly string _jwtSecretKey;
    private readonly string _refreshTokenSecretKey;

    public AuthService(UserManager<ApplicationUser> userManager, UserDbContext context, IConfiguration configuration)
    {
        _userManager = userManager;
        _context = context;
        _configuration = configuration;
        _jwtSecretKey = configuration["Jwt:SecretKey"];
        _refreshTokenSecretKey = configuration["Jwt:RefreshTokenSecretKey"];
    }

    public async Task<(User, string message)> Login(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Username);
        if (user == null) return (null, "User not found");

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!isPasswordValid) return (null, "Invalid login attempt");

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken(user);

        var roles = await _userManager.GetRolesAsync(user);
        return (new User
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            Roles = roles,
            Token = token,
            RefreshToken = refreshToken
        }, string.Empty);
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("t7xL@YvF6t$6z8Pb3lM+9uE#qZ1b5m2W@hV0yF!dR8o%aJkT");

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
            Expires = DateTime.UtcNow.AddMinutes(15), // Short-lived access token
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private string GenerateRefreshToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("6cQdH8jT@k#4xYvP9$wZ1m8B2l+f7rV!N3uX@b6M");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7), // Longer-lived refresh token
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<(string newAccessToken, string newRefreshToken)> RefreshToken(string oldRefreshToken)
    {
        var principal = GetPrincipalFromExpiredToken(oldRefreshToken);
        var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return (null, "Invalid refresh token");

        var newAccessToken = GenerateJwtToken(user);
        var newRefreshToken = GenerateRefreshToken(user);

        return (newAccessToken, newRefreshToken);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("6cQdH8jT@k#4xYvP9$wZ1m8B2l+f7rV!N3uX@b6M");
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };

        return tokenHandler.ValidateToken(token, validationParameters, out _);
    }
}
