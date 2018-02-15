using System.Configuration;
using Autofac;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Tests.IoC;
using FluentAssertions;
using NUnit.Framework;
using Utils.Data.DatabaseClient;
using Utils.Data.DatabaseClient.Abstractions;
using Utils.Data.DatabaseClient.FileSystem;
using Utils.Data.DatabaseClient.SqlServer;

namespace Cimplicity.Views.Tests.Data
{
    public class BaseDataTests : BaseTests
    {
        private readonly string _testConnectionString = ConfigurationManager.ConnectionStrings["data_test"].ConnectionString;

        [SetUp]
        public override void Setup()
        {
            IStorageManager manager = StorageManagerFactory.CreateDatabaseManager(_testConnectionString);
            manager.Query(Properties.Resources._01_sp_VCC_local_reportOverview);
            manager.Query(Properties.Resources._02_Split);
            manager.Query(Properties.Resources._03_ReportOverview);
            manager.Query(Properties.Resources._04_data);
            base.Setup();
        }


        [TearDown]
        public override void TearDown()
        {
            base.TearDown();
            IStorageManager manager = StorageManagerFactory.CreateDatabaseManager(_testConnectionString);
            manager.Query(Properties.Resources.clean);
        }
    }

    public class ReportOverviewRepositoryTests : BaseDataTests
    {
        [Test]
        public void test_get_first_five_elements()
        {
            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IReportOverviewRepository>();
                repository.Should().NotBeNull();

                var result = repository.Get("IM900002", null, null, 1, 5);
                result.Should().NotBeNull().And.NotBeEmpty().And.HaveCount(5);
            }
        }
    }
}