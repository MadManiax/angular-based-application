/// <reference path="../../interfaces/irestrulesreport.ts" />
module ge.cim.models {
    import IRestRuleReportResponse = ge.cim.IRestRulesReportResponse;

    export class RestRuleReportResponse implements IRestRuleReportResponse
    {
        TotalRows: number;
        TotalPages?: number;
        CurrentPage?: number;
        RowsPerPage?: number;
        Rules: Rule[];

        constructor()
        {
            this.TotalPages = 0,
            this.TotalRows = 0,
            this.CurrentPage = 0,
            this.RowsPerPage = 0,
            this.Rules = []
        }
    }
}