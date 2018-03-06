///<reference path="../BaseClass.ts"/>
///<reference path="../utils/Utils.ts"/>

module ge.cim.models {

    import Utils = jsutils.Utils;

    export abstract class Rule extends BaseClass
    {

        //*******************************************************************************
        //* Static variables
        //*******************************************************************************
        protected static JSON_FIELD_TYPE        = "RuleType";
        protected static JSON_FIELD_NAME        = "RuleName";


        //*******************************************************************************
        //* Static methods
        //*******************************************************************************



        //*******************************************************************************
        //* Members
        //*******************************************************************************
        private _WorkCell: string;
        private _WorkUnit: string;
        private _ActualNumber: number;
        private _RemainingNumber: number;
        private _Set: number;
        private _OverflowRemaining: number;
        private _OverflowSet: number;
        private _Name: string;
        private _WorkArea: string;
        private _ProductionLine: string;
        private _Comment : string;


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

        get Actual(): number { return this._ActualNumber; }
        set Actual(value: number) { this._ActualNumber = value; }

        get Remaining(): number {
            return this._RemainingNumber;
        }

        set Remaining(value: number) {
            this._RemainingNumber = value;
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

        get WorkArea(): string { return this._WorkArea; }
        set WorkArea(value: string) { this._WorkArea = value; }
        get ProductionLine(): string { return this._ProductionLine; }
        set ProductionLine(value: string) { this._ProductionLine = value; }
        get Comment(): string { return this._Comment; }
        set Comment(value: string) { this._Comment = value; }

        public abstract getRemainingToString():string;
        public abstract getSetToString():string;
        public abstract getActualToString():string;

        public abstract fillWithDummyData():Rule;
        public abstract getRuleType():string;
        public abstract isActualEqualsSet():boolean;
        public abstract isInWarning():boolean;
        public abstract hasOverflowReachedLimit():boolean;


        public fromJSON(oJson:any)
        {
            /*
            "WorkCell": "WL900002",
            "WorkUnit": "WT900002",
            "ActualNumber": null,
            "ActualDate": "2018-02-27T17:22:36.98",
            "RemainingNumber": 0,
            "RemainingDate": null,
            "Set": 30,
            "OverflowRemaining": null,
            "OverflowSet": 3,
            "RuleName": "NU20180227172236970",
            "RuleType": "Timing",
            "WorkArea": "IM900001",
            "ProductionLine": "WR900001"
            */

            this._WorkCell          = oJson.WorkCell;
            this._WorkUnit          = oJson.WorkUnit;
            this._ActualNumber      = oJson.ActualNumber;
            this._RemainingNumber   = oJson.RemainingNumber;
            this._Set               = oJson.Set;
            this._OverflowRemaining = oJson.OverflowRemaining;
            this._OverflowSet       = oJson.OverflowSet;
            this._Name              = oJson[Rule.JSON_FIELD_NAME];
            this._WorkArea          = oJson.WorkArea;
            this._ProductionLine    = oJson.ProductionLine;
            this._Comment           = Utils.getObjectProperty(oJson, "RuleComment", "");

            return this;
        }

        public toJSON()
        {
            let oRetval = {
                WorkCell            : this._WorkCell,
                WorkUnit            : this._WorkUnit,
                Actual              : this._ActualNumber,
                Remaining           : this._RemainingNumber,
                Set                 : this._Set,
                OverflowRemaining   : this._OverflowRemaining,
                OverflowSet         : this._OverflowSet,
                // RuleName            : this._Name,
                WorkArea            : this._WorkArea,
                ProductionLine      : this._ProductionLine,
                RuleComment         : this._Comment
            };
            oRetval[Rule.JSON_FIELD_NAME] = this._Name;
            oRetval[Rule.JSON_FIELD_TYPE] = this.getRuleType();

            return oRetval;
        }
        ///</editor-fold>
    }

}