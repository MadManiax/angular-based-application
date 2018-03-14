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
///<reference path="../../../classes/models/filters/RuleTypeFilter.ts"/>
///<reference path="../../../classes/models/filters/MaterialDefinitionFilter.ts"/>
///<reference path="../../../classes/models/filters/WorkCellFilter.ts"/>

import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Filter = ge.cim.models.Filter;
import RulesReportFiltersContainer = ge.cim.models.RulesReportFiltersContainer;
import SortCondition = ge.cim.models.SortCondition;
import IProductionLine = ge.cim.IProductionLine;
import {LookupServiceMock} from "../../services/mocks/LookupServiceMock";
import ProductionLineFilter = ge.cim.models.ProductionLineFilter;
import WorkCellFilter = ge.cim.models.WorkCellFilter;
import RuleTypeFilter = ge.cim.models.RuleTypeFilter;
import IMaterial = ge.cim.IMaterial;
import MaterialDefinitionFilter = ge.cim.models.MaterialDefinitionFilter;
import VexUtils = jsutils.VexUtils;


enum FilterType{
    ProductionLine  = 0,
    WorkCell        = 1,
    WorkUnit        = 2,
    RuleType        = 3,
    Materials       = 4
}

export enum FiltersPanelAction {
    CLEAR_ALL_FILTERS,
    SAVE,
    LOAD
}

@Component({
    selector: 'rules-report-filters-panel',
    templateUrl: 'app/components/filters_panel/FiltersPanelTemplate.html'
})
export class FiltersPanelComponent implements OnInit, OnChanges, DoCheck
{
    private static ARR_INDEX_PROD_LINE  = FilterType.ProductionLine;
    private static ARR_INDEX_WORK_CELL  = FilterType.WorkCell;
    private static ARR_INDEX_WORK_UNIT  = FilterType.WorkUnit;
    private static ARR_INDEX_RULE_TYPE  = FilterType.RuleType;
    private static ARR_INDEX_MATERIALS  = FilterType.Materials;


    // @Input('rulesList')
    // private _aoRulesList: Rule[];
    // @Input('userCanEdit')
    // private _bIsEditButtonEnabled : boolean;

    @Input('sortConditions')
    private _aoSortConditions : SortCondition[];
    @Input('savedFilters')
    private _aoSavedFilters : RulesReportFiltersContainer;
    @Output('onFiltersChanged')
    private _oEventEmitterFiltersChanged= new EventEmitter<RulesReportFiltersContainer>()
    //@Output('onSortChanged')
    //private _oEventEmitterSortChanged= new EventEmitter<...>()
    @Output('onPanelAction')
    private _oEventEmitterPanelAction= new EventEmitter<FiltersPanelAction>()


    private _oAvailableFilters : RulesReportFiltersContainer;
    private _oSelectedFilters : RulesReportFiltersContainer;
    private _aiSelectedFiltersCount : number[];
    private _abEnabledFilters : boolean[];
    private _abInWaitingFilters : boolean[];
    private _oInitFiltersPromise : Promise<boolean>

