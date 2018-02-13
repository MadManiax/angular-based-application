using Cimplicity.Views.Infrastructure.Configuration;
using Cimplicity.Views.Infrastructure.Configuration.AppProperties;
using FluentAssertions;
using NUnit.Framework;

namespace Cimplicity.Views.Tests.Infrastructure
{
    [TestFixture]
    public class ConfigurationsTests
    {
        [Test]
        public void test_get_appSettingsConfiguration_not_null()
        {
            ICimplicityViewsConfiguration configuration = new AppSettingsCimplicityViewsConfiguration();
            configuration.Should().NotBeNull();
        }

        [Test]
        public void test_get_appSettingsConfiguration_all_parameters_filled()
        {
            ICimplicityViewsConfiguration configuration = new AppSettingsCimplicityViewsConfiguration();
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
}