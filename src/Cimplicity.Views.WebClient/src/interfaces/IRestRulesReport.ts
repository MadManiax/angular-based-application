///<reference path="../classes/models/Rule.ts"/>
///<reference path="../classes/models/Filter.ts"/>
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
        TotalPages? : number;
        TotalRows : number;
        CurrentPage? : number;
        RowsPerPage? : number;
        Rules : ge.cim.models.Rule[]
    }

}