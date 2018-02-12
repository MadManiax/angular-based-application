using System;

namespace Cimplicity.Views.Application.Errors
{
    public interface IServiceError
    {
        string Message { get; set; }
        string UserMessage { get; }
        string Context { get; set; }
        bool IsProperyError { get; }
        bool IsGenericError { get; }

        Exception Exception { get; }
    }
}