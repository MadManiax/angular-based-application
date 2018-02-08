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

@Component({
    selector: 'station',
    templateUrl: 'app/station/station.template.html'
})
export class StationComponent implements OnInit
{
    private _aoRulesList: ge.cim.models.Rule[];


    private _bIsDataLoading : boolean;


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

    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');

        this.doSearch();
    }

    public doSearch()
    {
        this._bIsDataLoading = true;
        LoadingScreen.show();
        this._oRulesReportService.getRules([])
            .subscribe(
                (aoRulesList) => {
                    this._aoRulesList = aoRulesList;
                },
                ()=>{},
                ()=>{
                    this._bIsDataLoading = false;
                    LoadingScreen.hide();
                }
            );
    }



    public getRulesList() { return this._aoRulesList; }

    public isRulesListLoading(){ return this._bIsDataLoading; }


    public isEditButtonEnabled(){ return this._oAuthService.isLoggedUserAuthorizedRulesReport();}
}