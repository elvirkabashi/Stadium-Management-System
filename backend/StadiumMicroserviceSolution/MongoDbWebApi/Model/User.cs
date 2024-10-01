using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoDbWebApi.Model
{
    public class User
    {
        [BsonElement("Id"), BsonRepresentation(BsonType.String)]
        public string Id { get; set; }
        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string Email { get; set; }
    }
}
