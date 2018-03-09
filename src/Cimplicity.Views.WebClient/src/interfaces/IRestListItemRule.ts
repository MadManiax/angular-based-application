module ge.cim {

    export interface IRestListItemRule
    {
        workCell: string;
        workUnit: string;
        actualNumber?: string;
        actualDate?: Date;
        remainingNumber?: number;
        remainingDate?: Date;
        set: string;
        overflowRemaining?: number;
        overflowSet?: number;
        ruleName: string;
        ruleType: string;
        ruleComment: string;
        workArea: string;
        productionLine: string;
    }

}