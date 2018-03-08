///<reference path="../../../interfaces/IWorkUnit.ts"/>
///<reference path="FilterComposite.ts"/>


module ge.cim.models {


    export class WorkUnitFilter extends FilterComposite<IWorkUnit>
    {
        constructor(oData : IWorkUnit)
        {
            super(oData, oData.DisplayName, oData.S95Id);
        }
    }
}