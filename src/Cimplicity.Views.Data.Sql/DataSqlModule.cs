using Autofac;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Data.Sql.Repository;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.Sql
{
    public class DataSqlModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            
            builder.Register(c => new SqlReportOverviewRepository(c.Resolve<ICimplicityViewsConfiguration>())).As<IReportOverviewRepository>();
        }
    }
}