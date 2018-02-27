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


@Component({
    selector: 'rules-report-filters-panel',
    templateUrl: 'app/components/filters_panel/FiltersPanelTemplate.html'
})
export class FiltersPanelComponent implements OnInit, OnChanges, DoCheck
{


    // @Input('rulesList')
    // private _aoRulesList: Rule[];
    // @Input('userCanEdit')
    // private _bIsEditButtonEnabled : boolean;

    @Output('onFiltersChanged')
    private _oEventEmitterFiltersChanged= new EventEmitter<RulesReportFiltersContainer>()
    //@Output('onSortChanged')
    //private _oEventEmitterSortChanged= new EventEmitter<...>()


    private _oAvailableFilters : RulesReportFiltersContainer;
    private _oSelectedFilters : RulesReportFiltersContainer;

    private _aiSelectedFiltersCount : number[];

    constructor()
    {
        this._oAvailableFilters = new RulesReportFiltersContainer();
        this._oAvailableFilters.filtersProductionLines = [new Filter("WR9000001"), new Filter("WR900002")]; /* null means all */
        this._oAvailableFilters.filtersWorkCells = [new Filter("WL9000001"), new Filter("WL900002")];
        this._oAvailableFilters.filtersWorkUnits = [new Filter("WT9000001"), new Filter("WT900002")];
        this._oAvailableFilters.filtersRuleTypes = [new Filter("Counter"), new Filter("Timing"), new Filter("Event")];
        this._oAvailableFilters.filtersMaterialDefinitions = [new Filter("MaterialDefinitionId_1"), new Filter("MaterialDefinitionId_2")];

        for(let i = 0; i < 100; i++)
        {
            this._oAvailableFilters.filtersProductionLines.push(new Filter("WR9000001_" + i));
        }

        this._oSelectedFilters = new RulesReportFiltersContainer();
        this._oSelectedFilters.filtersProductionLines = [new Filter("WR9000001")]; /* null means all */
        this._oSelectedFilters.filtersWorkCells = [new Filter("WL900002")];
        this._oSelectedFilters.filtersWorkUnits = [new Filter("WT9000001")];
        this._oSelectedFilters.filtersRuleTypes = [new Filter("Counter"), new Filter("Event")];
        this._oSelectedFilters.filtersMaterialDefinitions = [new Filter("MaterialDefinitionId_1")];

        this._aiSelectedFiltersCount = [
            0,
            0,
            0,
            0,
            0,
        ]
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
        if(this._oSelectedFilters.filtersProductionLines.length != this._aiSelectedFiltersCount[0])
        {
            this._aiSelectedFiltersCount[0] = this._oSelectedFilters.filtersProductionLines.length;
            bAnyChange = true;
        }

        if(this._oSelectedFilters.filtersWorkCells.length != this._aiSelectedFiltersCount[1])
        {
            this._aiSelectedFiltersCount[1] = this._oSelectedFilters.filtersWorkCells.length;
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
    public getFilterCaptionPropertyName(){ return "_sCaption"; }

    public clearAllFilters()
    {
        this._oSelectedFilters.clearAllFilters();
    }
    ///</editor-fold>


}