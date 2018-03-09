///<reference path="../models/SortCondition.ts"/>
module ge.cim.queryreport {
    // export enum SortDirection {
    //     Asc,
    //     Desc
    // }

    import SortingDirection = ge.cim.models.SortingDirection;

    export enum FieldOrder {
        WlWt,
        RuleType,
        RemainingOverflow,
        RuleName,
        Remaining
    }

    export class OrderByInfo {
        constructor(fieldName: FieldOrder, direction: SortingDirection) {
            this.FieldName = fieldName;
            this.Direction = direction;
        }
        FieldName: FieldOrder;
        Direction: SortingDirection;
    }
}