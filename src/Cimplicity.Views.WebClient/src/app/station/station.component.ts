///<reference path="../../../typings/index.d.ts"/>
///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/ReportOverviewSetting.ts"/>
///<reference path="../../classes/utils/Utils.ts"/>
///<reference path="../services/AuthService.ts"/>
///<reference path="../../classes/models/WlWtSortCondition.ts"/>
///<reference path="../../classes/models/SortCondition.ts"/>
///<reference path="../../classes/models/RulesReportTableColumn.ts"/>
///<reference path="../../interfaces/IRestRulesReport.ts"/>
///<reference path="../../interfaces/IEventEmitterDataWithCallbacks.ts"/>
///<reference path="../../classes/queryreport/ReportOverviewQuery.ts"/>
///<reference path="../../classes/queryreport/FluentRuleQuery.ts"/>
///<reference path="../services/mocks/ReportConfigurationServiceMock.ts"/>

import { Component, OnInit } from '@angular/core';
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import * as jQuery from "jquery";
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import {RulesReportService} from "../services/mocks/RulesReportService";
import {LoadingScreen, LoadingScreenComponent} from "../components/loading_screen/LoadingScreenComponent";
import {AuthService} from "../services/AuthService";
import IRestRulesReportRequest = ge.cim.IRestRulesReportRequest;
import VexUtils = jsutils.VexUtils;
import ReportOverviewSetting = ge.cim.models.ReportOverviewSetting;
import RulesReportFiltersContainer = ge.cim.models.RulesReportFiltersContainer;
import SortCondition = ge.cim.models.SortCondition;
import WlWtSortCondition = ge.cim.models.WlWtSortCondition;
import RulesReportTableColumn = ge.cim.models.RulesReportTableColumn;
import {PageEvent, MatSlideToggleChange} from "@angular/material";
import IRestRulesReportResponse = ge.cim.IRestRulesReportResponse;
import IEventEmitterDataWithCallbacks = ge.cim.IEventEmitterDataWithCallbacks;
import ReportOverviewQuery = ge.cim.queryreport.ReportOverviewQuery;
import FluentRuleQuery = ge.cim.queryreport.FluentRuleQuery;
import FieldOrder = ge.cim.queryreport.FieldOrder;
import {ReportConfigurationServiceMock} from "../services/mocks/ReportConfigurationServiceMock";
import {FiltersPanelAction} from "../components/filters_panel/FiltersPanelComponent";

@Component({
    selector: 'station',
    templateUrl: 'app/station/station.template.html'
})
export class StationComponent implements OnInit
{
    private _aoRulesList: ge.cim.models.Rule[];


    private _bIsDataLoading : boolean;
    private _iCurrentPageNumber: number;
    private _iTotalPagesCount: number;

    private _iTotalRowsCount : number;
    private _iAutoRefreshTimerIntervalId: number;
    private _oLatestRefresh : moment.Moment;
    private _bIsFiltersPanelVisible: boolean;

    private _iPageSize: number;
    private _aoSortConditions : SortCondition[];
    private _aiAvailablePageSizes : number[];
    private _oFilters : RulesReportFiltersContainer;
    private _iAutoRefreshIntervalInSeconds: number;

    private _oReportPageSettings : ReportOverviewSetting;


    /*
     * TIPS on Services:
     * The parameter '_oReportOverviewService' simultaneously defines a private '_oReportOverviewService' property
     * and identifies it as a RulesReportService injection site.
     * When Angular creates a the component, the Dependency Injection system
     * sets the service parameter to the singleton instance of the service class
     */
    constructor(
        private _oReportOverviewService: RulesReportService,
        private _oSamplingRuleExecutionService: RulesReportService,
        private _oReportSettingsService : ReportConfigurationServiceMock,
        private _oAuthService : AuthService
    )
    {
        console.log('StationComponent -> constructor');
        this._iAutoRefreshTimerIntervalId = null;
        this._iAutoRefreshIntervalInSeconds = 20;
        this._bIsFiltersPanelVisible = false;

        this.fetchConfigurationFromServer().then(()=>{
            this.resetPagination();
            LoadingScreen.hide();
        })
    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');
        //this.enableAutoRefresh(this._iAutoRefreshIntervalInSeconds);
        //this.doSearch();
    }


