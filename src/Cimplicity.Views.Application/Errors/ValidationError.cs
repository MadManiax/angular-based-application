namespace Cimplicity.Views.Application.Errors
{
    public class ValidationError : ServiceErrorBase
    {
        public ValidationError()
        {
            this.IsProperyError = true;
        }
    }
}