    constructor(private _oLookupService : LookupServiceMock)
    {
        this._oInitFiltersPromise = this.initFilters();
        this._oInitFiltersPromise.then(()=>{
                this._oEventEmitterFiltersChanged.emit(this._oSelectedFilters);
            })
    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit()
    {
        console.log('FiltersPanelComponent -> ngOnInit');

        // When all operation has been performed, send event to sync filters
        this._oEventEmitterFiltersChanged.emit(this._oSelectedFilters);

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        // For each 'changes' element (identified by the property name) there are those fields:
        //  - currentValue
        //  - firstChange
        //  - previousValue
        if( Utils.hasKey(changes, '_aoSortConditions') == true)
        {

        }
        if( Utils.hasKey(changes, '_aoSavedFilters') == true)
        {
            let aoChangedSavedFilters = changes['_aoSavedFilters'];
            if( aoChangedSavedFilters.isFirstChange() == false )
            {
                this.restoreSavedFilters();
            }
        }
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

        else if(Utils.isNullOrUndef(this._oSelectedFilters.filtersWorkCells) == false && this._oSelectedFilters.filtersWorkCells.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = this._oSelectedFilters.filtersWorkCells.length;
            bAnyChange = true;

            // then refresh the 'Materials Definition' available filters according with
            // the selected 'Work Cells'
            this.refreshMaterialsDefinitionsFilter();
        }

        else if(Utils.isNullOrUndef(this._oSelectedFilters.filtersWorkUnits) == false && this._oSelectedFilters.filtersWorkUnits.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = this._oSelectedFilters.filtersWorkUnits.length;
            bAnyChange = true;

            // then refresh the 'Materials Definition' available filters according with
            // the selected 'Work Unit'
            this.refreshMaterialsDefinitionsFilter();
        }

        else if(Utils.isNullOrUndef(this._oSelectedFilters.filtersRuleTypes) == false && this._oSelectedFilters.filtersRuleTypes.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE])
        {
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = this._oSelectedFilters.filtersRuleTypes.length;
            bAnyChange = true;
        }

        else if(Utils.isNullOrUndef(this._oSelectedFilters.filtersMaterialDefinitions) == false && this._oSelectedFilters.filtersMaterialDefinitions.length != this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_MATERIALS])
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
        let oPromise = new Promise<boolean>((resolve, reject)=> {
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

            // First step, load all available filters indipendent from other filters selections
            let aoWaitForTheseFiltersToBeLoaded = [];
            let sWorkArea = "";
            aoWaitForTheseFiltersToBeLoaded.push(this.refreshProductionLineFilter(sWorkArea));
            aoWaitForTheseFiltersToBeLoaded.push(this.refreshRuleTypesFilter());

            // Set the number of seleced item according with the selections retrieved
            // from server configuration
            this._aiSelectedFiltersCount = [];
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_PROD_LINE] = this._oSelectedFilters.filtersProductionLines.length;
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_CELL] = this._oSelectedFilters.filtersWorkCells.length;
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_WORK_UNIT] = this._oSelectedFilters.filtersWorkUnits.length;
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_RULE_TYPE] = this._oSelectedFilters.filtersRuleTypes.length;
            this._aiSelectedFiltersCount[FiltersPanelComponent.ARR_INDEX_MATERIALS] = this._oSelectedFilters.filtersMaterialDefinitions.length;

            Promise.all(aoWaitForTheseFiltersToBeLoaded).then(()=>{
                resolve();
            })

        });

        return oPromise;

    }

    private restoreSavedFilters()
    {
        this._oInitFiltersPromise.then(()=>{
            // To restore filters, wait filters initialization
            // has been completed
            this.restoreProductionLine()
            this.refreshWorkCellsFilter()
                .then(()=>{
                    this.restoreWorkCells();
                    this.refreshMaterialsDefinitionsFilter()
                        .then(()=>{
                            this.restoreMaterialDefinitions();
                        })
                })

            this.restoreRuleTypes();
        })
    }


    private restoreSpecificFilter(sId : string)
    {
        let aoSavedFiltersSubset : Filter[] = this._aoSavedFilters[sId];
        let aoAvailableFiltersSubset  : Filter[] = this._oAvailableFilters[sId];

        let aoTemp = [];
        for(let i = 0; i < aoSavedFiltersSubset.length; i++)
        {
            for(let j = 0; j < aoAvailableFiltersSubset.length; j++)
            {
                if( aoSavedFiltersSubset[i].value == aoAvailableFiltersSubset[j].value)
                {
                    aoTemp.push(aoAvailableFiltersSubset[j]);
                    break;
                }
            }
        }
        this._oSelectedFilters[sId] = aoTemp;
    }

    private restoreProductionLine() { this.restoreSpecificFilter('filtersProductionLines'); }
    private restoreWorkCells() { this.restoreSpecificFilter('filtersWorkCells'); }
    private restoreWorkUnits() { this.restoreSpecificFilter('filtersWorkUnits'); }
    private restoreRuleTypes() { this.restoreSpecificFilter('filtersRuleTypes'); }
    private restoreMaterialDefinitions() { this.restoreSpecificFilter('filtersMaterialDefinitions'); }


    private refreshProductionLineFilter(sWorkArea : string)
    {
        let oPromise = new Promise<boolean>((resolve, reject)=> {
            this.setProductionLineFilterInWaiting(true);
            this._oLookupService.getProductionLines(sWorkArea).subscribe(
                (oData: IProductionLine[]) => {
                    this._oAvailableFilters.filtersProductionLines = ProductionLineFilter.createFiltersListFromObjectList(oData, ProductionLineFilter);
                },
                (oReason: any) => {
                    this.handleErrorOnDataFetchForFilter(FilterType.ProductionLine);
                    reject();
                },
                () => {
                    this.setProductionLineFilterInWaiting(false);
                    this.setProductionLineFilterEnabled();

                    resolve(true);
                }
            )
        })
        return oPromise;
    }

    private refreshWorkCellsFilter()
    {
        let oPromise = new Promise<boolean>((resolve, reject)=>{
            this.setWorkCellFilterInWaiting(true);
            this._oLookupService.getWorkCells(this._oSelectedFilters.filtersProductionLines).subscribe(
                (oData:IProductionLine[])=>{
                    this._oAvailableFilters.filtersWorkCells = WorkCellFilter.createFiltersListFromObjectList(oData, WorkCellFilter);
                },
                (oReason:any)=>{
                    this.handleErrorOnDataFetchForFilter(FilterType.WorkCell);
                    reject();
                },
                ()=>{
                    this.setWorkCellFilterInWaiting(false);
                    this.setWorkCellFilterEnabled();

                    resolve(true);
                }
            )
        })
        return oPromise;
    }

    private refreshRuleTypesFilter()
    {
        let oPromise = new Promise<boolean>((resolve, reject)=> {
            this.setRuleTypeFilterInWaiting(true);
            this._oLookupService.getRuleTypes().subscribe(
                (oData: string[]) => {
                    this._oAvailableFilters.filtersRuleTypes = RuleTypeFilter.createFiltersList(oData);
                },
                (oReason: any) => {
                    this.handleErrorOnDataFetchForFilter(FilterType.RuleType);
                    reject();
                },
                () => {
                    this.setRuleTypeFilterInWaiting(false);
                    this.setRuleTypeFilterEnabled();

                    resolve(true);
                }
            )
        })
        return oPromise;
    }

    private refreshMaterialsDefinitionsFilter()
    {
        let oPromise = new Promise<boolean>((resolve, reject)=> {
            this.setMaterialsFilterInWaiting(true);
            this._oLookupService.getMaterialDefinitions(
                this._oSelectedFilters.filtersWorkCells,
                this._oSelectedFilters.filtersWorkUnits
            ).subscribe(
                (oData: IMaterial[]) => {
                    this._oAvailableFilters.filtersMaterialDefinitions = MaterialDefinitionFilter.createFiltersListFromObjectList(oData, MaterialDefinitionFilter);
                },
                (oReason: any) => {
                    this.handleErrorOnDataFetchForFilter(FilterType.Materials);
                    reject();
                },
                () => {
                    this.setMaterialsFilterInWaiting(false);
                    this.setMaterialsFilterEnabled();

                    resolve(true);
                }
            )
        })
        return oPromise;
    }

    private handleErrorOnDataFetchForFilter(oFilterType:FilterType)
    {
        let sFilterName = "";
        if(oFilterType == FilterType.ProductionLine)
        {
            this.setProductionLineFilterDisabled();
            this.setProductionLineFilterInWaiting(false);
            sFilterName = "Production Line";
        }
        else if(oFilterType == FilterType.WorkCell)
        {
            this.setWorkCellFilterDisabled();
            this.setWorkCellFilterInWaiting(false);
            sFilterName = "Work Cell";
        }
        else if(oFilterType == FilterType.WorkUnit)
        {
            this.setWorkUnitFilterDisabled();
            this.setWorkUnitFilterInWaiting(false);
            sFilterName = "Work Unit";
        }
        else if(oFilterType == FilterType.RuleType)
        {
            this.setRuleTypeFilterDisabled();
            this.setRuleTypeFilterInWaiting(false);
            sFilterName = "Rule Type";
        }
        else if(oFilterType == FilterType.Materials)
        {
            this.setMaterialsFilterDisabled();
            this.setMaterialsFilterInWaiting(false);
            sFilterName = "Materials Definitions";
        }

        VexUtils.showErrorAlert("An error occurred loading data for " + sFilterName + " filter.")
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
        this._oEventEmitterPanelAction.emit(FiltersPanelAction.CLEAR_ALL_FILTERS);
    }

    public clearAllOrderBy()
    {

    }

    public save(){ this._oEventEmitterPanelAction.emit(FiltersPanelAction.SAVE); }
    public load(){ this._oEventEmitterPanelAction.emit(FiltersPanelAction.LOAD); }
    ///</editor-fold>


}