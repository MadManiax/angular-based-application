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

import { Component, OnInit } from '@angular/core';
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import * as jQuery from "jquery";
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import {RulesReportService} from "../services/RulesReportService";
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
    private _iCurrentRowsPerPage: number;
    private _iTotalRowsCount : number;
    private _iAutoRefreshIntervalId: number;
    private _oLatestRefresh : moment.Moment;
    private _iAutoRefreshIntervalInSeconds: number;
    private _bIsFiltersPanelVisible: boolean;
    private _aoSortConditions : SortCondition[];
    private _aiAvailablePageSizes : number[];


    /*
     * TIPS on Services:
     * The parameter '_oRulesReportService' simultaneously defines a private '_oRulesReportService' property
     * and identifies it as a RulesReportService injection site.
     * When Angular creates a the component, the Dependency Injection system
     * sets the service parameter to the singleton instance of the service class
     */
    constructor(
        private _oRulesReportService: RulesReportService,
        private _oAuthService : AuthService
    )
    {
        console.log('StationComponent -> constructor');
        this._iAutoRefreshIntervalId = null;
        this._iAutoRefreshIntervalInSeconds = 20;
        this._bIsFiltersPanelVisible = false;

        this.fetchConfigurationFromServer();
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
    private fetchConfigurationFromServer()
    {
        // TODO: perform a server request to get the full page config (filters, sorting, pagination size, etc.)

        // DEBUG (+)
        this._aoSortConditions = [
            new WlWtSortCondition(),
            // new SortCondition("Remaining"),
            // new SortCondition("Overflow Remaining"),
            // new SortCondition("Rule Type"),
        ]

        this.initPagination();
        // DEBUG (-)
    }



    private initPagination()
    {
        this._iCurrentRowsPerPage = 20;
        this._iCurrentPageNumber = 0;
        this._iTotalPagesCount = 0;
        this._aiAvailablePageSizes = [10, 25, 50, 100];
    }



    private doSearch()
    {
        this.closeFiltersPanel();

        this._bIsDataLoading = true;
        LoadingScreen.show();

        let oParam : IRestRulesReportRequest = {
            CurrentPage : this._iCurrentPageNumber,
            RowsPerPage : this._iCurrentRowsPerPage,
            Filters : []
        };

        let oTempResponse : IRestRulesReportResponse = null;
        this._oRulesReportService.getRules(oParam)
            .subscribe(
                (oResponse) => {
                    oTempResponse = oResponse;
                    this._aoRulesList = oResponse.RulesList;
                },
                ()=>{},
                ()=>{
                    this._iTotalPagesCount = oTempResponse.TotalPages;
                    this._iTotalRowsCount = oTempResponse.TotalRows
                    this._iCurrentPageNumber = oTempResponse.CurrentPage;
                    this._iCurrentRowsPerPage = oTempResponse.RowsPerPage;

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

    public onColumnHeaderClick(oColumn : RulesReportTableColumn)
    {
        let sCaption = oColumn.caption;
        if(sCaption == "Work Cell"){
            sCaption = "WL/WT";
        }
        let sFieldName = oColumn.caption;

        this.addSortConditionIfNotExist(new SortCondition(sFieldName, sCaption));
    }

    public reloadData()
    {
        this.initPagination();
        this.doSearch();
    }


    public onFiltersChanged(oFilters : RulesReportFiltersContainer)
    {
        console.log("Save new filters:", oFilters);
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

    public saveEditedRule(oRule : Rule)
    {
        LoadingScreen.updateMessage("Saving changes...");
        LoadingScreen.show();
        this._oRulesReportService.saveRule(oRule)
            .then(()=>{
                LoadingScreen.updateMessage("Saved succesfully, reaload data...");
                this.doSearch();
            })
    }

    // public goToPreviousTablePage(){
    //     if(this._iCurrentPageNumber > 0){
    //         this._iCurrentPageNumber--;
    //         this.doSearch();
    //     }
    //
    // }
    // public goToNextTablePage(){
    //     if(this._iCurrentPageNumber < this.getTotalPagesCount() - 1 ){
    //         this._iCurrentPageNumber++;
    //         this.doSearch();
    //     }
    // }

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

    public getCurrentRowsPerPage(){ return this._iCurrentRowsPerPage; }

    public triggerNext(oRule:Rule)
    {

    }

    public onPageEvent(oEvent:PageEvent)
    {
        this._iCurrentRowsPerPage = oEvent.pageSize;
        this._iCurrentPageNumber = oEvent.pageIndex;
        this.doSearch();
    }

    public getRulesList() { return this._aoRulesList; }

    public isRulesListLoading(){ return this._bIsDataLoading; }


    public isEditButtonEnabled(){ return this._oAuthService.isLoggedUserAuthorizedRulesReport();}

    public isAutoRefreshEnabled(){ return (this._iAutoRefreshIntervalId != null); }
    public getAutoRefreshIntervalInSeconds(){ return this._iAutoRefreshIntervalInSeconds; }
    public enableAutoRefresh()
    {
        this._iAutoRefreshIntervalId = <any>setInterval(()=>{
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
        clearInterval(this._iAutoRefreshIntervalId);
        this._iAutoRefreshIntervalId = null;
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

    /**
     * Open dialog to configure pagination (rows per page, etc)
     */
    public openPaginationConfigurator()
    {
        VexUtils.showPrompt("Enter the amount of rows to display in each page:", "", "Rows per page")
            .then((oValue)=>{
                if( (Utils.isNumber(oValue) == true || Utils.isNumeric(oValue) == true ) && parseInt(oValue) > 0)
                {
                    this._iCurrentRowsPerPage = parseInt(oValue);
                    this.doSearch();
                }
                else{
                    VexUtils.showErrorAlert("Error while updating the amount of rows to display in each page. Please enter a number greater or equals thant 0.")
                }
            })
            .catch(()=>{
                this._iCurrentRowsPerPage = ReportOverviewSetting.createDefault().rowsPerPage;
            });
    }
    ///</editor-fold>
}