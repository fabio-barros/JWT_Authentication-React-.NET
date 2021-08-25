using System;
using System.Threading.Tasks;
using authDal.Models;
using authDal.Models.InputModels;
using authDal.Models.ViewModels;

namespace authDal.Services.UserServices
{
    public interface IUserService : IDisposable
    {
        Task<UserViewModel> Add(UserInputModel user);
        // Task<UserViewModel> Get(Guid id);
        Task<User> Login(LoginInputModel loginInput);
        Task<UserViewModel> Get(Guid Id);

    }
}