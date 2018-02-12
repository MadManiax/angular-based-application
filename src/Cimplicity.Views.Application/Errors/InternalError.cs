namespace Cimplicity.Views.Application.Errors
{
    internal class InternalError : ServiceErrorBase
    {
        public InternalError()
        {
            this.IsGenericError = true;
        }
    }
}