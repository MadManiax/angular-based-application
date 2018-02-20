///<reference path="Settings.ts"/>

module ge.cim.models {

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
            oRetval._iRowsPerPage = 20;
            return oRetval;
        }


        //*******************************************************************************
        //* Members
        //*******************************************************************************
        private _iRowsPerPage : number;

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
        get rowsPerPage(): number { return this._iRowsPerPage; }
        set rowsPerPage(value: number){ this._iRowsPerPage = value; }



        ///</editor-fold>
    }

}