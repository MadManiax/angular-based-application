using System.Collections.Generic;
using Cimplicity.Views.Data.EF.Context;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Domain.Model;
using Cimplicity.Views.Infrastructure.Configuration;

namespace Cimplicity.Views.Data.EF.Repository
{
    public class EFReportOverviewRepository : EFDataReaderRepository, IReportOverviewRepository
    {

        public EFReportOverviewRepository(ICimplicityViewsConfiguration configuration) : base(configuration)
        {
            
        }

        public IEnumerable<ReportOverview> Get(string workArea, string productionLineFilter, string workCellFilter, string ruleTypeFilter,
            string materialFilter, int pageNumber, int pageSize)
        {
            throw new System.NotImplementedException();
        }
    }
}