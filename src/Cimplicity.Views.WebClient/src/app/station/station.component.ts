///<reference path="../../../typings/index.d.ts"/>
///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/ReportOverviewSetting.ts"/>
///<reference path="../../classes/utils/Utils.ts"/>
///<reference path="../services/AuthService.ts"/>

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
    private _iAutoRefreshIntervalId: number;
    private _oLatestRefresh : moment.Moment;
    private _iAutoRefreshIntervalInSeconds: number;


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
        this._iAutoRefreshIntervalInSeconds = 5;

        this.initPagination();
    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');
        //this.enableAutoRefresh(this._iAutoRefreshIntervalInSeconds);
        //this.doSearch();
    }


    private initPagination()
    {
        this._iCurrentRowsPerPage = 20;
        this._iCurrentPageNumber = 0;
        this._iTotalPagesCount = 0;
    }

    private doSearch()
    {
        this._bIsDataLoading = true;
        LoadingScreen.show();

        let oParam : IRestRulesReportRequest = {
            CurrentPage : this._iCurrentPageNumber,
            RowsPerPage : this._iCurrentRowsPerPage,
            Filters : []
        };

        let oTempResponse = null;
        this._oRulesReportService.getRules(oParam)
            .subscribe(
                (oResponse) => {
                    oTempResponse = oResponse;
                    this._aoRulesList = oResponse.RulesList;
                },
                ()=>{},
                ()=>{
                    this._iTotalPagesCount = oTempResponse.TotalPages;
                    this._iCurrentPageNumber = oTempResponse.CurrentPage;
                    this._iCurrentRowsPerPage = oTempResponse.RowsPerPage;

                    this._bIsDataLoading = false;
                    this._oLatestRefresh = moment();
                    LoadingScreen.hide();


                }
            );
    }



    public reloadData()
    {
        this.initPagination();
        this.doSearch();
    }


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

    public goToPreviousTablePage(){
        if(this._iCurrentPageNumber > 0){
            this._iCurrentPageNumber--;
            this.doSearch();
        }

    }
    public goToNextTablePage(){
        if(this._iCurrentPageNumber < this.getTotalPagesCount() - 1 ){
            this._iCurrentPageNumber++;
            this.doSearch();
        }
    }

    public goFirstTablePage()
    {
        if( this.getTotalPagesCount() > 0) {
            this._iCurrentPageNumber = 0;
            this.doSearch();
        }
    }
    public goLastTablePage()
    {
        if( this.getTotalPagesCount() > 0) {
            this._iCurrentPageNumber = this.getTotalPagesCount() - 1;
            this.doSearch();
        }
    }

    public getCurrentPageNumerViewOnly(){ return this._iCurrentPageNumber + 1; }
    public getTotalPagesCount(){ return this._iTotalPagesCount}

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

    public disableAutoRefresh()
    {
        clearInterval(this._iAutoRefreshIntervalId);
        this._iAutoRefreshIntervalId = null;
    }

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


    public openPaginationConfigurator()
    {
        VexUtils.showPrompt("Enter the amount of rows to display in each page:", "", "Rows per page")
            .then((oValue)=>{
                if( (Utils.isNumber(oValue) == true || Utils.isNumeric(oValue) == true ) && parseInt(oValue) > 0)
                {
                    this._iCurrentRowsPerPage = parseInt(oValue);
                }
                else{
                    VexUtils.showErrorAlert("Error while updating the amount of rows to display in each page. Please enter a number greater or equals thant 0.")
                }
            })
            .catch(()=>{
                this._iCurrentRowsPerPage = ReportOverviewSetting.createDefault().rowsPerPage;
            });
    }
}