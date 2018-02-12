///<reference path="../../../typings/index.d.ts"/>
///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
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

        this.initPagination();
    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');

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
                    LoadingScreen.hide();
                }
            );
    }



    public reloadData()
    {
        this.initPagination();
        this.doSearch();
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
    public getCurrentRowsPerPage(){ return this._iCurrentRowsPerPage; }

    public triggerNext(oRule:Rule)
    {

    }

    public getRulesList() { return this._aoRulesList; }

    public isRulesListLoading(){ return this._bIsDataLoading; }


    public isEditButtonEnabled(){ return this._oAuthService.isLoggedUserAuthorizedRulesReport();}
}