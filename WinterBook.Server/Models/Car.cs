namespace WinterBook.Server.Models
{
    public class Car : IBookable
    {   
        public string? Id { get; set; }
        public string? ObjectType { get; set; } = "Car";
        public string? Date { get; set; }
        public string? Title { get ; set ; }
        public string? Provider { get ; set ; }
        public string? Customer { get ; set ; }
        public string? Model { get; set; }
    }
}
