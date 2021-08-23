using System;

namespace authDal.Exceptions
{
    public class UserDoesNotExistException : Exception
    {

        public UserDoesNotExistException() : base("User not Found.")
        {

        }
    }
}