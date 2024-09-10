using JwtAuthenticationManager.Dtos;
using JwtAuthenticationManager.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Interfaces
{
    public interface IAuthService
    {
        Task<(User, string message)> Login(LoginDto dto);
        Task<(string newAccessToken, string newRefreshToken)> RefreshToken(string oldRefreshToken);
    }
}
