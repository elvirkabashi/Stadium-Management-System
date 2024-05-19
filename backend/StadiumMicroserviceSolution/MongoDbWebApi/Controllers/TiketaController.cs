using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDbWebApi.Model;

namespace MongoDbWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiketaController : ControllerBase
    {
        private readonly IMongoCollection<Tiketa> _tiketaCollection;

        public TiketaController() 
        {
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var dbPassword = Environment.GetEnvironmentVariable("DB_ROOT_PASSWORD");
            var connectionString = $"mongodb+srv://lab2admin:{dbPassword}@cluster0.56u6i5m.mongodb.net/{dbName}";


            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            var database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
            _tiketaCollection = database.GetCollection<Tiketa>("tiketa");
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Tiketa>>> GetTiketat()
        {
            return await _tiketaCollection.Find(Builders<Tiketa>.Filter.Empty).ToListAsync();
        }


        [HttpGet("{tiketaId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<Tiketa>> GetById(string tiketaId)
        {
            var filterDefiniton = Builders<Tiketa>.Filter.Eq(x => x.TiketaId, tiketaId);
            return await _tiketaCollection.Find(filterDefiniton).SingleOrDefaultAsync();
        }


        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> Create(Tiketa tiketa)
        {
            await _tiketaCollection.InsertOneAsync(tiketa);
            return Ok();
        }


        //[HttpPut]
        //public async Task<ActionResult> Update(Tiketa tiketa)
        //{
        //    var filterDefinition = Builders<Tiketa>.Filter.Eq(x => x.TiketaId, tiketa.TiketaId);
        //    await _tiketaCollection.ReplaceOneAsync(filterDefinition, tiketa);
        //    return Ok();
        //}


        [HttpDelete("{tiketaId}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> Delete(string tiketaId)
        {
            var filterDefinition = Builders<Tiketa>.Filter.Eq(x => x.TiketaId, tiketaId);
            await _tiketaCollection.DeleteOneAsync(filterDefinition);
            return Ok();
        }

        // GET: api/Tiketa/Exists/{label}
        [HttpGet("Exists/{label}")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<bool>> LabelExists(string label)
        {
            try
            {
                var filter = Builders<Tiketa>.Filter.ElemMatch(t => t.Ulset, u => u.EmriUlses == label);
                var tiketa = await _tiketaCollection.Find(filter).FirstOrDefaultAsync();
                return tiketa != null;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Gabim gjatë kërkesës: {ex.Message}");
            }
        }

    }
}
