using System.Collections;
using System.Collections.Generic;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;
using Cimplicity.Views.Data.Repository;

namespace Cimplicity.Views.Application.Abstractions
{
    public interface IReportOverviewService
    {
        IReportOverviewRepository Repository { get; set; }
        
        TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(string area, string workCellFilter= null, string ruleTypeFilter=null, int pageNumber = 1, int pageSize = 20);
    }
}