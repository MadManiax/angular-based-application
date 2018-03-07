using System;

namespace Cimplicity.UI.Application.ViewModel
{
    public class ReportOverviewViewModel
    {
        public string WorkCell { get; set; }
        public string WorkUnit { get; set; }
        public int? ActualNumber { get; set; }
        public DateTime? ActualDate { get; set; }
        public int? RemainingNumber { get; set; }
        public DateTime? RemainingDate { get; set; }
        public int? Set { get; set; }
        public int? OverflowRemaining { get; set; }
        public int? OverflowSet { get; set; }
        public string RuleName { get; set; }
        public string RuleType { get; set; }
        public string RuleComment { get; set; }
        public string WorkArea { get; set; }
        public string ProductionLine { get; set; }

        public override bool Equals(object obj)
        {
            return this.Equals(obj as ReportOverviewViewModel);
        }

        protected bool Equals(ReportOverviewViewModel other)
        {
            return string.Equals(WorkCell, other.WorkCell) && string.Equals(WorkUnit, other.WorkUnit) && ActualNumber == other.ActualNumber && ActualDate.Equals(other.ActualDate) && RemainingNumber == other.RemainingNumber && RemainingDate.Equals(other.RemainingDate) && Set == other.Set && OverflowRemaining == other.OverflowRemaining && OverflowSet == other.OverflowSet && string.Equals(RuleName, other.RuleName) && string.Equals(RuleType, other.RuleType) && string.Equals(RuleComment, other.RuleComment) && string.Equals(WorkArea, other.WorkArea) && string.Equals(ProductionLine, other.ProductionLine);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hashCode = (WorkCell != null ? WorkCell.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (WorkUnit != null ? WorkUnit.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ ActualNumber.GetHashCode();
                hashCode = (hashCode * 397) ^ ActualDate.GetHashCode();
                hashCode = (hashCode * 397) ^ RemainingNumber.GetHashCode();
                hashCode = (hashCode * 397) ^ RemainingDate.GetHashCode();
                hashCode = (hashCode * 397) ^ Set.GetHashCode();
                hashCode = (hashCode * 397) ^ OverflowRemaining.GetHashCode();
                hashCode = (hashCode * 397) ^ OverflowSet.GetHashCode();
                hashCode = (hashCode * 397) ^ (RuleName != null ? RuleName.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (RuleType != null ? RuleType.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (RuleComment != null ? RuleComment.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (WorkArea != null ? WorkArea.GetHashCode() : 0);
                hashCode = (hashCode * 397) ^ (ProductionLine != null ? ProductionLine.GetHashCode() : 0);
                return hashCode;
            }
        }
    }
}