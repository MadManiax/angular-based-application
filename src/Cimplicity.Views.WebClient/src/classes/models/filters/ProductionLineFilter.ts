///<reference path="../../../interfaces/IProductionLine.ts"/>
///<reference path="FilterComposite.ts"/>


module ge.cim.models {


   export class ProductionLineFilter extends FilterComposite<IProductionLine>
   {
       constructor(oProductionLine : IProductionLine)
       {
            super(oProductionLine, oProductionLine.DisplayName, oProductionLine.S95Id);
       }
   }
}
