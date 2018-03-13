module ge.cim.models {


    export abstract class FilterComposite<T> extends Filter
    {
        public static createFiltersListFromObjectList<T>(aoList:T[], oClass:any)
        {
            let aoRetval = [];
            for(let i = 0; i < aoList.length; i++)
            {
                try{
                    aoRetval.push(new oClass(aoList[i]));
                }catch (e){

                }
            }
            return aoRetval;
        }


        private _oData : T;

        constructor(oData : T, sCaption:string, sValue: any)
        {
            super(sCaption, sValue);
            this._oData= oData;
        }



        public fromJSON(oJson)
        {

        }

        public toJSON()
        {
            let oReval = super.toJSON();
            oReval["data"] = this._oData;
            return oReval;

        }
    }
}