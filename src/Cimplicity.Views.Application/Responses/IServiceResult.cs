using System.Collections.Generic;
using Cimplicity.UI.Application.Errors;

namespace Cimplicity.UI.Application.Responses
{
    public interface IServiceResult
    {
        string Message { get; set; }
        ResultStatus Status { get; }

        void Add(IServiceError error);
        void AddRange(IEnumerable<IServiceError> errors);
        void RenderMessage();
    }
}