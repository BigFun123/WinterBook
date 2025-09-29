/**
 * Storage interface for simple records 
 */
namespace WinterBook.Server.Data
{
    public interface IDatabase
    {
        void Connect();

        void Disconnect();

        public IStorable[]? GetRecords();

        public IStorable? GetRecord(string id);

        void AddRecord(IStorable record);

        void UpdateRecord(IStorable record);

        void Delete(string id);
    }
}
