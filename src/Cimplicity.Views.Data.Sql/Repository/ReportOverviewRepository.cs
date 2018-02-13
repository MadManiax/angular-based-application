using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Data.Sql.Context;
using Cimplicity.Views.Domain.Model;
using Cimplicity.Views.Infrastructure.Configuration;
using Cimplicity.Views.Infrastructure.Mapping;
using Utils.Data.DatabaseClient;
using Utils.Data.DatabaseClient.Abstractions;
using Utils.Extensions.Data;

namespace Cimplicity.Views.Data.Sql.Repository
{
    public class ReportOverviewRepository : SqlDataReaderRepository, IReportOverviewRepository
    {
        public ReportOverviewRepository(ICimplicityViewsConfiguration configuration) : base(configuration)
        {
        }

        public IEnumerable<ReportOverview> Get(string area)
        {
            var list = new List<ReportOverview>();
            IQueryOperations storageManager = StorageManagerFactory.CreateDatabaseManager(this.ConnectionString);
            var set = storageManager.ExecuteCommand(DataSqlConstants.Sampling.Report.ReportOverviewSP, new[] { new SqlParameter("@workArea", area) });
            if (set.IsEmpty())
            {
                return list;
            }

            var rows = set.Tables[0].Rows.Cast<DataRow>();
            return rows.MapTo<IEnumerable<ReportOverview>>();
        }
    }
}