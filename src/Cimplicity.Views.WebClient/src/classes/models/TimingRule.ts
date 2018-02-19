///<reference path="Rule.ts"/>
///<reference path="../../../typings/index.d.ts"/>



module ge.cim.models
{
    //import * as moment from 'moment/moment';
    //var moment = require('moment');

    export class TimingRule extends Rule
    {


        //*******************************************************************************
        //* Static variables
        //*******************************************************************************
        public static DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

        //*******************************************************************************
        //* Static methods
        //*******************************************************************************


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
        public getRemainingToString():string { return this.Remaining + " sec"; }
        public getSetToString():string { return this.Set + " sec"; }
        public getActualToString():string { return this._oActualDateTime.format(TimingRule.DATETIME_FORMAT); }
        public getActualAsDateTime():moment.Moment{ return this._oActualDateTime; }

        getRuleType(): string {return "Timing"; }

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
            this.Actual = oFakeActualDate.unix();
            this._oActualDateTime = moment.unix(this.Actual);

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
        ///</editor-fold>
    }

}