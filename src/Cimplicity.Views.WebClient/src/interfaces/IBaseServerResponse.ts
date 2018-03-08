module ge.cim {

    export interface IBaseServerResponse
    {
        Result?     : any;
        Status      : number;
        Errors      : any;
        Message     : string;
    }

}