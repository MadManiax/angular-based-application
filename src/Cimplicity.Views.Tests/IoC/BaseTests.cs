
using System.Web.Http;
using Autofac;
using AutoMapper;
using Cimplicity.Views.Application.Abstractions;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Configuration;
using Cimplicity.Views.WebApi;
using Cimplicity.Views.WebApi.Controllers;
using FluentAssertions;
using NUnit.Framework;

namespace Cimplicity.Views.Tests.IoC
{
    [TestFixture]
    public class BaseTests
    {
        protected IContainer ContainerBuilder { get; set; }
        protected HttpConfiguration HttpConfiguration { get; set; }

        [SetUp]
        public void Setup()
        {
            Bootstrapper.Start();
            ContainerBuilder = Bootstrapper.Container;
            HttpConfiguration = GlobalConfiguration.Configuration;
        }


        [TearDown]
        public void TearDown()
        {
            this.HttpConfiguration.Dispose();
            this.ContainerBuilder.Dispose();
            Mapper.Reset();
        }
    }

    //[TestFixture]
    public class BootStrapperTests : BaseTests
    {
        
        [Test]
        public void test_infrastructure_module_resolved()
        {
            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var configuration = scope.Resolve<ICimplicityViewsConfiguration>();
                configuration.Should().NotBeNull();
                configuration.RefreshFrequency.Should().BeGreaterThan(0).And.Be(10000);
                configuration.RepositoryAssemblyName.Should().NotBeNullOrEmpty().And.Be("Default");
                configuration.ReadDataInfo.Should().NotBeNull();
                configuration.ReadDataInfo.ConnectionString.Should().NotBeNullOrEmpty();
                configuration.ReadDataInfo.StorageType.Should().Be(StorageType.AdoNet);
                configuration.ReadDataInfo.Name.Should().Be("replica_soadb");

                configuration.WriteDataInfo.Should().NotBeNull();
                configuration.WriteDataInfo.ConnectionString.Should().NotBeNullOrEmpty();
                configuration.WriteDataInfo.StorageType.Should().Be(StorageType.AdoNet);
                configuration.WriteDataInfo.Name.Should().Be("store_soadb");
            }
        }

        [Test]
        public void test_data_sql_module_resolved()
        {
            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IReportOverviewRepository>();
                repository.Should().NotBeNull();
            }
        }

        [Test]
        public void test_application_module_resolved()
        {
            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var service = scope.Resolve<IReportOverviewService>();
                service.Should().NotBeNull();
                
            }
        }

        [Test]
        public void test_webapi_module_resolved()
        {
            using (var scope = this.ContainerBuilder.BeginLifetimeScope())
            {
                var controller = scope.Resolve<ReportOverViewController>();
                controller.Should().NotBeNull();
                
            }
        }
        
    }
}