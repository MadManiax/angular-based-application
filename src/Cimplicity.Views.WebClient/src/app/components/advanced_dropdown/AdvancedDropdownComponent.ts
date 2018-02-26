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
    @Input('optionCaptionProperty')
    _sOptionCaptionPropertyName : string;
    @Input('optionsList')
    _aoOptionList : any[];
    @Input('selectedOptionsList')
    _aoSelectedOptionList : any[]
    @Output('onOptionClick')
    _fnOnOptionClick = new EventEmitter<any>();
    @Output('onClose')
    _fnOnClose = new EventEmitter<any>();

    private _oDropDownMenu: JQuery;
    public _sSearchValue : string;


    constructor(private _oElem: ElementRef)
    {
        console.log('AdvancedDropdownComponent -> constructor');

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
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        //debugger;
    }

    ngAfterViewInit()
    {
        this._oDropDownMenu = $(this._oElem.nativeElement.firstElementChild).children(".dropdown-menu");

        this._oDropDownMenu.find("li").on( 'click', ( event )=>{
            return false;
        })
    }




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
    public getOptions(){ return this._aoOptionList; }

    public onOptionClick(oOption)
    {
        let iIndexOf = Utils.arrayIndexOf(this._aoSelectedOptionList, oOption)
        if(  iIndexOf >= 0)
        {
            Utils.removeFromArray(this._aoSelectedOptionList, iIndexOf);
        }
        else{
            this._aoSelectedOptionList.push(oOption);
        }
    }

    public isOptionSeleced(oOption)
    {
        return Utils.arrayContains(this._aoSelectedOptionList, oOption);
    }

    ///</editor-fold>


}