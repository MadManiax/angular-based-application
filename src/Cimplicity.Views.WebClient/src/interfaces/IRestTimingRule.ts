/// <reference path="irestbaserule.ts" />

module ge.cim {
    import IRestBaseRule = ge.cim.IRestBaseRule;
    export interface IRestTimingRule extends IRestBaseRule<Date> {
        Seconds: number;
        LastSamplingDate: Date;
    }
}