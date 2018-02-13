

namespace Cimplicity.Views.Domain.Model
{
    public class ReportOverview
    {
        public ReportOverview()
        {
            this.Rule = new Rule();
            this.Overflow = new Overflow();
        }

        public string WorkCell { get; set; }
        public string WorkUnit { get; set; }
        public int Actual { get; set; }
        public int Remaining { get; set; }
        public int Set { get; set; }
        public Overflow Overflow { get; set; }
        public Rule Rule { get; set; }
        
    }
}