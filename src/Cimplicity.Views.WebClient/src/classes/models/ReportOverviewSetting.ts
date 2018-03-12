///<reference path="Settings.ts"/>

module ge.cim.models {

    export class ReportOverviewSetting extends Settings
    {
        //*******************************************************************************
        //* Static variables
        //*******************************************************************************


        //*******************************************************************************
        //* Static methods
        //*******************************************************************************
        public static createDefault() : ReportOverviewSetting
        {
            let oRetval = new ReportOverviewSetting();
            oRetval._iPageSize = 20;
            oRetval._aoSortConditions = [
                new WlWtSortCondition()
            ];
            oRetval._aiAvailablePageSizes = [10, 25, 50, 100];
            oRetval._oFilters = new RulesReportFiltersContainer();
            oRetval._iAutoRefreshIntervalInSeconds = 20;
            return oRetval;
        }


        //*******************************************************************************
        //* Members
        //*******************************************************************************
        private _iPageSize: number;
        private _aoSortConditions : SortCondition[];
        private _aiAvailablePageSizes : number[];
        private _oFilters : RulesReportFiltersContainer;
        private _iAutoRefreshIntervalInSeconds: number;

        protected sSettingsName: string = "ReportOverviewSettings";

        public constructor()
        {
            super();
        }


        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Private methods (+)>
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
        get pageSize(): number { return this._iPageSize; }
        set pageSize(value: number){ this._iPageSize = value; }
        get availablePageSizes(): number[] { return this._aiAvailablePageSizes; }
        set availablePageSizes(value: number[]){ this._aiAvailablePageSizes = value; }

        get filters(): RulesReportFiltersContainer { return this._oFilters; }
        set filters(value: RulesReportFiltersContainer){ this._oFilters = value; }
        get sortConditions(): SortCondition[] { return this._aoSortConditions; }
        set sortConditions(value: SortCondition[]){ this._aoSortConditions = value; }
        get autoRefreshIntervalInSeconds(): number { return this._iAutoRefreshIntervalInSeconds; }
        set autoRefreshIntervalInSeconds(value: number){ this._iAutoRefreshIntervalInSeconds = value; }





        ///</editor-fold>
    }

}