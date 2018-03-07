using System.Collections.Generic;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Domain.Model;

namespace Cimplicity.UI.Application.Abstractions
{
    public interface ILookupService : IApplicationService
    {
        TypedServiceResult<IEnumerable<ProductionLine>> GetProductionLines(string workArea);

        TypedServiceResult<IEnumerable<WorkCell>> GetWorkCells(IEnumerable<ProductionLine> productionLines);

        TypedServiceResult<IEnumerable<WorkUnit>> GetWorkUnits(IEnumerable<WorkCell> workCells);

        TypedServiceResult<IEnumerable<Material>> GetMaterialDefinitions(IEnumerable<WorkCell> workCells, IEnumerable<WorkUnit> workUnits);

        TypedServiceResult<IEnumerable<string>> GetRuleTypes();
    }
}