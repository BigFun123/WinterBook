using Microsoft.AspNetCore.Mvc;
using WinterBook.Server.Models;
using WinterBook.Server.Data;
using Microsoft.AspNetCore.Authorization;

/**
 * API Controller to manage Bookable objects
 * Add, Update, and Delete Bookables of Cars and Accommodation etc
 */
namespace WinterBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize] // if using jwt
    public class BookablesController : ControllerBase
    {
        private readonly DBAdapter _dBAdapter;
        
        public BookablesController(DBAdapter dBAdapter)
        {
            _dBAdapter = dBAdapter;
        }

        // GET: api/<BookablesController>
        [HttpGet]
        public IEnumerable<IBookable>? Get()
        {
            var records = _dBAdapter.GetRecords() ?? Array.Empty<object>();
            var bookables = records.OfType<IBookable>().ToArray();
            return bookables;
        }

        // GET api/<BookablesController>/5
        [HttpGet("{id}")]
        public IBookable? Get(string id)
        {
            IBookable? bookable = (IBookable?)_dBAdapter.GetRecord(id);
            return bookable;
        }
        
        [HttpPost]
        [Route("accommodation")]
        public JsonResult Post([FromBody] Accommodation bookable)
        {   
            bookable.Room ??= "Standard"; // default value
            bookable.Date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            _dBAdapter.AddRecord(bookable);
            return new JsonResult(new { message = "success" });
        }

        [HttpPost]
        [Route("car")]
        public JsonResult Post([FromBody] Car bookable)
        {
            bookable.Model??= "Sedan"; // default value
            bookable.Date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            _dBAdapter.AddRecord(bookable);
            
            // could check for lots of errors, overposting, jwt, ephemeral ids, etc
            return new JsonResult(new { message = "success" });
        }

        // PUT api/<BookablesController>/5
        [HttpPut("{id}")]
        public JsonResult Put(string id, [FromBody] Accommodation bookable)
        {   
            //todo: for security and overposting just update relevant fields
            _dBAdapter.UpdateRecord(bookable);
            return new JsonResult(new { message = "success" });
        }

        // DELETE api/<BookablesController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            _dBAdapter.Delete(id);
            return new JsonResult(new { message = "success" });
        }
    }
}
