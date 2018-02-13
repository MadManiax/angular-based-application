using Autofac;
using Cimplicity.Views.Application.Abstractions;
using Cimplicity.Views.Data.Repository;

namespace Cimplicity.Views.Application
{
    public class ApplicationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder
                .Register(c => new ReportOverviewService(c.Resolve<IReportOverviewRepository>()))
                .As<IReportOverviewService>();
        }
    }
}