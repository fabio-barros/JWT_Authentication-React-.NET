using System;
using System.Threading.Tasks;
using authDal.Models.InputModels;
using authDal.Models.ViewModels;

namespace authDal.Services.UserServices
{
    public interface IUserService : IDisposable
    {
        Task<UserViewModel> Add(UserInputModel user);
        // Task<UserViewModel> Get(Guid id);
        Task<UserViewModel> Login(LoginInputModel loginInput);

    }
}