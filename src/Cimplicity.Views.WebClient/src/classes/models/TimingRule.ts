///<reference path="Rule.ts"/>
///<reference path="../../../typings/index.d.ts"/>
///<reference path="../utils/Utils.ts"/>



module ge.cim.models
{
    //import * as moment from 'moment/moment';
    //var moment = require('moment');

    import Utils = jsutils.Utils;

    export class TimingRule extends Rule
    {


        //*******************************************************************************
        //* Static variables
        //*******************************************************************************
        private static RULE_TYPE = "Timing";
        public static DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

        //*******************************************************************************
        //* Static methods
        //*******************************************************************************
        public static isMyJsonInstance(oJson:any)
        {
            let sType = Utils.getObjectProperty(oJson, Rule.JSON_FIELD_TYPE, null);
            return (sType == TimingRule.RULE_TYPE);
        }

        //*******************************************************************************
        //* Members
        //*******************************************************************************

        private _oActualDateTime : moment.Moment;


        public constructor()
        {
            super();
        }


        //*******************************************************************************
        //* Private methods
        //*******************************************************************************
        ///<editor-fold desc="Private methods (+)>
        public calculateRemaining()
        {
            let oNow = moment();
            let iDiff = oNow.diff(this._oActualDateTime, "seconds");

            return this.Set - iDiff;
        }
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
        get Actual(): number { throw "Cannot get a numeric 'actual' for Timing rule. Use 'ActualDateTime' property."; }
        set Actual(value: number) { throw "Cannot set a numeric 'actual' for Timing rule. Use 'ActualDateTime' property."; }
        get ActualDateTime(): moment.Moment { return this._oActualDateTime; }
        set ActualDateTime(value: moment.Moment) { this._oActualDateTime = value; }

        public getRemainingToString():string { return this.Remaining + " sec"; }
        public getSetToString():string { return this.Set + " sec"; }
        public getActualToString():string { return this._oActualDateTime.format(TimingRule.DATETIME_FORMAT); }
        public getActualAsDateTime():moment.Moment{ return this._oActualDateTime; }

        getRuleType(): string {return TimingRule.RULE_TYPE; }

        // public updateActualDateTimeByDateString(sDate:string)
        // {
        //     let oDateTime = moment(sDate, TimingRule.DATETIME_FORMAT)
        //     if( oDateTime.isValid() == true){
        //         this._oActualDateTime = oDateTime;
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }

        public isActualEqualsSet():boolean
        {
            return (this.Remaining == 0);

        }
        public isInWarning():boolean
        {
            if( this.isActualEqualsSet() == true){ return true}
            else if( Utils.isNullOrUndef(this.OverflowRemaining) == false && Utils.isNullOrUndef(this.OverflowSet) == false )
            {
                return this.OverflowRemaining < this.OverflowSet;
            }
        }
        public hasOverflowReachedLimit():boolean
        {
            if( Utils.isNullOrUndef(this.OverflowRemaining) == false ){
                return this.OverflowRemaining == 0 }
            return false;
        }


        public fillWithDummyData(bUseNullWorkUnit:boolean=false, bUseNoOverflow:boolean=false):TimingRule
        {
            this.WorkCell = "ABCDEFGH" + Math.round(Math.random() * 99);
            if(bUseNullWorkUnit == false) {
                this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
            }else{
                this.WorkUnit = null;
            }

            let oNow = moment();

            // As dummy data, first generate the 'interval' (in seconds) when rule trigger
            this.Set = Math.round(Math.random() * 9999);

            // then generare a fake date to use as 'actual' (so last time the rules has been triggered)
            // using the actual datetime minus the interval plus a random value (smaller than 'Set)
            let iDiffInSeconds = this.Set - Math.round(Math.random() * 999)
            let oFakeActualDate = moment(oNow).add(-1*iDiffInSeconds, 'seconds');

            // Actual is Unix timestamp
            //this.Actual = oFakeActualDate.unix();
            this.ActualDateTime = oFakeActualDate;

            // then, the remaining value is difference
            this.Remaining = this.calculateRemaining();

            this.OverflowSet = Math.round(Math.random() * 99);
            if(Math.random() > 0.5) {
                this.OverflowRemaining = Math.round(Math.random() * 10);
            }else{
                this.OverflowRemaining = null;
            }

            this.Name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum orci ut neque egestas, id maximus arcu interdum. Duis id suscipit mi, id sollicitudin lacus. Proin vitae iaculis leo-" + Math.round(Math.random() * 9999);

            return this;
        }

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
            super.fromJSON(oJson);
            //this._oActualDateTime = moment.unix(this.Actual);
            this._oActualDateTime = moment(oJson.ActualDate, "YYYY-MM-DDTHH:mm:ss:SSS");
            this._oActualDateTime.millisecond(0);

            return this;
        }

        public toJSON()
        {
            let oRetval = super.toJSON();
            oRetval.Actual = this._oActualDateTime.unix();
            return oRetval;
        }
        ///</editor-fold>
    }

}