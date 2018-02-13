using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using Cimplicity.Views.Application;
using Cimplicity.Views.Application.Mappings;
using Cimplicity.Views.Data.Sql;
using Cimplicity.Views.Data.Sql.Mappings;
using Cimplicity.Views.Infrastructure;

namespace Cimplicity.Views.WebApi
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