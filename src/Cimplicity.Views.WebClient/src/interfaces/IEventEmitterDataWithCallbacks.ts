module ge.cim {

    export interface IEventEmitterDataWithCallbacks<T>
    {
        onSuccess : any, //()=>{},
        onError : any, //(sMessage : string)=>{}
        data : T;
    }

}