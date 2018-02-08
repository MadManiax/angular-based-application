///<reference path="Rule.ts"/>

module ge.cim.models {

    export class User
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

        private _sUserId : string;
        private _sFirstName : string;
        private _sLastName : string;


        public constructor(sUserId:string)
        {
            this._sUserId = sUserId;
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
        get sUserId(): string
        {
            return this._sUserId;
        }

        set sUserId(value: string)
        {
            this._sUserId = value;
        }

        get sFirstName(): string
        {
            return this._sFirstName;
        }

        set sFirstName(value: string)
        {
            this._sFirstName = value;
        }

        get sLastName(): string
        {
            return this._sLastName;
        }

        set sLastName(value: string)
        {
            this._sLastName = value;
        }

        ///</editor-fold>
    }

}