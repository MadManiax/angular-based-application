///<reference path="FilterComposite.ts"/>
///<reference path="../../../interfaces/IWorkCell.ts"/>


module ge.cim.models {


    export class WorkCellFilter extends FilterComposite<IWorkCell>
    {
        constructor(oData : IWorkCell)
        {
            super(oData, oData.DisplayName, oData.S95Id);
        }
    }
}