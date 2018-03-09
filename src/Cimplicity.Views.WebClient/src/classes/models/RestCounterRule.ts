/// <reference path="../../interfaces/irestcounterrule.ts" />
module ge.cim.models {
    import IRestCounterRule = ge.cim.IRestCounterRule;

    export class RestCounterRule implements IRestCounterRule {
        constructor(ruleExecutionId: string) {
            this.RuleExecutionId = ruleExecutionId;
        }
        Counter: number;
        RuleExecutionId: string;
        Set?: number;
        Actual?: number;

    }
}

