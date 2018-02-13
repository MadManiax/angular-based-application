using Autofac;
using Cimplicity.Views.Application.Abstractions;
using Cimplicity.Views.WebApi.Controllers;
using Module = Autofac.Module;

namespace Cimplicity.Views.WebApi
{
    public class WebApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //var apiController = Assembly.GetAssembly(typeof(HomeController));
            //builder.RegisterApiControllers(apiController);

            builder.Register(c => new HomeController());

            builder.Register(c =>
                new ReportOverViewController(c.Resolve<IReportOverviewService>())).As<ReportOverViewController>();
        }
    }
}