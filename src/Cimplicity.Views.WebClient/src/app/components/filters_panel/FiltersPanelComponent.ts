///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../classes/models/RulesReportTableColumn.ts"/>
///<reference path="../../../classes/utils/VexUtils.ts"/>
///<reference path="../../../classes/models/SortCondition.ts"/>
///<reference path="../../services/LookupService.ts"/>
///<reference path="../../services/mocks/LookupServiceMock.ts"/>
///<reference path="../../../classes/models/filters/ProductionLineFilter.ts"/>
///<reference path="../../../interfaces/IProductionLine.ts"/>
///<reference path="../../../classes/models/RulesReportFiltersContainer.ts"/>
///<reference path="../../../classes/models/Filter.ts"/>

import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Filter = ge.cim.models.Filter;
import RulesReportFiltersContainer = ge.cim.models.RulesReportFiltersContainer;
import SortCondition = ge.cim.models.SortCondition;
import IProductionLine = ge.cim.IProductionLine;
import {LookupServiceMock} from "../../services/mocks/LookupServiceMock";
import ProductionLineFilter = ge.cim.models.ProductionLineFilter;
import WorkCellFilter = ge.cim.models.WorkCellFilter;


@Component({
    selector: 'rules-report-filters-panel',
    templateUrl: 'app/components/filters_panel/FiltersPanelTemplate.html'
})
export class FiltersPanelComponent implements OnInit, OnChanges, DoCheck
{
    private static ARR_INDEX_PROD_LINE  = 0;
    private static ARR_INDEX_WORK_CELL  = 1;
    private static ARR_INDEX_WORK_UNIT  = 2;
    private static ARR_INDEX_RULE_TYPE  = 3;
    private static ARR_INDEX_MATERIALS  = 4;


    // @Input('rulesList')
    // private _aoRulesList: Rule[];
    // @Input('userCanEdit')
    // private _bIsEditButtonEnabled : boolean;

    @Input('sortConditions')
    private _aoSortConditions : SortCondition[];
    @Output('onFiltersChanged')
    private _oEventEmitterFiltersChanged= new EventEmitter<RulesReportFiltersContainer>()
    //@Output('onSortChanged')
    //private _oEventEmitterSortChanged= new EventEmitter<...>()


    private _oAvailableFilters : RulesReportFiltersContainer;
    private _oSelectedFilters : RulesReportFiltersContainer;
    private _aiSelectedFiltersCount : number[];
    private _abEnabledFilters : boolean[];
    private _abInWaitingFilters : boolean[]

    constructor(private _oLookupService : LookupServiceMock)
    {
        this.initFilters();
    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit()
    {
        console.log('FiltersPanelComponent -> ngOnInit');

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        //debugger;
    }

    ngDoCheck()
    {
        let bAnyChange = false;
        if(Utils.isNullOrUndef(this._oSelectedFilters.filtersProductionLines) == false && this._oSelectedFilters.filtersProductionLines.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_PROD_LINE])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = this._oSelectedFilters.filtersProductionLines.length;
            bAnyChange = true;

            // then refresh the 'Work Cells' available filters according with
            // the selected 'Production Lines'
            this.refreshWorkCellsFilter();
        }

        if(Utils.isNullOrUndef(this._oSelectedFilters.filtersWorkCells) == false && this._oSelectedFilters.filtersWorkCells.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = this._oSelectedFilters.filtersWorkCells.length;
            bAnyChange = true;
        }

        if(Utils.isNullOrUndef(this._oSelectedFilters.filtersWorkUnits) == false && this._oSelectedFilters.filtersWorkUnits.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = this._oSelectedFilters.filtersWorkUnits.length;
            bAnyChange = true;
        }

        if(Utils.isNullOrUndef(this._oSelectedFilters.filtersRuleTypes) == false && this._oSelectedFilters.filtersRuleTypes.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = this._oSelectedFilters.filtersRuleTypes.length;
            bAnyChange = true;
        }

