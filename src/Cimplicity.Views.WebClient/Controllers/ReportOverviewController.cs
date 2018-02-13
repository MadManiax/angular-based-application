using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cimplicity.Views.WebClient.Controllers
{
    public class ReportOverviewController : Controller
    {
        // GET: /<controller>/
        [HttpPost]
        public IActionResult GetRulesList(ReportRequestModel oRequest)
        {
            return View();
        }
    }
}
