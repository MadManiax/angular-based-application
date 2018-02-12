using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.Sql.Repository
{
    public class SqlRepositoryBase : RepositoryBase
    {
        public string ConnectionString { get; set; }

        public SqlRepositoryBase(ICimplicityViewsConfiguration configuration)
        {
            this.ConnectionString = configuration.Data.ConnectionString;
        }
    }
}