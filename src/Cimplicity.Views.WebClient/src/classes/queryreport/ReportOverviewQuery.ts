module ge.cim.queryreport {
    /**
     * Object which contains all informations about query for report overview
     */
    export class ReportOverviewQuery {
        public WorkArea: string;
        public Filters = new QueryFilters();
        public OrderBy: OrderByInfo[] = [];
        public Paging: PagingInfo;
    }

}