///<reference path="Rule.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export class Filter
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

        private _sCaption : string;
        private _oValue : any


        public constructor(sCaption:string = null, oValue : any = null)
        {
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

        ///</editor-fold>
    }

}