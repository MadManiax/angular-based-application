using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cimplicity.UI.Application.Abstractions;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Domain.Filters;
using log4net;

namespace Cimplicity.UI.WebApi.Controllers
{
    public class ReportOverViewController
        : ApiController
    {
        private static readonly ILog Logger =
            LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private readonly IReportOverviewService _service;


        public ReportOverViewController(IReportOverviewService service)
        {
            _service = service;
        }

        [HttpPost]
        
        public HttpResponseMessage Get(ReportOverviewQuery query)
        {
            if (query == null) throw new ArgumentNullException(nameof(query));
            if (string.IsNullOrEmpty(query.WorkArea)) throw new ArgumentException("Value cannot be null or empty.", nameof(ReportOverviewQuery.WorkArea));
            try
            {
                
                var result =  _service.Get(query);
                if (result.Status != ResultStatus.Error)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, result, Configuration.Formatters.JsonFormatter);
                }

                return Request.CreateResponse(HttpStatusCode.InternalServerError, result,
                    Configuration.Formatters.JsonFormatter);
            }
            catch (Exception exception)
            {
                
                var message = "An error occurred GetReportOverview operation, please contact the administrator";
                Logger.Error(message,exception);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                    message);
            }
        }
    }
}