using System;
using System.Threading.Tasks;
using authDal.DB;
using authDal.Exceptions;
using authDal.Models;
using authDal.Models.InputModels;
using authDal.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace authDal.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly AuthDalContext _context;
        public UserService(AuthDalContext context)
        {
            _context = context;

        }

        public static User newUserModel(UserInputModel user)
        {
            return new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
            };
        }

        public static UserViewModel newUserViewModel(User user)
        {
            return new UserViewModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                // Password = user.Password
            };
        }

        public async Task<User> Login(LoginInputModel loginInput)
        {
            var userEntityFromDb = await _context.Users.FirstOrDefaultAsync(person => person.Email.Equals(loginInput.Email));

            if (userEntityFromDb is null)
            {
                return null;
            }

            return userEntityFromDb;

        }

        public async Task<UserViewModel> Get(Guid Id)
        {
            var userEntityFromDb = await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(Id));

            if (userEntityFromDb == null)
            {
                throw new UserDoesNotExistException();
            }

            return newUserViewModel(userEntityFromDb);

        }

        public async Task<UserViewModel> Add(UserInputModel userInput)
        {
            var userEntityFromDb = await _context.Users.AnyAsync(user => user.Email.Equals(userInput.Email));
            if (userEntityFromDb)
            {
                throw new UserAlredyExistException();
            }

            var newUser = newUserModel(userInput);

            _context.Users.Add(newUser);

            try
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new DbUpdateConcurrencyException();
            }

            var newUserFromDB = await _context.Users.FirstOrDefaultAsync(x => x.Email == newUser.Email);
            return newUserViewModel(newUserFromDB);
        }

        public void Dispose()
        {
            _context?.Dispose();
        }



    }

}
