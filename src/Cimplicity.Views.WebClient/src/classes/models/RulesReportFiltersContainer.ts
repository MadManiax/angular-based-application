///<reference path="Rule.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export class RulesReportFiltersContainer
    {
        //*******************************************************************************
        //* Static variables
        //*******************************************************************************
        private static JSON_FIELD_PRODUCTION_LINES  = "productionLines";
        private static JSON_FIELD_WORK_CELLS        = "workCells";
        private static JSON_FIELD_WORK_UNITS        = "workUnits";
        private static JSON_FIELD_RULE_TYPES        = "ruleTypes";
        private static JSON_FIELD_MAT_DEFINITIONS   = "materialDefinitions";


        //*******************************************************************************
        //* Static methods
        //*******************************************************************************


        //*******************************************************************************
        //* Members
        //*******************************************************************************

        private _aoFilters;


        public constructor()
        {
            this._aoFilters = {};
            this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES]= [];
            this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS]= [];
            this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS]= [];
            this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES]= [];
            this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS]= [];
        }


        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Private methods (+)>
        private addFilterTo(sKey:string, oFilter:Filter)
        {
            this._aoFilters[sKey].push(oFilter);
        }
        ///</editor-fold>

        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Protected methods (+)>

        ///</editor-fold>

        //*******************************************************************************
        //* Public methods
        //*******************************************************************************
        ///<editor-fold desc="Public methods (+)>
        get filtersProductionLines() { return this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES]; }
        set filtersProductionLines(value){ this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES] = value; }

        get filtersWorkCells() { return this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS]; }
        set filtersWorkCells(value){ this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS] = value; }

        get filtersWorkUnits() { return this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS]; }
        set filtersWorkUnits(value){ this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS] = value; }

        get filtersRuleTypes() { return this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES]; }
        set filtersRuleTypes(value){ this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES] = value; }

        get filtersMaterialDefinitions() { return this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS]; }
        set filtersMaterialDefinitions(value){ this._aoFilters[RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS] = value; }


        public addFilterToProductionLines(sKey:string, oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES, oFilter);}
        public addFilterToWorkCells(sKey:string, oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS, oFilter);}
        public addFilterToWorkUnits(sKey:string, oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS, oFilter);}
        public addFilterToRuleTypes(sKey:string, oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES, oFilter);}
        public addFilterToMaterialDefinitions(sKey:string, oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS, oFilter);}


        public clearAllFilters()
        {
            for(let sKey in this._aoFilters)
            {
                Utils.clearArray(this._aoFilters[sKey]);
            }
        }
        ///</editor-fold>
    }

}