using System.Data;
using AutoMapper;
using Cimplicity.Views.Domain.Model;
using Utils.Extensions.Data;

namespace Cimplicity.Views.Data.Sql.Mappings
{
    public class ReportOverviewMapProfile : Profile
    {
       
            public ReportOverviewMapProfile()
            {
                CreateMap<DataRow, ReportOverview>()
                    .ForMember(target => target.Actual,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<int?>(nameof(ReportOverview.Actual), false)))
                    .ForPath(target => target.Overflow.Remaining,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<int?>("OverflowRemainig", false)))
                    .ForPath(target => target.Overflow.Set,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<int?>("OverflowSet", false)))
                    .ForMember(target => target.Remaining,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<int?>(nameof(ReportOverview.Remaining), false)))
                    .ForPath(target => target.Rule.Name,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<string>("RuleName", false)))
                    .ForMember(target => target.Set,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<int?>(nameof(ReportOverview.Set), false)))
                    .ForMember(target => target.WorkCell,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<string>(nameof(ReportOverview.WorkCell), false)))
                    .ForMember(target => target.WorkUnit,
                        opt => opt.MapFrom(source =>
                            source.GetValueByColumnName<string>(nameof(ReportOverview.WorkUnit), false)));
            }
           
        
    }
}