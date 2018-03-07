using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using Cimplicity.UI.Application;
using Cimplicity.UI.Application.Mappings;
using Cimplicity.UI.Data.Sql;
using Cimplicity.UI.Data.Sql.Mappings;
using Cimplicity.UI.Infrastructure;

namespace Cimplicity.UI.WebApi
{
    public static class Bootstrapper
    {
        public static IContainer Container;

        

        public static void Start()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<ReportOverviewServiceMapProfile>();
                cfg.AddProfile<ReportOverviewMapProfile>();
                cfg.AddProfile<LookupMapProfile>();

            });

            var builder = new ContainerBuilder();
            builder.RegisterModule<InfrastractureModule>();
            builder.RegisterModule<DataSqlModule>();
            builder.RegisterModule<ApplicationModule>();
            builder.RegisterModule<WebApiModule>();
            
            Container = builder.Build();

            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(Container);
        
        }
    }
}