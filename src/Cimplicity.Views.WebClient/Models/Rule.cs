using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cimplicity.Views.WebClient.Models
{
    public abstract class Rule
    {
        public string WorkCell { get; set; }
        public string WorkUnit { get; set; }
        public int Actual { get; set; }
        public int Remaining { get; set; }
        public int Set { get; set; }
        public int OverflowRemaining { get; set; }
        public int OverflowSet { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
    }
}
