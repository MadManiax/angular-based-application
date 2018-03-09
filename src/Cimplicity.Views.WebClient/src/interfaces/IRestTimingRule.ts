/// <reference path="irestbaserule.ts" />

module ge.cim {
    import IRestBaseRule = ge.cim.IRestBaseRule;
    export interface IRestTimingRule extends IRestBaseRule<string> {
        Seconds: number;
        LastSamplingDate: Date;
    }
}