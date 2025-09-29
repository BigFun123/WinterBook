using WinterBook.Server.Data;

namespace WinterBook.Server.Models
{
    public class Accommodation : IBookable
    {
        public string? Id { get; set; }
        public string? ObjectType { get; set; } = "Accommodation";
        public string? Title { get; set; }
        public string? Provider { get; set; }
        public string? Customer { get; set; }
        public string? Room { get; set; }
    }
}
