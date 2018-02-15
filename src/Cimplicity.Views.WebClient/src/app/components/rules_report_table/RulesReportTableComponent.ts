///<reference path="../../../classes/utils/Utils.ts"/>

import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import EventRule = ge.cim.models.EventRule;
import * as moment from 'moment/moment'
import CounterRule = ge.cim.models.CounterRule;
import TimingRule = ge.cim.models.TimingRule;


@Component({
    selector: 'rules-table',
    templateUrl: 'app/components/rules_report_table/RulesReportTableTemplate.html'
})
export class RulesReportTableComponent implements OnInit, OnChanges
{

    @Input('rulesList')
    private _aoRulesList: Rule[];
    @Input('userCanEdit')
    private _bIsEditButtonEnabled : boolean;
    @Output('onEditClick')
    private _oEventEmitterEditClick= new EventEmitter<Rule>()
    @Output('onSaveEditedRule')
    private _oEventEmitterSaveRule= new EventEmitter<Rule>()
    @Output('onTriggerNext')
    private _oEventEmitterTriggerNext= new EventEmitter<Rule>()


    private _oRuleToEditOriginal : Rule;
    private _oRuleToEdit : Rule;
    private _sActualAsStringForTimingRule : string;
    //private _sActualForTimingRuleDateTimeFormat : string;
    private _oModal : JQuery;


    constructor()
    {
        console.log('RulesReportTableComponent -> constructor');
        this._oRuleToEdit = null;
    }

    ngOnInit()
    {
        console.log('RulesReportTableComponent -> ngOnInit');
        this._oRuleToEdit = null;
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        //debugger;
    }



    public getRulesList() { return this._aoRulesList; }
    public showEmptyDataBox(): boolean{
        return (Utils.isNullOrUndef(this._aoRulesList) == true || this._aoRulesList.length == 0)
    } ;

    public isActualValueValid()
    {
        if(this.isCounterRule() == true)
        {
            return (this._oRuleToEdit.Actual > this._oRuleToEditOriginal.Actual && this._oRuleToEdit.Actual < this._oRuleToEditOriginal.Set)
        }
        if(this.isTimingRule() == true)
        {
            let oDateTime = moment(this._sActualAsStringForTimingRule, TimingRule.DATETIME_FORMAT);
            return oDateTime.isBefore( (<TimingRule>this._oRuleToEditOriginal).getActualAsDateTime());
        }
    }

    public isCounterRule(){ return (this._oRuleToEdit instanceof CounterRule); }
    public isTimingRule(){ return (this._oRuleToEdit instanceof TimingRule); }



    public isEditButtonEnabled(oRule:Rule)
    {
        if(oRule instanceof EventRule){
            return false;
        }
        return this._bIsEditButtonEnabled;
    }
    // public onEditBtnClick(oRule:Rule)
    // {
    //     this._oEventEmitterEditClick.emit(oRule);
    // }

    public getRuleToEdit(){ return this._oRuleToEdit; }
    public openEditRuleModal(oRule : Rule)
    {
        //this._oRuleToEdit = oRule;
        this._oRuleToEditOriginal = oRule;
        this._oRuleToEdit = Object.assign<Rule, Rule>(Object.create(oRule), oRule);
        this._sActualAsStringForTimingRule = this._oRuleToEdit.getActualToString();

        if( Utils.isNullOrUndef(this._oModal) == true)
        {
            this._oModal = $("#editRuleModal");
        }
        this._oModal.modal('show');
    }


    public onSaveRule() { this._oEventEmitterSaveRule.emit(this._oRuleToEdit); }
    public onTriggerNext(){ this._oEventEmitterTriggerNext.emit(this._oRuleToEdit);}

}