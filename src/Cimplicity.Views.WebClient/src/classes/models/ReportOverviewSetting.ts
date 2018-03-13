///<reference path="Settings.ts"/>
///<reference path="../utils/Utils.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

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

        public static deserializeFromJson(oJson)
        {
            let oRetval = new ReportOverviewSetting();
            oRetval.fromJSON(oJson);
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



        public fromJSON(oJson)
        {
            let oDefault = ReportOverviewSetting.createDefault();

            let sUser = oJson.user;
            let sArea = oJson.area;
            let oData = oJson.data;

            this.pageSize = Utils.getObjectProperty(oData, "pageSize", oDefault.pageSize);
            this.availablePageSizes = Utils.getObjectProperty(oData, "availablePageSize", oDefault.availablePageSizes);
            this.autoRefreshIntervalInSeconds = Utils.getObjectProperty(oData, "autoRefreshIntervalSeconds", oDefault.autoRefreshIntervalInSeconds);

            let oJsonFilters = Utils.getObjectProperty(oData, "filters", null);
            if( oJsonFilters != null){
                this.filters = RulesReportFiltersContainer.deserializeFromJson(oJsonFilters);
            }
            else {
                this.filters = oDefault.filters;
            }

            let oJsonSortConditions = Utils.getObjectProperty(oData, "sortConditions", oDefault.filters);
            if( oJsonSortConditions != null)
            {
                let aoTemp = [];
                for(let i = 0; i < oJsonSortConditions.length; i++)
                {
                    aoTemp.push( SortCondition.deserializeFromJson(oJsonSortConditions[i]))
                }
                this.sortConditions = aoTemp;
            }
            else {
                this.sortConditions = oDefault.sortConditions;
            }
        }

        public toJSON()
        {
            let oReval = {
                user : "gooduser",
                area : "workarea0123456789",
                data : {
                    "pageSize"                      : this.pageSize,
                    "availablePageSize"             : this.availablePageSizes,
                    "filters"                       : this.filters,
                    "sortConditions"                : this.sortConditions,
                    "autoRefreshIntervalSeconds"    : this.autoRefreshIntervalInSeconds
                }
        };

            return oReval;

        }


        ///</editor-fold>
    }

}