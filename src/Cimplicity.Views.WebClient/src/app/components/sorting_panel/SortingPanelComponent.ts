///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../classes/models/RulesReportTableColumn.ts"/>
///<reference path="../../../classes/utils/VexUtils.ts"/>

import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import EventRule = ge.cim.models.EventRule;
import * as moment from 'moment/moment'
import CounterRule = ge.cim.models.CounterRule;
import TimingRule = ge.cim.models.TimingRule;
import RulesReportTableColumn = ge.cim.models.RulesReportTableColumn;
import VexUtils = jsutils.VexUtils;
import Filter = ge.cim.models.Filter;
import RulesReportFiltersContainer = ge.cim.models.RulesReportFiltersContainer;
import SortCondition = ge.cim.models.SortCondition;
import WlWtSortCondition = ge.cim.models.WlWtSortCondition;


@Component({
    selector: 'sorting-panel',
    templateUrl: 'app/components/sorting_panel/SortingPanelTemplate.html'
})
export class SortingPanelComponent implements OnInit, OnChanges, DoCheck
{
    // @Input('rulesList')
    // private _aoRulesList: Rule[];
    // @Input('userCanEdit')
    // private _bIsEditButtonEnabled : boolean;


    private _aoSortConditions : SortCondition[];

    constructor()
    {
        // DEBUG (+)
        this._aoSortConditions = [
            new WlWtSortCondition(),
            new SortCondition("Remaining"),
            new SortCondition("Overflow Remaining"),
            new SortCondition("Rule Type"),
        ]
        // DEBUG (-)
    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit()
    {
        console.log('SortingPanelComponent -> ngOnInit');

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        //debugger;
    }

    ngDoCheck()
    {
        // let bAnyChange = false;
        // if(this._oSelectedFilters.filtersProductionLines.length != this._aiSelectedFiltersCount[0])
        // {
        //     this._aiSelectedFiltersCount[0] = this._oSelectedFilters.filtersProductionLines.length;
        //     bAnyChange = true;
        // }
        //
        // if(this._oSelectedFilters.filtersWorkCells.length != this._aiSelectedFiltersCount[1])
        // {
        //     this._aiSelectedFiltersCount[1] = this._oSelectedFilters.filtersWorkCells.length;
        //     bAnyChange = true;
        // }
        //
        // if(bAnyChange == true)
        // {
        //     this._oEventEmitterFiltersChanged.emit(this._oSelectedFilters);
        // }
    }
    ///</editor-fold>



    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>

    ///</editor-fold>

    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Protected methods (+)>
    ///</editor-fold>

    //*******************************************************************************
    //* Public methods
    //*******************************************************************************
    ///<editor-fold desc="Public methods (+)>
    public getSortConditions(){ return this._aoSortConditions; }

    public deleteCondition(oCondition : SortCondition)
    {
        Utils.removeItemFromArray(this._aoSortConditions, oCondition);
    }
    ///</editor-fold>


}