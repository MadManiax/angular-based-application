using System;
using System.Collections.Generic;
using Cimplicity.UI.Application.Abstractions;
using Cimplicity.UI.Application.Errors;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Application.ViewModel;
using Cimplicity.UI.Data.Repository;
using Cimplicity.UI.Domain.Filters;
using Cimplicity.UI.Infrastructure.Mapping;
using log4net;

namespace Cimplicity.UI.Application.Services
{
    class ReportOverviewService : IReportOverviewService
    {
        private static readonly ILog Logger =
            LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public ReportOverviewService(IReportOverviewRepository repository)
        {
            Repository = repository;
        }

        public IReportOverviewRepository Repository { get; set; }
        

     

        public TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(ReportOverviewQuery model)
        {
            var response = new TypedServiceResult<IEnumerable<ReportOverviewViewModel>>();

            try
            {
                response.Result = Repository.Get(model).MapTo<IEnumerable<ReportOverviewViewModel>>();

            }
            catch (Exception exception)
            {
                var message = "Error while getting the datas from the repository";
                response.Add(ServiceErrorFactory.CreateInternalError(exception, userMessage: message));
                Logger.Error(message,exception);
            }
            
            return response;
        }
    }
}