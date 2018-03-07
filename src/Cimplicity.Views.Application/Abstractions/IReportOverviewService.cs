using System.Collections.Generic;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Application.ViewModel;
using Cimplicity.UI.Data.Repository;
using Cimplicity.UI.Domain.Filters;

namespace Cimplicity.UI.Application.Abstractions
{
    public interface IReportOverviewService
    {
        IReportOverviewRepository Repository { get; set; }
        
        

        TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(ReportOverviewQuery model);
    }
}