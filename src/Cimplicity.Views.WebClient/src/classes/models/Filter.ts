///<reference path="Rule.ts"/>
///<reference path="../BaseClass.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export class Filter extends BaseClass
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

        _sCaption : string;
        _oValue : any


        public constructor(sCaption:string = null, oValue : any = null)
        {
            super();
            this._sCaption = sCaption;
            this._oValue = oValue;
            if( Utils.isNullOrUndef(this._oValue) == true && Utils.isNullOrUndef(this._oValue) == false)
            {
                this._oValue = this._sCaption;
            }
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
        public fromJSON(oJson)
        {

        }

        public toJSON()
        {
            let oReval = this.createObjectForToJSON();
            oReval["caption"] = this._sCaption;
            oReval["value"] = this._oValue;
            return oReval;

        }
        ///</editor-fold>
    }

}