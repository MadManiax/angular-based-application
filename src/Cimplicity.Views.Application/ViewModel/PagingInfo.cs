using System.Runtime.Serialization;

namespace Cimplicity.Views.Application.ViewModel
{
    [DataContract]
    public class PagingInfo
    {
        [DataMember(Name = "pageNumber")]
        public int PageNumber { get; set; }

        [DataMember(Name = "pageSize")]
        public int PageSize { get; set; }
    }
}