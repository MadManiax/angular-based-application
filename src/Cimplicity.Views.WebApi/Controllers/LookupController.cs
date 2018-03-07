using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Cimplicity.UI.Application.Abstractions;
using Cimplicity.UI.Application.Responses;
using Cimplicity.UI.Application.ViewModel;
using Cimplicity.UI.Domain.Model;

namespace Cimplicity.UI.WebApi.Controllers
{
    public class LookupController : ApiBaseController
    {

        private readonly ILookupService _service;

        public LookupController(ILookupService service)
        {
            _service = service;
        }

        [HttpGet]
        public IHttpActionResult GetProductionLinesForTest(string workArea)
        {

            return this.UnitOfWork(() =>
            {
                var result = new TypedServiceResult<IList<ProductionLine>>();
                result.Result = new List<ProductionLine>();
                result.Result.Add(new ProductionLine { DisplayName = "Test1", S95Id = "S95Id for test 1" });
                result.Result.Add(new ProductionLine { DisplayName = "Test2", S95Id = "S95Id for test 2" });
                result.Result.Add(new ProductionLine { DisplayName = "Test3", S95Id = "S95Id for test 3" });
                return result;
            },
            "An error occurred during the get production lines operation");
        }


        [HttpGet]
        public IHttpActionResult GetProductionLines(string workArea)
        {
            if (string.IsNullOrEmpty(workArea))
                throw new ArgumentException("Value cannot be null or empty.", nameof(workArea));

            return this.UnitOfWork(() => _service.GetProductionLines(workArea), "An error occurred during the get production lines operation");
        }

        [HttpPost]
        public IHttpActionResult GetWorkCells([FromBody]List<ProductionLine> productionLines)
        {
            if (productionLines == null) throw new ArgumentNullException(nameof(productionLines));
            if (productionLines.Count == 0)
                throw new ArgumentException("Value cannot be an empty collection.", nameof(productionLines));

            return this.UnitOfWork(() => _service.GetWorkCells(productionLines), "An error occurred during the get production lines operation");
        }

        [HttpPost]
        public IHttpActionResult GetWorkUnits([FromBody]List<WorkCell> workCells)
        {
            if (workCells == null) throw new ArgumentNullException(nameof(workCells));
            if (workCells.Count == 0)
                throw new ArgumentException("Value cannot be an empty collection.", nameof(workCells));

            return this.UnitOfWork(() => _service.GetWorkUnits(workCells), "An error occurred during the get production lines operation");
        }

        [HttpPost]
        public IHttpActionResult GetMaterialDefinitions(EquipmentFilterViewModel equipmentFilter)
        {
            return this.UnitOfWork(() => _service.GetMaterialDefinitions(equipmentFilter.WorkCells, equipmentFilter.WorkUnits), "An error occurred during the get material definitions operation");
        }

        public IHttpActionResult GetRuleTypes()
        {
            return this.UnitOfWork(() => _service.GetRuleTypes(), "An error occurred during the get production lines operation");
        }
    }
}