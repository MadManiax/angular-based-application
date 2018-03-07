module ge.cim {

    export interface IBaseServerResponse
    {
        result?     : any;
        status      : number;
        errors      : any;
        message     : string;
    }

}