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
        public static deserializeFromJson(oJson)
        {
            let oRetval = new Filter();
            oRetval.fromJSON(oJson);
            return oRetval;
        }

        public static deserializeFiltersListFromJson(oJson)
        {
            let aoRetval = [];
            for(let i = 0; i < oJson.length; i++)
            {
                aoRetval.push(Filter.deserializeFromJson(oJson[i]))
            }
            return aoRetval;
        }


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
        get value(){ return this._oValue; }
        set value(oValue){ this._oValue = oValue; }

        public fromJSON(oJson)
        {
            this._sCaption = oJson["caption"];
            this._oValue = oJson["value"];
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