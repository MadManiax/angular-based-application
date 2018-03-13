module ge.cim {

    export abstract class BaseClass
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


        public constructor()
        {

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
        protected getClassName()
        {
            return this.constructor.name;
        }

        protected createObjectForToJSON()
        {
            let oReval = {
                dummy : null    // required to make 'oRetval' an object and not an array
            };
            delete oReval.dummy;
            return oReval;
        }
        ///</editor-fold>

        //*******************************************************************************
        //* Public methods
        //*******************************************************************************
        ///<editor-fold desc="Public methods (+)>
        ///</editor-fold>
    }

}