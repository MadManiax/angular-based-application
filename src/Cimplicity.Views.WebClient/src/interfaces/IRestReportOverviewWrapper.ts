module ge.cim {
    import IListItemRule = ge.cim.IRestListItemRule;
    export interface IRestReportOverviewWrapper {
        count: number;
        rules: IListItemRule[];
    }
}