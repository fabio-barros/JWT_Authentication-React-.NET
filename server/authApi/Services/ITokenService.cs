

using authDal.Models.ViewModels;


namespace GameCatalogApi.Services
{
    public interface ITokenService
    {
        public string Generatetoken(UserViewModel user);
    }
}