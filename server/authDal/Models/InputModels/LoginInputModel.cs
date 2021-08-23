using System.ComponentModel.DataAnnotations;

namespace authDal.Models.InputModels
{
    public class LoginInputModel
    {
        [Required]
        [EmailAddress]
        [RegularExpression(@"^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", ErrorMessage = "Invalid Email Format")]
        public string Email { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password length must be at least 8 and up to a maximum of 20 characters long.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}