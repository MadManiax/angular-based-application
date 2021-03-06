﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cimplicity.Views.WebClient.Models
{
    public class ReportResponseModel
    {
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int RowsPerPage { get; set; }
        public object[] RulesList { get; set; }
    }
}
