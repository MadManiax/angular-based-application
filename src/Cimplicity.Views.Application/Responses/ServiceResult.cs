using System.Collections.Generic;
using System.Linq;
using System.Text;
using Cimplicity.Views.Application.Errors;

namespace Cimplicity.Views.Application.Responses {
    public class ServiceResult {
        private readonly List<IServiceError> _errors;
        public ResultStatus Status { get; private set; }

        public IEnumerable<IServiceError> Errors => _errors;

        private string _message;

        public string Message {
            get {
                return _builder.Length > 0 ? _builder.ToString() : _message;
            }
            set { _message = value; }
        }

        private readonly StringBuilder _builder;

        public ServiceResult() {
            Status = ResultStatus.Success;
            _errors = new List<IServiceError>();
            _builder = new StringBuilder();
        }

        public void Add(IServiceError error) {
            this.Status = ResultStatus.Error;
            _errors.Add(error);
            if (error.Context == "MonService") {
                _builder.AppendLine(error.UserMessage);
            } else if (error.Context == "GenericError") {
                _builder.AppendLine(error.Message);
            }
        }

        public void AddRange(IEnumerable<IServiceError> errors) {
            if (errors == null || !errors.Any())
                return;
            _errors.AddRange(errors);
        }

        public override string ToString() {
            var resultBuilder = new StringBuilder();
            resultBuilder.AppendFormat("Operation completed {0}\n", this.Status == ResultStatus.Success ? "successfully" : "with errors");
            resultBuilder.AppendLine("<br/>");
            resultBuilder.AppendLine(Message);
            resultBuilder.AppendLine("<br/>");
            if (!this.Errors.Any()) {
                return resultBuilder.ToString();
            }


            // resultBuilder.AppendLine($"Errors list {this.Errors.Count()}");
            var errorCounter = 1;
            foreach (var serviceError in this.Errors) {
                resultBuilder.AppendLine("<br/>");
                resultBuilder.AppendLine($"Error #{errorCounter}: {serviceError.Message} - Context: {serviceError.Context}");
            }

            return resultBuilder.ToString();
        }

        public void RenderMessage() {
            this.Message = this.ToString();
        }
    }
}
