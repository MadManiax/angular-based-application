/// <reference path="irestbaserule.ts" />

module ge.cim {
    import IRestBaseRule = ge.cim.IRestBaseRule;
    export interface IRestCounterRule extends IRestBaseRule<number> {
        Counter: number;
    }
}