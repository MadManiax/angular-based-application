using System.Runtime.Serialization;
using Utils.Extensions.Reflection;

namespace Cimplicity.Views.Application.ViewModel
{
    [DataContract]
    public class OrderByInfo
    {
        [DataMember(Name = "fieldName")]
        public string FieldName { get; set; }

        [DataMember(Name = "type")]
        public  string TypeString
        {
            get => this.Type.GetValue<string>();
            set => this.Type = this.TypeString.GetValue<OrderByType>();
        }
        public OrderByType Type { get; set; }
    }
}