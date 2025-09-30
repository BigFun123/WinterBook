using Microsoft.AspNetCore.Mvc;
using WinterBook.Server.Models;

/**
 * Retrieve a list of offerings
 * This is a demo endpoint returning hardcoded data
 **/
namespace WinterBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferingsController : ControllerBase
    {
        // GET: api/<OfferingsController>
        [HttpGet]
        public IEnumerable<IBookable> Get()
        {
            var offerings = new List<IBookable>();
            offerings.Add(new Car() { Title="Fancy Car", Provider="Hertz" } );
            offerings.Add(new Accommodation() { Title="Luxury House", Provider = "AirBnB" } );
            return offerings.ToArray();
        }
    }
}
