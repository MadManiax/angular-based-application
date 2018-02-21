///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../classes/models/RulesReportTableColumn.ts"/>

import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import EventRule = ge.cim.models.EventRule;
import * as moment from 'moment/moment'
import CounterRule = ge.cim.models.CounterRule;
import TimingRule = ge.cim.models.TimingRule;
import RulesReportTableColumn = ge.cim.models.RulesReportTableColumn;
import VexUtils = jsutils.VexUtils;


enum DialogMode {EDIT_RULE, TRIGER_NEXT};

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
    private _oDialogMode: DialogMode;
    private _aoColumns : RulesReportTableColumn[];


    constructor()
    {
        console.log('RulesReportTableComponent -> constructor');
        this._oRuleToEdit = null;

        /**
         * >>> From FdS <<<
         * All columns with the underlined header text are sortable: "Work Cell", "Remaining Overflow", "Rule Type" and "Rule Name".
         * Work unit is not sortable directly, but it is included in the Work Cell criteria.
         * "Remaining" will be sortable only if the rules in the report are either only timing rules or only counter rules.
         */
        this._aoColumns = [
            new RulesReportTableColumn("Work Cell").allowSorting(),
            new RulesReportTableColumn("Work Unit"),
            new RulesReportTableColumn("Actual").setCssClasses("col-actual"),
            new RulesReportTableColumn("Remaining"),
            new RulesReportTableColumn("Set"),
            new RulesReportTableColumn("Overflow Remaining").allowSorting().setCssClasses("col-overflow"),
            new RulesReportTableColumn("Overflow Set").setCssClasses("col-overflow-set"),
            new RulesReportTableColumn("Rule Type").allowSorting(),
            new RulesReportTableColumn("Rule Name").allowSorting().setCssClasses("col-rule-name")
        ]
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




    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>
    private openEditRuleOrTriggerNextModal(oRule:Rule, oMode:DialogMode)
    {
        this._oDialogMode = oMode;

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
    public getColumnsList(){ return this._aoColumns;}
    public getRulesList() { return this._aoRulesList; }
    public showEmptyDataBox(): boolean{
        return (Utils.isNullOrUndef(this._aoRulesList) == true || this._aoRulesList.length == 0)
    } ;


    /**
     * Get the CSS class for the 'Actual' acording to FdS:
     *      Actual cell will be GREEN when it reaches the target value for that rule (the value displayed in the cell Set).
     *      As soon as, the rule is again triggered and the actual value changes, the previous background color will be restored
 *     So, in short way, when the 'Remaining' is zero (this simplify check for bot Counter and Timing)
     * @param {ge.cim.models.Rule} oRule
     */
    public getActualCellCssClass(oRule : Rule)
    {
        if(oRule.isActualEqualsSet() == true)
        {
            return "cell-actual-equals-to-set";
        }
        return "";
    }

    /**
     * Get the CSS class for the 'Overflow Remaining' acording to FdS:
     *      Remaining Overflow cell is RED when the Remaining overflow is 0 and it remains red until the sampling result is received.
     *	    The machine is blocked if the overflow is 0 and the cell is RED.
     *	    As soon as the sampling result is received, the previous background color will be restored and the Remaining overflow cell will be cleaned
     * @param {ge.cim.models.Rule} oRule
     */
    public getOverflowRemainingCellCssClass(oRule : Rule)
    {
        if(oRule.hasOverflowReachedLimit() == true){
            return "cell-no-more-overflow-available";
        }
        return "";
    }

    /**
     * Get the CSS class for the 'Rule Name' acording to FdS:
     *      Rule Name cell will be YELLOW when the target value for that rule is reached and it will remain yellow
     *		until the sampling result is received and the overflow is reset again to the configured value
     * @param {ge.cim.models.Rule} oRule
     */
    public getRuleNameCellCssClass(oRule : Rule)
    {
        if(oRule.isInWarning()){
            return "cell-warning";
        }
        return "";
    }

    /**
     * Callback to handle click on the column header
     * @param {ge.cim.models.RulesReportTableColumn} oColumn
     */
    public onColumnHeaderClick(oColumn : RulesReportTableColumn)
    {
        // Add the column to the sorting panel only if it
        // is a sortable column
        if(oColumn.isSortingAllowed() == true)
        {
            VexUtils.showGeneralAlert("TODO: column '"+ oColumn.caption +"' will be added to 'sorting panel'");
        }
    }

    /**
     * @returns {boolean} TRUE if the actual value set in for the rule in the 'Edit dialog' is valid, FALSE otherwise
     */
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
        this.openEditRuleOrTriggerNextModal(oRule, DialogMode.EDIT_RULE);
    }

    public openTriggerNextModal(oRule : Rule)
    {
        this.openEditRuleOrTriggerNextModal(oRule, DialogMode.TRIGER_NEXT);
    }

    public isDialogModeEditRule(){ return this._oDialogMode == DialogMode.EDIT_RULE; }
    public isDialogModeTriggerNext(){ return this._oDialogMode == DialogMode.TRIGER_NEXT; }


    public onSaveRule() { this._oEventEmitterSaveRule.emit(this._oRuleToEdit); }
    public onTriggerNext(){ this._oEventEmitterTriggerNext.emit(this._oRuleToEdit);}
    //public abstract setDefault();


}