    /**
     * Fetch the full report overview configuration
     * from server (filters, sorting, pagination size, etc.)
     */
    private fetchConfigurationFromServer() : Promise<boolean>
    {
        LoadingScreen.show();
        let oPromise = new Promise<boolean>((resolve, reject)=> {
            let oSettings = null;

            this._oReportSettingsService.getConfig()
                .then((oData: ReportOverviewSetting) => {
                    oSettings = oData;
                    this._aoSortConditions = oSettings.sortConditions;
                    this._iPageSize = oSettings.pageSize;
                    this._aiAvailablePageSizes = oSettings.availablePageSizes;

                    resolve(true);
                })
                .catch((oReason) => {
                    oSettings = ReportOverviewSetting.createDefault();
                    this._aoSortConditions = oSettings.sortConditions;
                    this._iPageSize = oSettings.pageSize;
                    this._aiAvailablePageSizes = oSettings.availablePageSizes;

                    resolve(true);
                })
                // .finally(() => {
                //
                // })
        });

        return oPromise;
    }

    private resetPagination()
    {
        this._iCurrentPageNumber = 0;
    }


    /**
     * Execute a call to the data service to retrieve data from
     * server and handle the response
     */
    private doSearch()
    {
        this.closeFiltersPanel();

        this._bIsDataLoading = true;
        LoadingScreen.show();

        // let oParam : IRestRulesReportRequest = {
        //     CurrentPage : this._iCurrentPageNumber,
        //     RowsPerPage : this._iPageSize,
        //     Filters : []
        // };

        let sWorkArea = "";
        let oFluentQuery = FluentRuleQuery.onWorkArea(sWorkArea)
            // Set filters
            .withFiltersOnProductionLines(this._oFilters.filtersProductionLines)
            .withFiltersOnWorkCells(this._oFilters.filtersWorkCells)
            .withFiltersOnWorkUnits(this._oFilters.filtersWorkUnits)
            .withFiltersOnRuleTypes(this._oFilters.filtersRuleTypes)
            .withFiltersOnMaterialDefinitions(this._oFilters.filtersMaterialDefinitions)
            // Set order-by
            .addOrderByList(this.sortConditionsList)
            // Set pagination info
            .withPagingInfo(this._iCurrentPageNumber, this._iPageSize);


        let oTempResponse : IRestRulesReportResponse = null;
        this._oReportOverviewService.getRules(oFluentQuery.build())
            .subscribe(
                (oResponse) => {
                    oTempResponse = oResponse;
                    this._aoRulesList = oResponse.Rules;
                },
                (sMessage:string)=>{
                    this._bIsDataLoading = false;
                    LoadingScreen.hide();
                    VexUtils.showErrorAlert(sMessage);
                },
                ()=>{
                    this._iTotalPagesCount = oTempResponse.TotalPages;
                    this._iTotalRowsCount = oTempResponse.TotalRows
                    this._iCurrentPageNumber = oTempResponse.CurrentPage;
                    this._iPageSize = oTempResponse.RowsPerPage;

                    this._bIsDataLoading = false;
                    this._oLatestRefresh = moment();
                    LoadingScreen.hide();


                }
            );
    }

    private addSortConditionIfNotExist(oCondition:SortCondition)
    {
        if( Utils.arrayContains(this._aoSortConditions, oCondition, "_sCaption") == false)
        {
            this._aoSortConditions.push(oCondition);
            this.openFiltersPanel();
        }

    }

    //*******************************************************************************
    //* Protected methods
    //*******************************************************************************
    ///<editor-fold desc="Protected methods (+)>
    ///</editor-fold>

    //*******************************************************************************
    //* Public methods
    //*******************************************************************************
    ///<editor-fold desc="Public methods (+)>
    get sortConditionsList(){ return this._aoSortConditions; }
    set sortConditionsList(aoValue){ this._aoSortConditions = aoValue; }

