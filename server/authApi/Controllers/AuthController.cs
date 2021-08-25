
using System;
using System.Net.Http;
using System.Threading.Tasks;
using authDal.Exceptions;
using authDal.Models.InputModels;
using authDal.Models.ViewModels;
using authDal.Services.UserServices;
using GameCatalogApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace authApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    // [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _services;
        private readonly ITokenService _tokenService;

        public AuthController(IUserService context, ITokenService tokenService)
        {
            _services = context;
            _tokenService = tokenService;


        }

        [HttpPost("register")]
        // [AllowAnonymous]
        public async Task<ActionResult<UserViewModel>> Register([FromBody] UserInputModel userInput)
        {

            if (userInput is null)
                return BadRequest(new ArgumentNullException());

            userInput.Password = BCrypt.Net.BCrypt.HashPassword(userInput.Password);

            try
            {
                var userEntity = await _services.Add(userInput);

                return Created("Success", userEntity);

            }
            catch (Exception e)
            {
                return UnprocessableEntity(e.Message); ;
            }



        }

        [HttpPost("login")]
        // [Authorize]
        public async Task<ActionResult<dynamic>> Login([FromBody] LoginInputModel loginInput)
        {

            if (loginInput is null)
                return BadRequest(new ArgumentNullException());

            try
            {
                var userFromDb = await _services.Login(loginInput);

                if (userFromDb is null || !BCrypt.Net.BCrypt.Verify(loginInput.Password, userFromDb.Password))
                {
                    return BadRequest("Invalid Credentials.");
                }
                var token = _tokenService.Generatetoken(userFromDb);
                Response.Cookies.Append("jwt", token, new CookieOptions { Expires = DateTime.Now.AddMinutes(15), HttpOnly = true });

                return Ok(new { message = "Success" });

            }
            catch (Exception e)
            {
                return UnprocessableEntity(e.Message);
            }
        }

        [HttpGet("authenticate")]
        public async Task<ActionResult<dynamic>> Authenticate()
        {
            var jwt = Request.Cookies["jwt"];

            if (jwt == null)
            {
                return Unauthorized();
            }

            var token = _tokenService.Verify(jwt);

            Guid userId = Guid.Parse(token.Issuer);

            try
            {
                var user = await _services.Get(userId);

                return user;
            }
            catch (Exception e)
            {
                return UnprocessableEntity(e.Message);
            }


        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {

            Response.Cookies.Delete("jwt");

            return Ok(new { message = "Logout Success!" });


        }

        [HttpGet]
        [Route("user")]
        [Authorize(Roles = "nashville@email.com")]
        public string Userr() => "User";

        [HttpGet]
        [Route("admin")]
        [Authorize(Roles = "admin")]
        public string Admin() => "Admin";


    }
}