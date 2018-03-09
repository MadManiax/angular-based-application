module ge.cim.queryreport {
    export enum SortDirection {
        Asc,
        Desc
    }

    export enum FieldOrder {
        WlWt,
        RuleType,
        RemainingOverflow,
        RuleName,
        Remaining
    }

    export class OrderByInfo {
        constructor(fieldName: FieldOrder, direction: SortDirection) {
            this.FieldName = fieldName;
            this.Direction = direction;
        }
        FieldName: FieldOrder;
        Direction: SortDirection;
    }
}