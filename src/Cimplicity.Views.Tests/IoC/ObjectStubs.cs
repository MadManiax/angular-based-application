using Cimplicity.Views.Domain.Model;

namespace Cimplicity.Views.Tests.IoC
{
    public class ObjectStubs
    {
        public static ReportOverview CreateStub(string workCell, string workUnit, int actual = 1, int set = 1, int overflowSet = 1,
            string ruleName = "counter rule", RuleType ruleType = RuleType.Counter)
        {
            return new ReportOverview()
            {
                WorkCell = workCell,
                WorkUnit = workUnit,
                Actual = actual,
                Remaining = set - actual,
                Set = set,
                Overflow = new Overflow()
                {
                    Set = overflowSet,
                    Remaining = set + overflowSet - (set - actual)
                },
                Rule = new Rule()
                {
                    Name = ruleName,
                    Type = ruleType
                },

            };
        }
    }
}