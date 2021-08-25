using System;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using authDal.Models;
using authDal.Models.ViewModels;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace GameCatalogApi.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;

        }


        public string Generatetoken(User user)
        {

            var key = Encoding.ASCII.GetBytes(_config.GetSection("JwtConfig:Secret").Value);
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload(user.Id.ToString(), null, new Claim[]
              {
                    new Claim(ClaimTypes.Role, user.Email.ToString()),
                    new Claim(ClaimTypes.Name, string.Join(" ", new[] {user.FirstName.ToString(), user.LastName.ToString()})),
              }, null, DateTime.UtcNow.AddMinutes(5));

            var tokenHandler = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(tokenHandler);

        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("JwtConfig:Secret").Value);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;

        }



    }
}