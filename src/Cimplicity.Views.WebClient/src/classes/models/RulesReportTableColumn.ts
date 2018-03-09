
///<reference path="Rule.ts"/>
///<reference path="TableColumn.ts"/>
///<reference path="../utils/Utils.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export class RulesReportTableColumn extends TableColumn
    {

        //*******************************************************************************
        //* Static variables
        //*******************************************************************************


        //*******************************************************************************
        //* Static methods
        //*******************************************************************************


        //*******************************************************************************
        //* Members
        //*******************************************************************************
        protected _bAllowFilters : boolean;
        protected _bAllowSorting : boolean;
        protected _oSortCondition : SortCondition;

        public constructor(sId : string, sCaption : string)
        {
            super(sId, sCaption);
            this._bAllowFilters = false;
            this._bAllowSorting = false;
        }


        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Private methods (+)>
        private allowSorting(){ this._bAllowSorting = true; return this;}
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
        public allowFilters(){ this._bAllowFilters = true; return this;}


        public isSortingAllowed(){ return this._bAllowSorting; }

        public setSortCondition(oSortCondition:SortCondition)
        {
            if(Utils.isNullOrUndef(oSortCondition) == false)
            {
                this._oSortCondition = oSortCondition;
                this.allowSorting();
            }
            return this;
        }

        public getSortCondition(){ return this._oSortCondition; }

        public getCssClasses()
        {
            let sClasses = this.cssClasses;
            if(this._bAllowSorting == true)
            {
                sClasses += " " + "col-allow-sorting";
            }
            return sClasses;
        }
        //public abstract setDefault();

        ///</editor-fold>
    }

}