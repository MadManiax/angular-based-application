using System.Collections.Generic;
using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.Repository
{
    public interface IReportOverviewRepository
    {
        IEnumerable<ReportOverview> Get(string workArea,string productionLineFilter, string workCellFilter, string ruleTypeFilter,string materialFilter, int pageNumber, int pageSize);
    }
}