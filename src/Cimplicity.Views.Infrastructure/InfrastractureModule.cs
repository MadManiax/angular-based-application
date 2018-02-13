using Autofac;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Infrastructure
{
    public class InfrastractureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            
            builder.Register(c => new Configuration.AppProperties.AppSettingsCimplicityViewsConfiguration())
                .As<ICimplicityViewsConfiguration>();
        }
    }
}