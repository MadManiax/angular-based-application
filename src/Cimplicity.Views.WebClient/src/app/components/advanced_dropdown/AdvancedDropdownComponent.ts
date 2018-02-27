///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../classes/models/RulesReportTableColumn.ts"/>
///<reference path="../../../classes/utils/VexUtils.ts"/>

import {
    AfterViewInit,
    Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output,
    SimpleChanges
} from '@angular/core';
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import EventRule = ge.cim.models.EventRule;
import * as moment from 'moment/moment'
import CounterRule = ge.cim.models.CounterRule;
import TimingRule = ge.cim.models.TimingRule;
import RulesReportTableColumn = ge.cim.models.RulesReportTableColumn;
import VexUtils = jsutils.VexUtils;


@Component({
    selector: 'advanced-dropdown',
    templateUrl: 'app/components/advanced_dropdown/AdvancedDropdownTemplate.html'
})
export class AdvancedDropdownComponent implements OnInit, OnChanges, AfterViewInit
{
    @Input('caption')
    _sCaption : string;
    @Input('useInlineCaption')
    _bUseInlineCaption : boolean;
    @Input('optionCaptionProperty')
    _sOptionCaptionPropertyName : string;
    @Input('optionCompareProperty')
    _sOptionComparePropertyName : string;
    @Input('optionsList')
    _aoOptionList : any[];
    @Input('selectedOptionsList')
    _aoSelectedOptionList : any[];
    @Input('isWaiting')
    _bIsWaiting : boolean;
    @Input('isDisabled')
    _bIsDisabled : boolean;
    @Output('onOptionClick')
    _fnOnOptionClick = new EventEmitter<any>();
    @Output('onClose')
    _fnOnClose = new EventEmitter<any>();

    private _oDropDownMenu: JQuery;
    public _sSearchValue : string;


    constructor(private _oElem: ElementRef)
    {
        console.log('AdvancedDropdownComponent -> constructor');

        this._sSearchValue = "";
    }

    ngOnInit()
    {
        console.log('AdvancedDropdownComponent -> ngOnInit');
        if(Utils.isNullOrUndef(this._aoOptionList) == true)
        {
            this._sOptionCaptionPropertyName = "caption";
            this._aoOptionList = [];
            for(let i = 0; i < 10; i++)
            {
                this._aoOptionList.push({
                    caption : "Option " + i +" caption",
                    value : "option" + i.toString()
                })
            }

        }

        Utils.setObjectPropertyIfNotSet(this, "_aoSelectedOptionList", []);
        Utils.setObjectPropertyIfNotSet(this, "_sCaption", "");
        Utils.setObjectPropertyIfNotSet(this, "_bUseInlineCaption", false);
        // If no property set to compare two options, then use their 'caption property' by default
        Utils.setObjectPropertyIfNotSet(this, "_sOptionComparePropertyName", this._sOptionCaptionPropertyName);
        Utils.setObjectPropertyIfNotSet(this, "_bIsWaiting", false);
        Utils.setObjectPropertyIfNotSet(this, "_bIsDisabled", false);
    }

    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnChanges(changes: SimpleChanges): void
    {
        //debugger;
    }

    ngAfterViewInit()
    {
        this.initDropdownConfig();
    }
    ///</editor-fold>



    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>
    private initDropdownConfig()
    {
        this._oDropDownMenu = $(this._oElem.nativeElement.firstElementChild).find(".dropdown-menu");

        // Attach a listener to each option item 'click' event then
        // return 'false' to prevent event propagation
        this._oDropDownMenu.find(".prevent-close-dropdown").on( 'click', ( event )=>{
            return false;
        })
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
    public getOptions(){ return this._aoOptionList; }
    public getOptionCaptionPropertyName(){ return this._sOptionCaptionPropertyName;}
    public getOptionCaptionValue(oOption:any)
    {
        return Utils.getObjectProperty(oOption, this.getOptionCaptionPropertyName(), "-empty caption-");
    }

    public isWaiting(){ return this._bIsWaiting;}
    public isDisabled(){ return this._bIsDisabled;}

    public getCaption()
    {
        return this._sCaption;
    }

    public useInlineCaption(){ return this._bUseInlineCaption;}

    public getSummary()
    {
        let iSelectedItemsCount = this._aoSelectedOptionList.length;
        if(iSelectedItemsCount == 0){ return "-";}
        else if(iSelectedItemsCount == 1){ return this.getOptionCaptionValue(this._aoSelectedOptionList[0])}
        else { return this._aoSelectedOptionList.length + " selected"; }
    }

    public clearAllSelectedOptions()
    {
        Utils.clearArray(this._aoSelectedOptionList);
    }

    public selectAllOptions()
    {
        for(let i = 0; i < this._aoOptionList.length; i++)
        {
            if(this.isOptionSeleced(this._aoOptionList[i]) == false){
                this._aoSelectedOptionList.push(this._aoOptionList[i]);
            }
        }
    }

    public onOptionClick(oOption)
    {
        let iIndexOf = Utils.arrayIndexOf(this._aoSelectedOptionList, oOption, this._sOptionComparePropertyName)
        let bIsSelected = false;
        if(  iIndexOf >= 0)
        {
            // option was selected --> unselect it
            Utils.removeFromArray(this._aoSelectedOptionList, iIndexOf);
            bIsSelected = false;
        }
        else
        {
            // option was not selecte ---> select it
            this._aoSelectedOptionList.push(oOption);
            bIsSelected = true;
        }

        this._fnOnOptionClick.emit({
            option      : oOption,
            selected    : bIsSelected
        })
    }

    public isOptionSeleced(oOption)
    {
        return Utils.arrayContains(this._aoSelectedOptionList, oOption, this._sOptionComparePropertyName);
    }

    ///</editor-fold>


}