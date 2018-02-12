using System;
using System.Text;

namespace Cimplicity.Views.Application.Errors
{
    public abstract class ServiceErrorBase : IServiceError
    {
        private string _userMessage;
        public string Message { get; set; }

        public string UserMessage
        {
            get
            {
                return _userMessage;
            }
            set
            {
                _userMessage = value;
                if (Context == "MonService" && !string.IsNullOrEmpty(_userMessage))
                {
                    _userMessage =
                        _userMessage.Replace("Error during transaction process. ErrorMessage:", string.Empty);
                }
                
            }
        }

        public string Context { get; set; }
        public bool IsProperyError { get; set; }
        public bool IsGenericError { get; set; }
        public Exception Exception { get; set; }

        public override string ToString()
        {
            var builder = new StringBuilder();
            builder.AppendFormat("Context {0}\n", Context);
            builder.AppendFormat("Message {0}\n", Message);
            builder.AppendFormat("IsProperyError {0}\n", IsProperyError);
            builder.AppendFormat("IsGenericError {0}\n", IsGenericError);
            builder.AppendFormat("Exception {0}\n", Exception?.Message);
            return builder.ToString();
        }
    }
}

