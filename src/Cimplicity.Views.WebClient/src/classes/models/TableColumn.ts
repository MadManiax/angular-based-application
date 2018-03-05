///<reference path="Rule.ts"/>

module ge.cim.models {

    export class TableColumn
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
        protected _sId : string;
        protected _sCaption : string;
        protected _sCssClasses : string;

        public constructor(sId : string, sCaption : string)
        {
            this._sId = sId;
            this._sCaption = sCaption;
            this._sCssClasses = "";
        }


        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Private methods (+)>
        ///</editor-fold>

        //*******************************************************************************
        //* Protected methods
        //*******************************************************************************
        ///<editor-fold desc="Protected methods (+)>

        ///</editor-fold>

        //*******************************************************************************
        //* Public methods
        //*******************************************************************************
        ///<editor-fold desc="Public methods (+)>
        get id(){return this._sId;}
        get caption(){return this._sCaption;}
        get cssClasses(){return this._sCssClasses;}

        public setCssClasses(sClasses:string){ this._sCssClasses = sClasses; return this;}
        //public abstract setDefault();

        ///</editor-fold>
    }

}