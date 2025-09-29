using System.ComponentModel.DataAnnotations;

using WinterBook.Server.Data;

namespace WinterBook.Server.Models
{
    public interface IBookable : IStorable
    {        
        public string? Title { get; set; }
        public string? Provider { get; set; }        
        public string? Customer { get ; set; }
    }
}
