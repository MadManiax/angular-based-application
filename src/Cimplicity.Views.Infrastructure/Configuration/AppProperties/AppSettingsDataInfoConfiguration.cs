using System.Configuration;
using System.Linq;
using Utils.Extensions.Reflection;

namespace Cimplicity.Views.Infrastructure.Configuration.AppProperties
{
    public class AppSettingsDataInfoConfiguration : IDataInfo
    {

        public StorageType StorageType { get; }
        public string ConnectionString { get; }
        public string Name { get; }


        public AppSettingsDataInfoConfiguration(string prefix)
        {
            this.Name = prefix + "_soadb";
            var appSetting = ConfigurationManager.AppSettings;
            this.StorageType = appSetting.AllKeys.Contains(prefix + "_" + nameof(StorageType))
                ? appSetting[prefix+"_"+nameof(StorageType)].GetValue<StorageType>()
                : StorageType.Default;

            this.ConnectionString = ConfigurationManager.ConnectionStrings[this.Name].ConnectionString;
        }
    }
}