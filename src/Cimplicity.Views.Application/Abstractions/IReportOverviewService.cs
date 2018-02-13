using System.Collections;
using System.Collections.Generic;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;

namespace Cimplicity.Views.Application.Abstractions
{
    public interface IReportOverviewService
    {
        TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(string area);
    }
}