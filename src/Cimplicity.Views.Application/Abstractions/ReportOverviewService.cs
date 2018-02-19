using System;
using System.Collections.Generic;
using Cimplicity.Views.Application.Errors;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Mapping;

namespace Cimplicity.Views.Application.Abstractions
{
    class ReportOverviewService : IReportOverviewService
    {
        public ReportOverviewService(IReportOverviewRepository repository)
        {
            Repository = repository;
        }

        public IReportOverviewRepository Repository { get; set; }
        

        public TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(string area, string workCellFilter = null, string ruleTypeFilter = null, int pageNumber = 1, int pageSize = 20)
        {
            if (string.IsNullOrEmpty(area)) throw new ArgumentException("Value cannot be null or empty.", nameof(area));
            var result =
                new TypedServiceResult<IEnumerable<ReportOverviewViewModel>>
                {
                    Result = new List<ReportOverviewViewModel>()
                };

            try
            {
                result.Result = Repository.Get(area,workCellFilter,ruleTypeFilter, pageNumber, pageSize).MapTo<IEnumerable<ReportOverviewViewModel>>();

            }
            catch (Exception exception)
            {
                result.Add(ServiceErrorFactory.CreateInternalError(exception,userMessage:"Error while getting the datas from the repository"));
                
            }

            return result;
        }
    }
}