        if(Utils.isNullOrUndef(this._oSelectedFilters.filtersMaterialDefinitions) == false && this._oSelectedFilters.filtersMaterialDefinitions.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_MATERIALS])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_MATERIALS] = this._oSelectedFilters.filtersMaterialDefinitions.length;
            bAnyChange = true;
        }

        if(bAnyChange == true)
        {
            this._oEventEmitterFiltersChanged.emit(this._oSelectedFilters);
        }
    }
    ///</editor-fold>



    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>
    private initFilters()
    {
        //
        this._oAvailableFilters = new RulesReportFiltersContainer();
        this._oSelectedFilters = new RulesReportFiltersContainer();

        // Init an array to keep trace of enabled/disabled filters
        this._abEnabledFilters = [];
        this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = false;
        this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = false;
        this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = false;
        this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = false;
        this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS] = false;

        this._abInWaitingFilters = [];
        this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = false;
        this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = false;
        this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = false;
        this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = false;
        this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS] = false;

        // First step, load all available filters for 'Production Line'
        let sWorkArea = "";
        this.refreshProductionLineFilter(sWorkArea);

        //this._oAvailableFilters.filtersProductionLines = [new Filter("WR9000001"), new Filter("WR900002")];
        // this._oAvailableFilters.filtersWorkCells = [new Filter("WL9000001"), new Filter("WL900002")];
        // this._oAvailableFilters.filtersWorkUnits = [new Filter("WT9000001"), new Filter("WT900002")];
        // this._oAvailableFilters.filtersRuleTypes = [new Filter("Counter"), new Filter("Timing"), new Filter("Event")];
        // this._oAvailableFilters.filtersMaterialDefinitions = [new Filter("MaterialDefinitionId_1"), new Filter("MaterialDefinitionId_2")];
        //
        //
        // this._oSelectedFilters.filtersProductionLines = [new Filter("WR9000001")]; /* null means all */
        // this._oSelectedFilters.filtersWorkCells = [new Filter("WL900002")];
        // this._oSelectedFilters.filtersWorkUnits = [new Filter("WT9000001")];
        // this._oSelectedFilters.filtersRuleTypes = [new Filter("Counter"), new Filter("Event")];
        // this._oSelectedFilters.filtersMaterialDefinitions = [new Filter("MaterialDefinitionId_1")];

        // Set the number of seleced item according with the selections retrieved
        // from server configuration
        this._aiSelectedFiltersCount = [];
        this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = this._oSelectedFilters.filtersProductionLines.length;
        this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = this._oSelectedFilters.filtersWorkCells.length;
        this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = this._oSelectedFilters.filtersWorkUnits.length;
        this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = this._oSelectedFilters.filtersRuleTypes.length;
        this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_MATERIALS] = this._oSelectedFilters.filtersMaterialDefinitions.length;
    }


    private refreshProductionLineFilter(sWorkArea : string)
    {
        this.setProductionLineFilterInWaiting(true);
        this._oLookupService.getProductionLines(sWorkArea).subscribe(
            (oData:IProductionLine[])=>{
                this._oAvailableFilters.filtersProductionLines = ProductionLineFilter.createFiltersListFromObjectList(oData, ProductionLineFilter);
            },
            (oReason:any)=>{

            },
            ()=>{
                this.setProductionLineFilterInWaiting(false);
                this.setProductionLineFilterEnabled();
            }
        )
    }

    private refreshWorkCellsFilter()
    {
        this.setWorkCellFilterInWaiting(true);
        this._oLookupService.getWorkCells(this._oSelectedFilters.filtersProductionLines).subscribe(
            (oData:IProductionLine[])=>{
                this._oAvailableFilters.filtersWorkCells = WorkCellFilter.createFiltersListFromObjectList(oData, WorkCellFilter);
            },
            (oReason:any)=>{

            },
            ()=>{
                this.setWorkCellFilterInWaiting(false);
                this.setWorkCellFilterEnabled();
            }
        )
    }
    ///</editor-fold>

    //*******************************************************************************
    //* Protected methods
    //*******************************************************************************
    ///<editor-fold desc="Protected methods (+)>
    ///</editor-fold>

    //*******************************************************************************
    //* Public methods
    //*******************************************************************************
    ///<editor-fold desc="Public methods (+)>
    get sortConditionsList(){ return this._aoSortConditions; }
    set sortConditionsList(aoValue){ this._aoSortConditions = aoValue; }

    public isProductionLineFilterEnabled(){ return this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE]; }
    public isWorkCellFilterEnabled(){ return this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL]; }
    public isWorkUnitFilterEnabled(){ return this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT]; }
    public isRuleTypeFilterEnabled(){ return this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE]; }
    public isMaterialsFilterEnabled(){ return this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS]; }

    public isProductionLineFilterInWaiting(){ return this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE]; }
    public isWorkCellFilterInWaiting(){ return this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL]; }
    public isWorkUnitFilterInWaiting(){ return this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT]; }
    public isRuleTypeFilterInWaiting(){ return this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE]; }
    public isMaterialsFilterInWaiting(){ return this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS]; }

    public setProductionLineFilterEnabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = true; }
    public setWorkCellFilterEnabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = true; }
    public setWorkUnitFilterEnabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = true; }
    public setRuleTypeFilterEnabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = true; }
    public setMaterialsFilterEnabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS] = true; }
    public setProductionLineFilterDisabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = false; }
    public setWorkCellFilterDisabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = false; }
    public setWorkUnitFilterDisabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = false; }
    public setRuleTypeFilterDisabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = false; }
    public setMaterialsFilterDisabled(){ this._abEnabledFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS] = false; }

    public setProductionLineFilterInWaiting(bIsWaiting:boolean){this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = bIsWaiting; }
    public setWorkCellFilterInWaiting(bIsWaiting:boolean){this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = bIsWaiting; }
    public setWorkUnitFilterInWaiting(bIsWaiting:boolean){this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = bIsWaiting; }
    public setRuleTypeFilterInWaiting(bIsWaiting:boolean){this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = bIsWaiting; }
    public setMaterialsFilterInWaiting(bIsWaiting:boolean){this._abInWaitingFilters[FiltersPanelComponent.ARR_INDEX_MATERIALS] = bIsWaiting; }



    public getFilterCaptionPropertyName(){ return "_sCaption"; }

    public clearAllFilters()
    {
        this._oSelectedFilters.clearAllFilters();
    }
    ///</editor-fold>


}