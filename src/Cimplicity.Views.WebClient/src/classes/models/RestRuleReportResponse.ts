/// <reference path="../../interfaces/irestrulesreport.ts" />
module ge.cim.models {
    import IRestRuleReportResponse = ge.cim.IRestRulesReportResponse;

    export class RestRuleReportResponse implements IRestRuleReportResponse{
        TotalRows: number;
        TotalPages?: number;
        CurrentPage?: number;
        RowsPerPage?: number;
        Rules: Rule[];
        
    }
}