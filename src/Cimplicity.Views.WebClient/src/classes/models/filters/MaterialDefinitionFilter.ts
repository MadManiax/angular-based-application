///<reference path="../../../interfaces/IMaterial.ts"/>
///<reference path="FilterComposite.ts"/>


module ge.cim.models {


    export class MaterialDefinitionFilter extends FilterComposite<IMaterial>
    {
        constructor(oData : IMaterial)
        {
            super(oData, oData.MaterialDefinitionId, oData.S95Id);
        }
    }
}