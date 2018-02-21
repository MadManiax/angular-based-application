using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.EF.Mapping
{
    public class SamplingRuleExecutionConfiguration : BaseEntityConfiguration<SamplingRuleExecution>
    {
        public const string TableName = "qm_SamplingRuleExecutionDmc";
        public SamplingRuleExecutionConfiguration() : base(TableName)
        {
            this.HasKey(entity => entity.RuleExecutionId);
            this.Property(entity => entity.LastCalculationResult);
            this.Property(entity => entity.LastExecutionDate);
            this.Property(entity => entity.PreviousRuleExecutionId);
            this.Property(entity => entity.RuleId);
        }
    }
}