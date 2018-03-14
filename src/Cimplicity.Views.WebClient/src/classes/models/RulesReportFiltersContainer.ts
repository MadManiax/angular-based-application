///<reference path="Rule.ts"/>
///<reference path="../BaseClass.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export class RulesReportFiltersContainer extends BaseClass
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

        public static deserializeFromJson(oJson)
        {
            let oRetval = new RulesReportFiltersContainer();
            oRetval.fromJSON(oJson);
            return oRetval;
        }


        //*******************************************************************************
        //* Members
        //*******************************************************************************

        private _aoFilters;


        public constructor()
        {
            super();
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


        public addFilterToProductionLines(oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES, oFilter);}
        public addFilterToWorkCells(oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS, oFilter);}
        public addFilterToWorkUnits(oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS, oFilter);}
        public addFilterToRuleTypes(oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES, oFilter);}
        public addFilterToMaterialDefinitions(oFilter:Filter) { this.addFilterTo(RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS, oFilter);}


        public clearAllFilters()
        {
            for(let sKey in this._aoFilters)
            {
                Utils.clearArray(this._aoFilters[sKey]);
            }
        }


        public fromJSON(oJson)
        {
            // Deserialize each filters array from JSON
            // WARNING: the filter obtained from deserialization are 'Filters' base class,
            // they do NOT have the any extra data, so the real filters must be obtained with a compare
            // with available filters and the 'selected filters' deserialized here
            this.filtersProductionLines = Filter.deserializeFiltersListFromJson(oJson[RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES]);
            this.filtersWorkCells = Filter.deserializeFiltersListFromJson(oJson[RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS]);
            this.filtersWorkUnits = Filter.deserializeFiltersListFromJson(oJson[RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS]);
            this.filtersRuleTypes = Filter.deserializeFiltersListFromJson(oJson[RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES]);
            this.filtersMaterialDefinitions = Filter.deserializeFiltersListFromJson(oJson[RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS]);
        }

        public toJSON()
        {
            let oRetval = this.createObjectForToJSON();
            oRetval[RulesReportFiltersContainer.JSON_FIELD_PRODUCTION_LINES] = this.filtersProductionLines;
            oRetval[RulesReportFiltersContainer.JSON_FIELD_WORK_CELLS]       = this.filtersWorkCells;
            oRetval[RulesReportFiltersContainer.JSON_FIELD_WORK_UNITS]       = this.filtersWorkUnits;
            oRetval[RulesReportFiltersContainer.JSON_FIELD_RULE_TYPES]       = this.filtersRuleTypes;
            oRetval[RulesReportFiltersContainer.JSON_FIELD_MAT_DEFINITIONS]  = this.filtersMaterialDefinitions;

            return oRetval;

        }

        ///</editor-fold>
    }

}