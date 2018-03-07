using System;

namespace Cimplicity.UI.Application.ViewModel
{
    public class TimerRuleViewModel : RuleViewModelBase
    {
        public DateTime LastSamplingDate { get; set; }

        public DateTime Actual { get; set; }
        
    }
}