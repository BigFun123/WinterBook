using System.Collections.Generic;
using WinterBook.Server.Models;

namespace WinterBook.Server.Data
{
    public class MemoryDB : IDatabase
    {
        List<IStorable> records = new List<IStorable>(); 

        public void Connect()
        {
            Console.WriteLine("MemoryDB Connected");
        }

        public void Disconnect()
        {
            Console.WriteLine("MemoryDB Disconnected");
        }

        public IStorable? Find(string id)
        {
            return records.Find(r => r.Id != null && r.Id.Equals(id));
        }

        public IStorable[]? GetRecords()
        {
            return records.ToArray();
        }

        public IStorable? GetRecord(string id)
        {            
            return Find(id);
        }

        public void AddRecord(IStorable record)
        {   
            // Generate a unique hash as Id using Guid
            string hash = Guid.NewGuid().ToString("N");            
            record.Id = hash;
            records.Add(record);            
        }

        public void UpdateRecord(IStorable record)
        {
            if (record.Id == null)
            {   
                return;
            }
            IStorable? storable = Find(record.Id);

            if (storable?.Id != null)
            {
                Delete(storable.Id);
            }
            AddRecord(record);

            //todo: update only diff fields. we're simply overwriting the existing record for demo
        }

        public void Delete(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return;
            }
            // remove the record with id
            var record = Find(id);
            if (record != null)
            {
                records.Remove(record);
            }
        }
    }
}
