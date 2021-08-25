using System;
using System.Text.Json.Serialization;

namespace authDal.Models.ViewModels
{
    public class UserViewModel
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }



    }
}