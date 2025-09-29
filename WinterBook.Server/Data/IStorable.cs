using System.ComponentModel.DataAnnotations;

namespace WinterBook.Server.Data
{
    public interface IStorable
    {
        [Key]
        public string? Id { get; set; }
        public string? ObjectType { get; set; }
    }
}
