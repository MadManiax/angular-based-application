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
import {DragulaService} from "ng2-dragula";


@Component({
    selector: 'sorting-panel',
    templateUrl: 'app/components/sorting_panel/SortingPanelTemplate.html'
})
export class SortingPanelComponent implements OnInit, OnChanges, DoCheck
{
    @Input('sortConditions')
    private _aoSortConditions : SortCondition[];

    private _oTempElem;
    private _oTempContainer;

    constructor(private _oDragulaService : DragulaService)
    {
        this.attachDragulaListeners();
    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit()
    {
        console.log('SortingPanelComponent -> ngOnInit');

        Utils.setObjectPropertyIfNotSet(this, "_aoSortConditions", [])
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
    private attachDragulaListeners()
    {
        // this._oDragulaService.drag.subscribe((value) => {
        //     console.log(`drag: ${value[0]}`);
        //     this.onDrag(value.slice(1));
        // });
        this._oDragulaService.drop.subscribe((value) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });
        // this._oDragulaService.over.subscribe((value) => {
        //     //console.log(`over: ${value[0]}`);
        //     this.onOver(value.slice(1));
        // });
        // this._oDragulaService.out.subscribe((value) => {
        //     console.log(`out: ${value[0]}`);
        //     this.onOut(value.slice(1));
        // });
    }


    private onDrag(args)
    {
        // Event description:
        // "oElem was lifted from oSource"
        let [oElem, oSource] = args;
        let oSourceJquery = $(oSource);
        let iWidth = oSourceJquery.width();
        // oSourceJquery.css({
        //     width : iWidth,
        //     overflow : "hidden"
        // });
    }

    private onDrop(args)
    {
        // Description of event:
        // "oElem was dropped into oTarget before a oSibling element, and originally came from oSource"
        let [oElem, oTarget, oSource, oSibling] = args;

        // var swappee = $(oTarget).find('.sort-condition').not(oElem);
        // swappee.appendTo(oSource);
        // this.clearInlineStyle(oTarget);
        // this.clearInlineStyle(oSource);
        // this.clearSwappedItemsReferences();

        console.debug(this._aoSortConditions);

    }




    private onOver(args)
    {
        // Description of event:
        // "oElem is over oContainer, and originally came from oSource"
        let [oElem, oContainer, oSource] = args;

        console.debug("Over: ", oContainer);

        if (oContainer != oSource && oContainer != this._oTempContainer)
        {
            // When s 'condition' is dragged over a candidate cointainer
            // perform a swapping of two conditions
            // Before swap, perform a restore of previously swapped items (this case
            // happens when user drag the 'condition' over a container then change idea and
            // move it to another without dropping the condition)
            this.restorePreviouslySwappedItems();
            this.swapDraggedConditionAndConditionInTargetContainerTemp(oContainer, oSource, oElem);
        }
        else {
            this.restorePreviouslySwappedItems();
        }
    }

    private onOut(args) {
        let [e, el, container] = args;
        // do something
    }


    private swapDraggedConditionAndConditionInTargetContainerTemp(oTarget, oSource, oElem)
    {
        let oTargetJquery = $(oTarget);
        let oConditionInTheCanditateContainer = oTargetJquery.find('.sort-condition').not(oElem);
        //oTargetJquery.width( $(oConditionInTheCanditateContainer).width() );
        oConditionInTheCanditateContainer.appendTo(oSource);

        // save references
        this._oTempContainer = oTarget;
        this._oTempElem = oConditionInTheCanditateContainer;
    }

    private restorePreviouslySwappedItems()
    {
        if( Utils.isNullOrUndef(this._oTempContainer) == false && Utils.isNullOrUndef(this._oTempElem) == false)
        {
            this._oTempElem.appendTo(this._oTempContainer);
            this.clearInlineStyle(this._oTempContainer);
            this.clearSwappedItemsReferences();
        }
    }

    private clearSwappedItemsReferences()
    {
        this._oTempContainer = null;
        this._oTempElem = null;
    }

    private clearInlineStyle(oElem)
    {
        $(oElem).attr('style', '');
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
    // get sortConditions(){ return this._aoSortConditions; }
    // set sortConditions(aoValue:SortCondition[]){ this._aoSortConditions = aoValue; }

    get sortConditionsList(){ return this._aoSortConditions; }
    set sortConditionsList(aoValue){ this._aoSortConditions = aoValue; }

    public isLastBag(iIndex:number)
    {
        return (iIndex == this._aoSortConditions.length - 1);
    }

    public getBagClasses(iIndex:number)
    {
        let sClasses = "dragula-bag-" + iIndex;
        if( this.isLastBag(iIndex) == true){
            sClasses += " " + "dragula-bag-last";
        }
        return sClasses;
    }

    public deleteCondition(oCondition : SortCondition)
    {
        Utils.removeItemFromArray(this._aoSortConditions, oCondition);
    }
    ///</editor-fold>


}