///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../classes/models/RulesReportTableColumn.ts"/>
///<reference path="../../../classes/utils/VexUtils.ts"/>
///<reference path="../../../interfaces/IEventEmitterDataWithCallbacks.ts"/>

import {
    AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output,
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
import IEventEmitterDataWithCallbacks = ge.cim.IEventEmitterDataWithCallbacks;


enum DialogMode {EDIT_RULE, TRIGER_NEXT};

@Component({
    selector: 'rules-table',
    templateUrl: 'app/components/rules_report_table/RulesReportTableTemplate.html'
})
export class RulesReportTableComponent implements OnInit, OnChanges, AfterViewInit
{

    @Input('rulesList')
    private _aoRulesList: Rule[];
    @Input('userCanEdit')
    private _bIsEditButtonEnabled : boolean;
    @Output('onEditClick')
    private _oEventEmitterEditClick= new EventEmitter<Rule>()
    @Output('onSaveEditedRule')
    private _oEventEmitterSaveRule= new EventEmitter<IEventEmitterDataWithCallbacks<Rule>>()
    @Output('onTriggerNext')
    private _oEventEmitterTriggerNext= new EventEmitter<Rule>()
    @Output('onColumnHeaderClick')
    private _oEventEmitterColHeaderClick = new EventEmitter<RulesReportTableColumn>()


    private _oRuleToEditOriginal : Rule;
    private _oRuleToEdit : Rule;
    private _sActualAsStringForTimingRule : string;
    //private _sActualForTimingRuleDateTimeFormat : string;
    private _oModal : JQuery;
    private _oDialogMode: DialogMode;
    private _aoColumns : RulesReportTableColumn[];
    private _sDialogExtraMessageError: string;
    private _bIsEditedDataValid: boolean;
    private _sDialogExtraMessage: string;


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
            new RulesReportTableColumn("wl", "WL").setCssClasses("col-work-cell").allowSorting(),
            new RulesReportTableColumn("wt", "WT").setCssClasses("col-work-unit"),
            new RulesReportTableColumn("actual", "Actual").setCssClasses("col-actual"),
            new RulesReportTableColumn("remaining", "Remain.").setCssClasses("col-remaining"),
            new RulesReportTableColumn("set", "Set").setCssClasses("col-set"),
            new RulesReportTableColumn("overflow-remaining", "Ov. Remain").allowSorting().setCssClasses("col-overflow"),
            new RulesReportTableColumn("overflow-set", "Ov. Set").setCssClasses("col-overflow-set"),
            new RulesReportTableColumn("type", "Type").allowSorting().setCssClasses("col-rule-type"),
            new RulesReportTableColumn("name", "Name").allowSorting().setCssClasses("col-rule-name")
        ]
    }



    ngOnInit()
    {
        console.log('RulesReportTableComponent -> ngOnInit');
        this._oRuleToEdit = null;
    }

    ngAfterViewInit()
    {
        // $('#rules-report-table').fixedHeaderTable({
        //     footer: false,
        //     cloneHeadToFoot: false,
        //     fixedColumn: false
        // });

        // Prevent 'edit rule' dialog from closing if something goes wrong
        // $('#editRuleModal').on('hide.bs.modal', function(e){
        //     debugger;
        //     if( this._bIsEditedDataValid == false )
        //     {
        //         e.preventDefault();
        //         e.stopImmediatePropagation();
        //         return false;
        //     }
        // });
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

    /**
     * Get a column object with its properties, on the base of the column ID
     * @param {string} sColId
     * @returns {any} The column object with the specified ID or NULL if not found
     */
    private getColumn(sColId:string)
    {
        for (let i = 0; i < this._aoColumns.length; i++)
        {
            if (sColId == this._aoColumns[i].id) {
                return this._aoColumns[i];
            }
        }
        return null;
    }

    /**
     * Get the CSS classes for the given column
     * @param {string} sColId
     * @returns {any} The CSS classes for the column with the ID specified in the param, or empty string if column not found
     */
    private getColumnClasses(sColId:string)
    {
        let sColumn = this.getColumn(sColId);
        if( sColumn != null)
        {
            return sColumn.getCssClasses();
        }
        return "";
    }

    private setDialogErrorMessage(sMessage, iDurationMs:number = 2000)
    {
        // Set new message for the 'error message' field
        this._sDialogExtraMessageError = sMessage;
        // and clear any message in the 'generic message' field
        this._sDialogExtraMessage = null;
        if( iDurationMs > 0) {
            setTimeout(() => {
                this._sDialogExtraMessageError = null;
            }, iDurationMs);
        }
    }
    private setDialogGenericMessage(sMessage, iDurationMs:number = 2000)
    {
        // Set new message for the 'generic message' field
        this._sDialogExtraMessage = sMessage;
        // and clear any message in the 'error message' field
        this._sDialogExtraMessageError = null;
        if( iDurationMs > 0) {
            setTimeout(() => {
                this._sDialogExtraMessage = null;
            }, iDurationMs);
        }
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
    get actualDateAsString(){ return this._sActualAsStringForTimingRule; }
    set actualDateAsString(sValue:string)
    {
        this._sActualAsStringForTimingRule = sValue;
    }

    get ruleToEdit(){ return this._oRuleToEdit;}
    set ruleToEdit(oValue:Rule){ this._oRuleToEdit = oValue;}

    public getColumnsList(){ return this._aoColumns;}
    public getRulesList() { return this._aoRulesList; }
    public showEmptyDataBox(): boolean{
        return (Utils.isNullOrUndef(this._aoRulesList) == true || this._aoRulesList.length == 0)
    } ;


    public  getColClassesWorkCell(){ return this.getColumnClasses("wl");}
    public  getColClassesWorkUnit(){ return this.getColumnClasses("wt");}
    public  getColClassesActual(){ return this.getColumnClasses("actual");}
    public  getColClassesRemaining(){ return this.getColumnClasses("remaining");}
    public  getColClassesSet(){ return this.getColumnClasses("set");}
    public  getColClassesOverflowRemaining(){ return this.getColumnClasses("overflow-remaining");}
    public  getColClassesOverflowSet(){ return this.getColumnClasses("overflow-set");}
    public  getColClassesRuleType(){ return this.getColumnClasses("type");}
    public  getColClassesRuleName(){ return this.getColumnClasses("name");}

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
            //VexUtils.showGeneralAlert("TODO: column '"+ oColumn.caption +"' will be added to 'sorting panel'");
            this._oEventEmitterColHeaderClick.emit(oColumn);
        }
    }

    /**
     * @returns {boolean} TRUE if the actual value set in for the rule in the 'Edit dialog' is valid, FALSE otherwise
     */
    public isActualValueValid()
    {
        let bIsValid = true;
        if(this.isCounterRule() == true)
        {
            if(this._oRuleToEdit.Actual <= this._oRuleToEditOriginal.Actual){
                bIsValid = false;
                this.setDialogErrorMessage("New actual must be greater than current one (" + this._oRuleToEditOriginal.Actual + ").", 2800);
            }
            else if(this._oRuleToEdit.Actual >= this._oRuleToEditOriginal.Set){
                bIsValid = false;
                this.setDialogErrorMessage("New actual must be smaller than Set.", 2800);
            }
        }
        else if(this.isTimingRule() == true)
        {
            let oNow = moment();

            let oDateTime = moment(this._sActualAsStringForTimingRule, TimingRule.DATETIME_FORMAT);
            if(oDateTime.isValid() == false)
            {
                bIsValid = false;
                this.setDialogErrorMessage("Date/time is invalid. Please check value.", 2800);
            }
            else if( oDateTime.isBefore(oNow) == false)
            {
                bIsValid = false;
                this.setDialogErrorMessage("Date/time must be strictly before now.", 2800);
            }

            if(bIsValid == true){
                (<TimingRule>this._oRuleToEdit).ActualDateTime = oDateTime;
            }
        }

        return bIsValid;
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

    public dismissDialog()
    {
        this._oModal.modal('hide');
    }

    public onSaveRule()
    {
        this._bIsEditedDataValid = this.isActualValueValid();
        if( this._bIsEditedDataValid == true)
        {
            this.setDialogGenericMessage("Saving, please wait...", -1);
            let oThis = this;
            this._oEventEmitterSaveRule.emit({
                onSuccess   : ()=>{ oThis.dismissDialog(); },
                onError     : (sMessage)=>{
                    // Overwrite the message with a default one
                    sMessage = "An error occurred saving the rule. Any change has been discarded.";
                    oThis.setDialogErrorMessage(sMessage, 3400);
                    // Restore old data
                    this._oRuleToEdit = Object.assign<Rule, Rule>(Object.create(this._oRuleToEditOriginal), this._oRuleToEditOriginal);
                },
                data        : this._oRuleToEdit
            });
        }
    }

    public getEditRuleDialogErrorMessage(){ return (Utils.isStrNullOrEmpty(this._sDialogExtraMessageError) == false) ? this._sDialogExtraMessageError : ""; }
    public getEditRuleDialogMessage(){ return (Utils.isStrNullOrEmpty(this._sDialogExtraMessage) == false) ? this._sDialogExtraMessage : ""; }

    public onTriggerNext()
    {
        this._oEventEmitterTriggerNext.emit(this._oRuleToEdit);
    }
    //public abstract setDefault();


}