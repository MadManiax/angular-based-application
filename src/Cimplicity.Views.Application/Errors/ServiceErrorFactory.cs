using System;
using Cimplicity.Views.Infrastructure.Localization;

namespace Cimplicity.Views.Application.Errors {
    public class ServiceErrorFactory {
        public static IServiceError CreateInternalError(Exception exception = null, string lang = null, string userMessage = null) {
            if (string.IsNullOrEmpty(userMessage)) {
                
                userMessage = string.IsNullOrEmpty(lang) ? Infrastructure.Localization.Application.GenericError.L(lang) : string.Empty;
            }

            var err = new InternalError() {
                Context = "GenericError",
                Exception = exception,
                Message = exception?.Message ?? userMessage,
                UserMessage = userMessage
            };

            return err;
        }

        public static IServiceError CreateServerError(Exception exception = null, string lang = null, string userMessage = null) {
            if (string.IsNullOrEmpty(userMessage)) {
                userMessage = string.IsNullOrEmpty(lang) ? Infrastructure.Localization.Application.GenericError.L(lang) : string.Empty;
            }

            var err = new ServerError() {
                Context = "MonService",
                Exception = exception,
                Message = exception?.Message ?? userMessage,
                UserMessage = exception?.Message ?? userMessage
            };

            return err;
        }
    }
}