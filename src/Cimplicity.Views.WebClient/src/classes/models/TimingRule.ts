///<reference path="Rule.ts"/>

module ge.cim.models {

    export class TimingRule extends Rule
    {


        //*******************************************************************************
        //* Static variables
        //*******************************************************************************
        protected static JSON_FIELD_WORK_CELL = "WorkCell";


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
        public getRemainingToString():string { return this.Remaining + " sec"; }
        public getSetToString():string { return this.Set + " sec"; }
        public getActualToString():string { return this.Actual + " sec"; }

        getRuleType(): string {return "Timing"; }

        public fillWithDummyData(bUseNullWorkUnit:boolean=false, bUseNoOverflow:boolean=false):TimingRule
        {
            this.WorkCell = "OP" + Math.round(Math.random() * 99);
            if(bUseNullWorkUnit == false) {
                this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
            }else{
                this.WorkUnit = null;
            }

            // In seconds
            this.Set = Math.round(Math.random() * 9999);
            do {
                this.Actual = Math.round(Math.random() * 999);
            }while(this.Actual > this.Set)
            this.Remaining = this.Set - this.Actual;

            this.OverflowSet = Math.round(Math.random() * 99);
            if(Math.random() > 0.5) {
                this.OverflowRemaining = Math.round(Math.random() * 10);
            }else{
                this.OverflowRemaining = null;
            }

            this.RuleName = "Timing Rule Name-" + Math.round(Math.random() * 9999);

            return this;
        }
        ///</editor-fold>
    }

}