namespace Cimplicity.Views.Application.Responses
{
    public class TypedServiceResult<TType> : ServiceResult
    {
        public TType Result { get; set; }
    }
}