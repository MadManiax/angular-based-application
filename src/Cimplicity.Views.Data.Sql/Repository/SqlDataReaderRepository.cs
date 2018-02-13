using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.Sql.Repository
{
    public abstract class SqlDataReaderRepository : SqlRepositoryBase
    {
        protected SqlDataReaderRepository(ICimplicityViewsConfiguration configuration) : base(configuration)
        {
            this.StorageType = configuration.ReadDataInfo.StorageType;
            this.ConnectionString = configuration.ReadDataInfo.ConnectionString;
        }
    }
}