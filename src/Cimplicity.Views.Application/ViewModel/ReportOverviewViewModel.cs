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
    }
}