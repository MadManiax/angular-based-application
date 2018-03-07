namespace Cimplicity.UI.Application.Responses
{
    public class TypedServiceResult<TType> : ServiceResult
    {
        public TType Result { get; set; }
    }
}