
///<reference path="Rule.ts"/>
///<reference path="TableColumn.ts"/>

module ge.cim.models {

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
        public allowSorting(){ this._bAllowSorting = true; return this;}

        public isSortingAllowed(){ return this._bAllowSorting; }

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