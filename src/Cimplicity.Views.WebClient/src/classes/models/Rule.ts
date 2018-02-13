
module ge.cim.models {

    export abstract class Rule
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
        private _WorkCell: string;
        private _WorkUnit: string;
        private _Actual: number;
        private _Remaining: number;
        private _Set: number;
        private _OverflowRemaining: number;
        private _OverflowSet: number;
        private _Name: string;


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
        ///</editor-fold>

        //*******************************************************************************
        //* Public methods
        //*******************************************************************************
        ///<editor-fold desc="Public methods (+)>
        get WorkCell(): string {
            return this._WorkCell;
        }

        set WorkCell(value: string) {
            this._WorkCell = value;
        }

        get WorkUnit(): string {
            return this._WorkUnit;
        }

        set WorkUnit(value: string) {
            this._WorkUnit = value;
        }

        get Actual(): number {
            return this._Actual;
        }

        set Actual(value: number) {
            this._Actual = value;
        }

        get Remaining(): number {
            return this._Remaining;
        }

        set Remaining(value: number) {
            this._Remaining = value;
        }

        get Set(): number {
            return this._Set;
        }

        set Set(value: number) {
            this._Set = value;
        }

        get OverflowRemaining(): number {
            return this._OverflowRemaining;
        }

        set OverflowRemaining(value: number) {
            this._OverflowRemaining = value;
        }

        get OverflowSet(): number {
            return this._OverflowSet;
        }

        set OverflowSet(value: number) {
            this._OverflowSet = value;
        }

        get Name(): string {
            return this._Name;
        }

        set Name(value: string) {
            this._Name = value;
        }

        public abstract getRemainingToString():string;
        public abstract getSetToString():string;
        public abstract getActualToString():string;

        public abstract fillWithDummyData():Rule;
        public abstract getRuleType():string;
        ///</editor-fold>
    }

}