using System;
using System.Collections.Generic;
using System.Linq;
using Cimplicity.Views.Application.Errors;
using Cimplicity.Views.Application.Responses;
using Cimplicity.Views.Application.ViewModel;
using Cimplicity.Views.Data.Repository;
using Cimplicity.Views.Infrastructure.Mapping;

namespace Cimplicity.Views.Application.Abstractions
{
    class ReportOverviewService : IReportOverviewService
    {
        public ReportOverviewService(IReportOverviewRepository repository)
        {
            Repository = repository;
        }

        public IReportOverviewRepository Repository { get; set; }
        

        public TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(string workArea, string productionLineFilter = null, string workCellFilter = null, string ruleTypeFilter = null, string materialFilter = null, int pageNumber = 1, int pageSize = 20)
        {
            if (string.IsNullOrEmpty(workArea)) throw new ArgumentException("Value cannot be null or empty.", nameof(workArea));
            var result =
                new TypedServiceResult<IEnumerable<ReportOverviewViewModel>>
                {
                    Result = new List<ReportOverviewViewModel>()
                };

            try
            {
                result.Result = Repository.Get(workArea, productionLineFilter,workCellFilter,ruleTypeFilter, materialFilter, pageNumber, pageSize).MapTo<IEnumerable<ReportOverviewViewModel>>();

            }
            catch (Exception exception)
            {
                result.Add(ServiceErrorFactory.CreateInternalError(exception,userMessage:"Error while getting the datas from the repository"));
                
            }

            return result;
        }

        public TypedServiceResult<IEnumerable<ReportOverviewViewModel>> Get(ReportOverviewFilterViewModel model)
        {
            var result = this.Get(model.WorkArea, model.Filters?.ProductionLineFilter, model.Filters?.WorkCellFilter,
                model.Filters?.RuleTypeFilter, model.Filters?.MaterialDefinitionFilter, model.Paging.PageNumber,
                model.Paging.PageSize);

            if (result.Status == ResultStatus.Error || !result.Result.Any())
            {
                return result;
            }

            var list = result.Result;
            foreach (var orderByInfo in model.OrderBy)
            {
                if (orderByInfo.FieldName == "WL/WT")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.WorkCell).ThenBy(el => el.WorkUnit)
                        : list.OrderByDescending(el => el.WorkCell).ThenBy(el => el.WorkUnit);
                }

                if (orderByInfo.FieldName == "RuleType")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.RuleType)
                        : list.OrderByDescending(el => el.RuleType);
                }

                if (orderByInfo.FieldName == "RemainingOverflow")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.OverflowRemaining)
                        : list.OrderByDescending(el => el.OverflowRemaining);
                }

                if (orderByInfo.FieldName == "RuleName")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.RuleName)
                        : list.OrderByDescending(el => el.RuleName);
                }

                if (orderByInfo.FieldName == "Remaining")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.Remaining)
                        : list.OrderByDescending(el => el.Remaining);
                }

                if (orderByInfo.FieldName == "RuleType")
                {
                    list = orderByInfo.Type == OrderByType.Asc
                        ? list.OrderBy(el => el.RuleType)
                        : list.OrderByDescending(el => el.RuleType);
                }
            }
        }
    }
}