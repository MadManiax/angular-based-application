using System.Configuration;
using System.Linq;
using Utils.Extensions.Reflection;

namespace Cimplicity.Views.Infrastructure.Configuration.AppProperties {
    public class AppSettingsCimplicityViewsConfiguration : ICimplicityViewsConfiguration {



        
        public IDataInfo ReadDataInfo { get; }
        public IDataInfo WriteDataInfo { get; }
        public int RefreshFrequency { get; }
        public string RepositoryAssemblyName { get; }

        public AppSettingsCimplicityViewsConfiguration() {
            var appSetting = ConfigurationManager.AppSettings;

            this.RepositoryAssemblyName = appSetting.AllKeys.Contains(nameof(RepositoryAssemblyName)) ? appSetting[nameof(RepositoryAssemblyName)] : "Default";

            this.ReadDataInfo = new AppSettingsDataInfoConfiguration("replica");

            this.WriteDataInfo = new AppSettingsDataInfoConfiguration("store");


            this.RefreshFrequency = appSetting.AllKeys.Contains(nameof(RefreshFrequency))
                ? appSetting[nameof(RefreshFrequency)].GetValue<int>()
                : 10000;
        }
    }
}
