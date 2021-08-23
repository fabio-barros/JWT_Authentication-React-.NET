using System;
using System.ComponentModel.DataAnnotations;


namespace authDal.Models.InputModels
{
    public class UserInputModel
    {

        [Required]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "First Name length must be at least 3 and up to a maximum of 10 characters long.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 3, ErrorMessage = "Last Name length must be at least 3 and up to a maximum of 10 characters long.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(20)]
        [RegularExpression(@"^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", ErrorMessage = "Invalid Email Format")]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "Password length must be at least 8 and up to 50 characters long.")]
        public string Password { get; set; }
    }
}