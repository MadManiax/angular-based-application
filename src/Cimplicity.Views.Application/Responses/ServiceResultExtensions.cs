using System;

namespace Cimplicity.UI.Application.Responses
{
    public static class ServiceResultExtensions
    {
        public static Exception ToException(this IServiceResult serviceResult)
        {
            if (serviceResult == null)
            {
                throw new ArgumentNullException(nameof(serviceResult));
            }

            if(serviceResult.Status == ResultStatus.Success)
            {
                throw new InvalidOperationException("this method is allowed only for error results");
            }
            serviceResult.RenderMessage();
            return new ApplicationServiceException(serviceResult.Message);
        }
    }
}
