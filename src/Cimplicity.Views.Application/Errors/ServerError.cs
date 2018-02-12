namespace Cimplicity.Views.Application.Errors
{
    internal class ServerError : ServiceErrorBase
    {
        public ServerError()
        {
            this.IsGenericError = true;

        }
    }
}