using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Cimplicity.Views.Application.Abstractions;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;
using Cimplicity.Views.Infrastructure.Mapping;
using Utils.Data.DatabaseClient;
using Utils.Data.DatabaseClient.Abstractions;
using Utils.Extensions.Data;

namespace Cimplicity.Views.WebApi.Controllers
{
    public class ReportOverViewController
        : ApiController
    {
        private readonly string _connectionString;
        private IReportOverviewService _service;


        public ReportOverViewController(IReportOverviewService service)
        {
            _connectionString = ConfigurationManager.ConnectionStrings["replica_soadb"].ConnectionString;
            _service = service;
        }


        public HttpResponseMessage GetReportOverview(string workArea, string productionLineFilter, string workCellFilter,string ruleTypeFilter, string materialFilter, int pageNumber, int pageSize)
        {
            
            try
            {
                if (string.IsNullOrEmpty(workArea)) throw new ArgumentException("Value cannot be null or empty.", nameof(workArea));
                var result =  _service.Get(workArea,productionLineFilter,workCellFilter,ruleTypeFilter,materialFilter, pageNumber:pageNumber, pageSize:pageSize);
                if (result.Status != ResultStatus.Error)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, result, Configuration.Formatters.JsonFormatter);
                }

                return Request.CreateResponse(HttpStatusCode.InternalServerError, result,
                    Configuration.Formatters.JsonFormatter);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError,
                    "An error occurred GetReportOverview operation, please contact the administrator");
            }
        }

        // GET api/<controller>
        public IEnumerable<ReportOverviewViewModel> Get(string area)
        {
            var list = new List<ReportOverviewViewModel>();

            IQueryOperations storageManager = StorageManagerFactory.CreateDatabaseManager(_connectionString);
            var set = storageManager.ExecuteCommand("sp_VCC_local_reportOverview", new[] {new SqlParameter("@workArea", area)});
            if (set.IsEmpty())
            {
                return list;
            }

            var rows = set.Tables[0].Rows.Cast<DataRow>();
            return rows.MapTo<IEnumerable<ReportOverviewViewModel>>();
            
        }

        
    }
}