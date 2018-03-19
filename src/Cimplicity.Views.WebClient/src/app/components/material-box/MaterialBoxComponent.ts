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
export class FiltersPanelComponent implements OnInit
{



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




    constructor(private _oLookupService : LookupServiceMock)
    {

    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit()
    {
        console.log('FiltersPanelComponent -> ngOnInit');

    }

    ///</editor-fold>



    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>

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

    ///</editor-fold>


}