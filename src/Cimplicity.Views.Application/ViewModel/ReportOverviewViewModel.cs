namespace Cimplicity.Views.Application.ViewModel
{
    public class ReportOverviewViewModel
    {
        public string WorkCell { get; set; }
        public string WorkUnit { get; set; }
        public int? Actual { get; set; }
        public int? Remaining { get; set; }
        public int? Set { get; set; }
        public int? OverflowRemaining { get; set; }
        public int? OverflowSet { get; set; }
        public string RuleName { get; set; }
        public string RuleType { get; set; }

        public override bool Equals(object obj)
        {
            return obj != null && this.Equals(obj as ReportOverviewViewModel);
        }

        protected bool Equals(ReportOverviewViewModel other)
        {
            return string.Equals(WorkCell, other.WorkCell) && string.Equals(WorkUnit, other.WorkUnit) && Actual == other.Actual && Remaining == other.Remaining && Set == other.Set && OverflowRemaining == other.OverflowRemaining && OverflowSet == other.OverflowSet && string.Equals(RuleName, other.RuleName) && string.Equals(RuleType, other.RuleType);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = (WorkCell != null ? WorkCell.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (WorkUnit != null ? WorkUnit.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ Actual.GetHashCode();
                hashCode = (hashCode * 397) ^ Remaining.GetHashCode();
                hashCode = (hashCode * 397) ^ Set.GetHashCode();
                hashCode = (hashCode * 397) ^ OverflowRemaining.GetHashCode();
                hashCode = (hashCode * 397) ^ OverflowSet.GetHashCode();
                hashCode = (hashCode * 397) ^ (RuleName != null ? RuleName.GetHashCode() : 0),
                hashCode = (hashCode * 397) ^ (RuleType != null ? RuleType.GetHashCode() : 0);
                return hashCode;
            }
        }
    }
}