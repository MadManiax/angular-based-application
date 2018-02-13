using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.Sql.Repository
{
    public abstract class SqlDataWriterRepository : SqlRepositoryBase
    {
        protected SqlDataWriterRepository(ICimplicityViewsConfiguration configuration) : base(configuration)
        {
            this.StorageType = configuration.WriteDataInfo.StorageType;
            this.ConnectionString = configuration.WriteDataInfo.ConnectionString;
        }
    }
}