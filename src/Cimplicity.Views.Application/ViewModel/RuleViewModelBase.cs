using System;

namespace Cimplicity.UI.Application.ViewModel
{
    public abstract class RuleViewModelBase
    {
        public Guid RuleExecutionId { get; set; }

        

        public int Set { get; set; }
    }
}