using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cimplicity.Views.Domain.Model
{
    public class SamplingRule
    {
        public Guid RuleId { get; set; }
        public string Name { get; set; }
        public string RuleType { get; set; }
        public int? Overflow { get; set; }
        public bool OverflowEnabled { get; set; }
        public bool Enabled { get; set; }
    }
}
