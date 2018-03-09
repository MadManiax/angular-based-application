/// <reference path="../../interfaces/iresttimingrule.ts" />

module ge.cim.models {
    import IRestTimingRule = ge.cim.IRestTimingRule;

    export class RestTimingRule implements IRestTimingRule {
        constructor(ruleExecutionId: string) {
            this.RuleExecutionId = ruleExecutionId;
        }
        Seconds: number;
        LastSamplingDate: Date;
        RuleExecutionId: string;
        Set?: number;
        Actual?: string;
    }
}
