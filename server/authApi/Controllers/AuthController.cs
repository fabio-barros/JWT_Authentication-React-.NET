using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;

namespace authApi.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Ok("Success");
        }

    }
}