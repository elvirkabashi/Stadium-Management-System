using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDbWebApi.Model
{
    [Serializable, BsonIgnoreExtraElements]
    public class Ulsja
    {
        [BsonElement("emri_ulses"), BsonRepresentation(BsonType.String)]
        public string EmriUlses { get; set; }
        [BsonElement("cmimi"), BsonRepresentation(BsonType.Decimal128)]
        public decimal CmimiUlses { get; set; }
    }
}