    get autoRefreshEnabled(){ return this.isAutoRefreshEnabled(); }

    public onFilterPanelAction(oAction : FiltersPanelAction)
    {
        if( oAction == FiltersPanelAction.CLEAR_ALL_FILTERS)
        {

        }
        else if( oAction == FiltersPanelAction.SAVE)
        {
            LoadingScreen.show();
            this._oReportSettingsService.saveConfig(this._oReportPageSettings)
                .then((bSuccess : boolean)=>{
                    LoadingScreen.hide();
                })
                .catch(()=>{
                    LoadingScreen.hide();
                })
        }
        else if( oAction == FiltersPanelAction.LOAD)
        {
            this.fetchConfigurationFromServer().then(()=>{
                this.resetPagination();
                LoadingScreen.hide();
            })
        }
    }

    public onColumnHeaderClick(oColumn : RulesReportTableColumn)
    {
        // let sCaption = oColumn.caption;
        // if(sCaption == "WL"){
        //     sCaption = "WL/WT";
        // }
        // let sFieldName = oColumn.caption;
        //
        // this.addSortConditionIfNotExist(new SortCondition(sFieldName, sCaption));
        this.addSortConditionIfNotExist(oColumn.getSortCondition());
    }

    public reloadData()
    {
        this.resetPagination();
        this.doSearch();
    }


    public onFiltersChanged(oFilters : RulesReportFiltersContainer)
    {
        this._oFilters = oFilters;
    }


    /**
     * Open/Close filters panel
     */
    public toggleFiltersPanel(){ this._bIsFiltersPanelVisible = !this._bIsFiltersPanelVisible;}
    public closeFiltersPanel(){ this._bIsFiltersPanelVisible = false;}
    public openFiltersPanel(){ this._bIsFiltersPanelVisible = true;}
    /**
     * @returns {boolean} TRUE if the filters panel has been toggle to visible, FALSE otherwise
     */
    public isFiltersPanelVisible(){ return this._bIsFiltersPanelVisible; }


    public onOpenRuleEditor()
    {
        this.disableAutoRefresh();
    }


    /**
     * Callback executed when user click on 'Save' in the 'edit rule' dialog
     * @param {ge.cim.IEventEmitterDataWithCallbacks<ge.cim.models.Rule>} oObject
     */
    public saveEditedRule(oObject : IEventEmitterDataWithCallbacks<Rule>)
    {
        let oRule = oObject.data;
        let fnOnSuccess = oObject.onSuccess;
        let fnOnError = oObject.onError;

        // LoadingScreen.updateMessage("Saving changes...");
        //LoadingScreen.show();
        this._oSamplingRuleExecutionService.editRule(oRule)
            .subscribe(
                ()=>{},
                ()=>{
                    fnOnError(null);
                },
            ()=>{
                    fnOnSuccess();
                    this.doSearch();
                }
            )
    }

    /**
     * Callback executed when user click on 'Trigger Next' option for a rule
     * @param {ge.cim.models.Rule} oRule
     */
    public triggerNext(oObject : IEventEmitterDataWithCallbacks<Rule>)
    {
        let oRule = oObject.data;
        let fnOnSuccess = oObject.onSuccess;
        let fnOnError = oObject.onError;

        // LoadingScreen.updateMessage("Saving changes...");
        //LoadingScreen.show();
        this._oSamplingRuleExecutionService.triggerRule(oRule)
            .subscribe(
                ()=>{},
                ()=>{
                    fnOnError(null);
                },
                ()=>{
                    fnOnSuccess();
                    this.doSearch();
                }
            )
    }



    // public goFirstTablePage()
    // {
    //     if( this.getTotalPagesCount() > 0) {
    //         this._iCurrentPageNumber = 0;
    //         this.doSearch();
    //     }
    // }
    // public goLastTablePage()
    // {
    //     if( this.getTotalPagesCount() > 0) {
    //         this._iCurrentPageNumber = this.getTotalPagesCount() - 1;
    //         this.doSearch();
    //     }
    // }

