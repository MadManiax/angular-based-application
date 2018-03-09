
module ge.cim.models {

    import Utils = jsutils.Utils;

    export enum SortingDirection {Asc, Desc}

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
            this._sCaption = sCaption;
            this._oDirection = SortingDirection.Asc;    // see FdS, page 74

            Utils.setObjectPropertyIfNotSet(this, "_sCaption",  this._sFieldName);

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
        get caption(){ return this._sCaption; }
        set caption(sValue:string){ this._sCaption = sValue; }
        get sortDirection(){ return this._oDirection; }
        //set sortDirection(oValue:SortingDirection){ this._oDirection = oValue; }



        public isDirectionAsc(){ return this._oDirection == SortingDirection.Asc; }
        public isDirectionDesc(){ return this._oDirection == SortingDirection.Desc; }

        public setDirectionAsc(){ this._oDirection = SortingDirection.Asc; }
        public setDirectionDesc(){ this._oDirection = SortingDirection.Desc; }

        public canBeDeleted(){ return true;}

        public toggleDirection()
        {
            if(this.isDirectionAsc() == true){
                this.setDirectionDesc();
            }
            else{
                this.setDirectionAsc();
            }
        }
        ///</editor-fold>
    }

}