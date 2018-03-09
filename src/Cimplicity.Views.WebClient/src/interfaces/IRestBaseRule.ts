module ge.cim {
    /*Interface used to abstract UI objects with the service objects*/
    export interface IRestBaseRule<TActual> {
        RuleExecutionId?: string;
        Set?: number;
        Actual?: TActual;
    }
}
