
module ge.cim.models {

    import Utils = jsutils.Utils;

    enum SortingDirection {ASC, DESC}

    export class SortCondition
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

        private _sFieldName : string;
        private _sCaption : string;
        private _oDirection : SortingDirection;


        public constructor(sFieldName:string = null, sCaption : string = null)
        {
            this._sFieldName = sFieldName;
            Utils.setObjectPropertyIfNotSet(this, "_sCaption",  this._sFieldName);
            this._oDirection = SortingDirection.ASC;    // see FdS, page 74
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
        get fieldName(){ return this._sFieldName; }
        set fieldName(sValue:string){ this._sFieldName = sValue; }

        public isDirectionAsc(){ return this._oDirection == SortingDirection.ASC; }
        public isDirectionDesc(){ return this._oDirection == SortingDirection.DESC; }

        public setDirectionAsc(){ this._oDirection = SortingDirection.ASC; }
        public setDirectionDesc(){ this._oDirection = SortingDirection.DESC; }

        public toggleDirection()
        {
            if(this.isDirectionAsc() == true){ this.setDirectionDesc(); }
            else{ this.isDirectionAsc(); }
        }
        ///</editor-fold>
    }

}