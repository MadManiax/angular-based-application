using Cimplicity.Views.Data.EF.Context;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.EF.Repository
{
    public class EFDataReaderRepository : EFRepositoryBase
    {
        public EFDataReaderRepository(ICimplicityViewsConfiguration configuration) : base(configuration)
        {
            this.ConnectionString = configuration.ReadDataInfo.ConnectionString;
            this.DataContext = new EFDataContext(this.ConnectionString);
        }
    }
}