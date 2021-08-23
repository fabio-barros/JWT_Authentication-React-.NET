using System;

namespace authDal.Exceptions
{
    public class UserAlredyExistException : Exception
    {
        public UserAlredyExistException() : base("An account with this email address is already registered.")
        {

        }

    }
}