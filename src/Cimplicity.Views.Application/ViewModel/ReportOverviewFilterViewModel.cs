using System;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Cimplicity.Views.Application.ViewModel
{
    [DataContract]
    public class ReportOverviewFilterViewModel
    {
        [DataMember(Name = "workArea")]
        public string WorkArea { get; set; }

        [DataMember(Name = "filters")]
        public ReportOverViewFilters Filters { get; set; }

        [DataMember(Name = "orderBy")]
        public IOrderedEnumerable<OrderByInfo> OrderBy { get; set; }


        [DataMember(Name="paging")]
        public PagingInfo Paging { get; set; }

    }
}