    // public getCurrentPageNumerViewOnly(){ return this._iCurrentPageNumber + 1; }
    // public getTotalPagesCount(){ return this._iTotalPagesCount}
    public getTotalRowsCount()
    {
        return this._iTotalRowsCount;
    }

    public getLatestRefreshDatetimeAsString(){
        if(Utils.isNullOrUndef(this._oLatestRefresh) == false)
        {
            return this._oLatestRefresh.format(TimingRule.DATETIME_FORMAT);
        }else{
            return "";
        }
    }

    public getCurrentRowsPerPage(){ return this._iPageSize; }


    public onPageEvent(oEvent:PageEvent)
    {
        this._iPageSize = oEvent.pageSize;
        this._iCurrentPageNumber = oEvent.pageIndex;
        this.doSearch();
    }

    public getRulesList() { return this._aoRulesList; }

    public isRulesListLoading(){ return this._bIsDataLoading; }


    public isEditButtonEnabled(){ return this._oAuthService.isLoggedUserAuthorizedRulesReport();}

    public isAutoRefreshEnabled(){ return (this._iAutoRefreshTimerIntervalId != null); }
    public getAutoRefreshIntervalInSeconds(){ return this._iAutoRefreshIntervalInSeconds; }
    public enableAutoRefresh()
    {
        this._iAutoRefreshTimerIntervalId = <any>setInterval(()=>{
            this.reloadData();
        }, this._iAutoRefreshIntervalInSeconds * 1000);
    }

    public onAutoRefreshToggleChange(oEvent:MatSlideToggleChange)
    {
        if( oEvent.checked == true){
            this.enableAutoRefresh();
        }else{
            this.disableAutoRefresh();
        }
    }

    // public getAutoRefreshToggleButtonExtraText()
    // {
    //     if(this.isAutoRefreshEnabled() == true){
    //         return " (" + this._iAutoRefreshIntervalInSeconds + "s)"
    //     }else{
    //         return "";
    //     }
    // }

    public disableAutoRefresh()
    {
        clearInterval(this._iAutoRefreshTimerIntervalId);
        this._iAutoRefreshTimerIntervalId = null;
    }

    /**
     * Open dialog to configure auto-refresh (intervall, etc)
     */
    public openAutoRefreshTimeConfigurator()
    {
        // Save state and stop the auto-refresh while edit its config
        let bWasAutoRefreshEnabled = this.isAutoRefreshEnabled();
        this.disableAutoRefresh();
        VexUtils.showPrompt("Enter new interval in seconds (enter value greater or equals 5 seconds).", "", "Auto-refresh interval")
            .then((oValue)=>{
                if( (Utils.isNumber(oValue) == true || Utils.isNumeric(oValue) == true ) && parseInt(oValue) > 5)
                {
                    this._iAutoRefreshIntervalInSeconds = parseInt(oValue);
                }
                else{
                    VexUtils.showErrorAlert("Error while updating auto-refresh interval value. Please enter a number greater or equals thant 5 seconds.")
                }

                if( bWasAutoRefreshEnabled == true) {
                    this.enableAutoRefresh();
                }
            })
            .catch(()=>{
                if( bWasAutoRefreshEnabled == true) {
                    this.enableAutoRefresh();
                }
            });
    }

    // /**
    //  * Open dialog to configure pagination (rows per page, etc)
    //  */
    // public openPaginationConfigurator()
    // {
    //     VexUtils.showPrompt("Enter the amount of rows to display in each page:", "", "Rows per page")
    //         .then((oValue)=>{
    //             if( (Utils.isNumber(oValue) == true || Utils.isNumeric(oValue) == true ) && parseInt(oValue) > 0)
    //             {
    //                 this._iPageSize = parseInt(oValue);
    //                 this.doSearch();
    //             }
    //             else{
    //                 VexUtils.showErrorAlert("Error while updating the amount of rows to display in each page. Please enter a number greater or equals thant 0.")
    //             }
    //         })
    //         .catch(()=>{
    //             this._iPageSize = ReportOverviewSetting.createDefault().rowsPerPage;
    //         });
    // }
    ///</editor-fold>
}