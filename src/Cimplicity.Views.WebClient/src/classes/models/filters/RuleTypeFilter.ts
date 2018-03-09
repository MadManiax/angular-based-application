///<reference path="FilterComposite.ts"/>
///<reference path="../../../interfaces/IWorkCell.ts"/>


module ge.cim.models
{
    export class RuleTypeFilter extends Filter
    {
        public static createFiltersList(aoList:string[]) : RuleTypeFilter[]
        {
            let aoRetval = [];
            for(let i = 0; i < aoList.length; i++)
            {
                try{
                    aoRetval.push(new RuleTypeFilter(aoList[i]));
                }catch (e){

                }
            }
            return aoRetval;
        }


        constructor(oData : string)
        {
            super(oData, oData);
        }
    }
}