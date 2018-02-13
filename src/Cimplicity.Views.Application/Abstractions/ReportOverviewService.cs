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
        private IReportOverviewRepository _repository;
        

        public ReportOverviewService(IReportOverviewRepository repository)
        {
            _repository = repository;
        }

        public TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(string area)
        {
            if (string.IsNullOrEmpty(area)) throw new ArgumentException("Value cannot be null or empty.", nameof(area));
            var result =
                new TypedServiceResult<IEnumerable<ReportOverviewViewModel>>
                {
                    Result = new List<ReportOverviewViewModel>()
                };

            try
            {
                result.Result = _repository.Get(area).MapTo<IEnumerable<ReportOverviewViewModel>>();

            }
            catch (Exception exception)
            {
                result.Add(ServiceErrorFactory.CreateInternalError(exception,userMessage:"Error while getting the datas from the repository"));
                
            }

            return result;
        }
    }
}