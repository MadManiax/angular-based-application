using System;

namespace Cimplicity.Views.Domain.Model
{
    public class SamplingRuleExecution
    {
        public Guid RuleId { get; set; }
        public Guid RuleExecutionId { get; set; }
        public Guid PreviousRuleExecutionId { get; set; }
        public int? LastCalculationResult { get; set; }
        public DateTime? LastExecutionDate { get; set; }
    }
}