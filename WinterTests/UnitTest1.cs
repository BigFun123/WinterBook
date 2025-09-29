using Moq;
using WinterBook.Server.Data;

namespace WinterTests
{
    public class UnitTest1
    {
        [Fact]
        public void TestBookables ()
        {
            var dbAdapter = new DBAdapter();
            dbAdapter.AddRecord(new Mock<IStorable>().Object);
            var records = dbAdapter.GetRecords();
            Assert.NotNull(records);
        }

        [Fact]
        public void TestController( )
        {
            var mockDb = new Mock<IDatabase>();
            mockDb.Setup(db => db.GetRecords()).Returns(new IStorable[] { });
            var dbAdapter = new DBAdapter();
            var controller = new WinterBook.Server.Controllers.BookablesController(dbAdapter);
            var result = controller.Get();
            Assert.NotNull(result);
        }
    }
}