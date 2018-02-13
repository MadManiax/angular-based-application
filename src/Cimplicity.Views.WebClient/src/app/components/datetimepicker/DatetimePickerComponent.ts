///<reference path="../../../classes/utils/Utils.ts"/>

import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import EventRule = ge.cim.models.EventRule;


@Component({
    selector: 'datetime-picker',
    templateUrl: 'app/components/datetimepicker/DatetimePickerTemplate.html'
})
export class DatetimePickerComponent implements OnInit, OnChanges
{


    // @Input('rulesList')
    // private _aoRulesList: Rule[];
    // @Input('userCanEdit')
    // private _bIsEditButtonEnabled : boolean;
    // @Output('onEditClick')
    // private _oEventEmitterEditClick= new EventEmitter<Rule>()
    // @Output('onSaveEditedRule')
    // private _oEventEmitterSaveRule= new EventEmitter<Rule>()
    // @Output('onTriggerNext')
    // private _oEventEmitterTriggerNext= new EventEmitter<Rule>()




    constructor(private _oElem: ElementRef)
    {
        console.log('DatetimePickerComponent -> constructor');
    }


    private buildDatepicker()
    {
        // debugger;
        // let oElemJquery = jQuery(this._oElem.nativeElement);
        // let oInternalElem = oElemJquery.children("div");
        // oElemJquery.datetimepicker();
        $('#datetimepicker1').datetimepicker();
    }


    ngOnInit()
    {
        console.log('DatetimePickerComponent -> ngOnInit');
        this.buildDatepicker();
    }

    ngOnChanges(changes: SimpleChanges): void
    {

    }




}