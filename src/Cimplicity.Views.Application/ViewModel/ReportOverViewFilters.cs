using System.Collections.Generic;
using System.Runtime.Serialization;
using Utils.Extensions.Collections;

namespace Cimplicity.Views.Application.ViewModel
{
    [DataContract]

    public class ReportOverViewFilters
    {
        [DataMember(Name = "productionLines")]
        public IEnumerable<string> ProductionLines { get; set; }

        public string ProductionLineFilter => this.ProductionLines.Stringify(",");

        [DataMember(Name = "workCells")]
        public IEnumerable<string> WorkCells { get; set; }

        public string WorkCellFilter => this.WorkCells.Stringify(",");

        [DataMember(Name = "ruleTypes")]
        public IEnumerable<string> RuleTypes { get; set; }

        public string RuleTypeFilter => this.RuleTypes.Stringify(",");

        [DataMember(Name = "materialDefinitions")]
        public IEnumerable<string> MaterialDefinitions { get; set; }

        public string MaterialDefinitionFilter => this.MaterialDefinitions.Stringify(",");
    }
}