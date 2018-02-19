using System.Collections.Generic;
using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.Repository
{
    public interface IReportOverviewRepository
    {
        IEnumerable<ReportOverview> Get(string area, string workCellFilter, string ruleTypeFilter, int pageNumber, int pageSize);
    }
}