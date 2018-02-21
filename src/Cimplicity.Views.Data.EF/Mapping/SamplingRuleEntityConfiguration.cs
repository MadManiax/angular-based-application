using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Data.EF.Mapping
{
    public class SamplingRuleEntityConfiguration : BaseEntityConfiguration<SamplingRule>
    {
        public const string TableName = "qm_SamplingRuleDmc";

        public SamplingRuleEntityConfiguration() : base(TableName)
        {
            this.HasKey(entity => entity.RuleId);
            this.Property(entity => entity.Name);
            this.Property(entity => entity.Enabled);
            this.Property(entity => entity.Overflow);
            this.Property(entity => entity.OverflowEnabled);
        }
    }
}