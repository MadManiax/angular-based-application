///<reference path="../classes/models/Rule.ts"/>
module ge.cim {

    import Filter = ge.cim.models.Filter;

    export interface IRestRulesReportRequest
    {
        CurrentPage : number;
        RowsPerPage : number;
        Filters : Filter[];
    }



    export interface IRestRulesReportResponse
    {
        TotalPages : number;
        CurrentPage : number;
        RowsPerPage : number;
        RulesList : ge.cim.models.Rule[]
    }

}