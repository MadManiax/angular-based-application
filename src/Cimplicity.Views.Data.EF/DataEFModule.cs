using Autofac;
using Cimplicity.Views.Data.EF.Repository;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.EF
{
    public class DataEFModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            
            builder.Register(c => new EFReportOverviewRepository(c.Resolve<ICimplicityViewsConfiguration>())).As<IReportOverviewRepository>();
        }
    }
}