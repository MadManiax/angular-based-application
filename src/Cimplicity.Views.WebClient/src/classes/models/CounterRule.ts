///<reference path="Rule.ts"/>

module ge.cim.models {

    export class CounterRule extends Rule
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
        public getRemainingToString():string { return this.Remaining.toString(); }
        public getSetToString():string { return this.Set.toString(); }
        public getActualToString():string { return this.Actual.toString(); }

        getRuleType(): string {return "Counter"; }

        public fillWithDummyData(bUseNullWorkUnit:boolean=false, bUseNoOverflow:boolean=false):CounterRule
        {
            this.WorkCell = "OP" + Math.round(Math.random() * 99);
            if(bUseNullWorkUnit == false) {
                this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
            }else{
                this.WorkUnit = null;
            }

            // In seconds
            this.Set = Math.round(Math.random() * 999);
            do {
                this.Actual = Math.round(Math.random() * 99);
            }while(this.Actual > this.Set)
            this.Remaining = this.Set - this.Actual;

            this.OverflowSet = Math.round(Math.random() * 99);
            if(Math.random() > 0.5) {
                this.OverflowRemaining = Math.round(Math.random() * 10);
            }else{
                this.OverflowRemaining = null;
            }

            //this.Name = "Counter Rule Name-" + Math.round(Math.random() * 9999);
            this.Name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum orci ut neque egestas, id maximus arcu interdum. Duis id suscipit mi, id sollicitudin lacus. Proin vitae iaculis leo-" + Math.round(Math.random() * 9999);

            return this;
        }
        ///</editor-fold>
    }

}