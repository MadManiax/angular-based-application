///<reference path="Rule.ts"/>

module ge.cim.models {

    export class EventRule extends Rule
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
        public getRemainingToString():string { return ""; }
        public getSetToString():string { return ""; }
        public getActualToString():string { return ""; }

        getRuleType(): string {return "Event"; }

        public fillWithDummyData(bUseNullWorkUnit:boolean=false, bUseNoOverflow:boolean=false):EventRule
        {
            this.WorkCell = "OP" + Math.round(Math.random() * 99);
            if(bUseNullWorkUnit == false) {
                this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
            }else{
                this.WorkUnit = null;
            }

            // In seconds
            this.Set = null;
            this.Actual = null;
            this.Remaining = null;

            this.OverflowSet = Math.round(Math.random() * 99);
            if(Math.random() > 0.5) {
                this.OverflowRemaining = Math.round(Math.random() * 10);
            }else{
                this.OverflowRemaining = null;
            }

            this.Name = "Event Rule Name-" + Math.round(Math.random() * 9999);

            return this;
        }
        ///</editor-fold>
    }

}