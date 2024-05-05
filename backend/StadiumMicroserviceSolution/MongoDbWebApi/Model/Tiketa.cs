using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDbWebApi.Model
{
    [Serializable, BsonIgnoreExtraElements]
    public class Tiketa
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string TiketaId { get; set; }
        [BsonElement("userId"), BsonRepresentation(BsonType.String)]
        public string UserId { get; set; }
        [BsonElement("eventId"), BsonRepresentation(BsonType.Int32)]
        public int EventId { get; set; }
        [BsonElement("data_rezervimit"), BsonRepresentation(BsonType.DateTime)]
        public DateTime DataRezervimit { get; set; } = DateTime.Now;
        [BsonElement("ulset")]
        public List<Ulsja> Ulset { get; set; }
        [BsonElement("total"), BsonRepresentation(BsonType.Decimal128)]
        public decimal Total {  get; set; }
    }
}
