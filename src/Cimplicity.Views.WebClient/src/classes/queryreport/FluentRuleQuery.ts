module ge.cim.queryreport {
    import Filter = ge.cim.models.Filter;
    /**
     * Class to build a query in fluent way
     */
    export class FluentRuleQuery {

        private constructor(workArea: string) { this.QueryBuilt.WorkArea = workArea; }

        /**
        * Output generated query
        */
        private QueryBuilt = new ReportOverviewQuery();
        /**
         * First of all set value on work area
         * @param workArea workArea code
         */
        static onWorkArea(workArea: string) {
            return new FluentRuleQuery(workArea);
        }
        /**
         * build filters on production lines
         * @param filters UI filters
         * @param clear clear array before pushing them
         */
        withFiltersOnProductionLines(filters: Filter[],clear:boolean = false): FluentRuleQuery{
            if (filters === null) {
                console.warn("WARNING: Passed null filters for production lines query");
                return;
            }
            clear ? this.QueryBuilt.Filters.ProductionLines.concat(filters.map(f => f._oValue.toString())) :
                this.QueryBuilt.Filters.ProductionLines = filters.map(f => f._oValue.toString());
            return this;
        }
        /**
         * build filters on work cells
         * @param filters UI filters
         * @param clear clear array before pushing them
         */
        withFiltersOnWorkCells(filters: Filter[], clear: boolean = false): FluentRuleQuery {
            if (filters === null) {
                console.warn("WARNING: Passed null filters for work cell query");
                return;
            }
            clear ? this.QueryBuilt.Filters.WorkCells.concat(filters.map(f => f._oValue.toString())) :
                this.QueryBuilt.Filters.WorkCells = filters.map(f => f._oValue.toString());
            return this;
        }
        /**
         * build filters on work units
         * @param filters UI filters
         * @param clear clear array before pushing them
         */
        withFiltersOnWorkUnits(filters: Filter[], clear: boolean = false): FluentRuleQuery{
            if (filters === null) {
                console.warn("WARNING: Passed null filters for work unit query");
                return;
            }
            clear ? this.QueryBuilt.Filters.WorkUnits.concat(filters.map(f => f._oValue.toString())) :
                this.QueryBuilt.Filters.WorkUnits = filters.map(f => f._oValue.toString());
            return this;
        }
        /**
         * build filters on rule types
         * @param filters UI filters
         * @param clear clear array before pushing them
         */
        withFiltersOnRuleTypes(filters: Filter[], clear: boolean = false): FluentRuleQuery {
            if (filters === null) {
                console.warn("WARNING: Passed null filters for rule types query");
                return;
            }
            clear ? this.QueryBuilt.Filters.RuleTypes.concat(filters.map(f => f._oValue.toString())) :
                this.QueryBuilt.Filters.RuleTypes = filters.map(f => f._oValue.toString());
            return this;
        }
        /**
         * build filters on material definitions
         * @param filters UI filters
         * @param clear clear array before pushing them
         */
        withFiltersOnMaterialDefinitions(filters: Filter[], clear: boolean = false): FluentRuleQuery{
            if (filters === null) {
                console.warn("WARNING: Passed null filters for material definitions query");
                return;
            }
            clear ? this.QueryBuilt.Filters.MaterialDefinitions.concat(filters.map(f => f._oValue.toString())) :
                this.QueryBuilt.Filters.MaterialDefinitions = filters.map(f => f._oValue.toString());
            return this;
        }
        /**
         * Add order by clause to query
         * @param fieldName field to order for
         * @param direction sort direction
         */
        addOrderBy(fieldName: FieldOrder, direction: SortDirection): FluentRuleQuery{
            this.QueryBuilt.OrderBy.push(new OrderByInfo(fieldName, direction));
            return this;
        }
        /**
         * Create paging info instance
         * @param pageNumber
         * @param pageSize 
         */
        withPagingInfo(pageNumber : number, pageSize:number) : FluentRuleQuery{
            this.QueryBuilt.Paging = new PagingInfo(pageNumber, pageSize);
            return this;
        }
        /**
         * Return the generated query
         */
        build() {
            return this.QueryBuilt;
        }
    }

   
    
}