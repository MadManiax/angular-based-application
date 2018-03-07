using Cimplicity.UI.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cimplicity.UI.Application.ViewModel
{
    public class EquipmentFilterViewModel
    {
        public List<WorkCell> WorkCells { get; set; }
        public List<WorkUnit> WorkUnits { get; set; }
    }
}
