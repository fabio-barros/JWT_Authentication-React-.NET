

using System;
using System.IdentityModel.Tokens.Jwt;
using authDal.Models;
using authDal.Models.ViewModels;


namespace GameCatalogApi.Services
{
    public interface ITokenService
    {
        public string Generatetoken(User user);
        public JwtSecurityToken Verify(string jwt);
    }
}