///<reference path="../../../typings/index.d.ts"/>
///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/utils/Utils.ts"/>

import { Component, OnInit } from '@angular/core';
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import * as jQuery from "jquery";
import Utils = jsutils.Utils;
import Rule = ge.cim.models.Rule;
import {RulesReportService} from "../services/RulesReportService";
import {LoadingScreen, LoadingScreenComponent} from "../components/loading_screen/LoadingScreenComponent";

@Component({
    selector: 'station',
    templateUrl: 'app/station/station.template.html'
})
export class StationComponent implements OnInit
{
    private _aoRulesList: ge.cim.models.Rule[];

    private _oModal : JQuery;
    private _oRuleToEdit : Rule;

    private _bIsDataLoading : boolean;


    /*
     * TIPS on Services:
     * The parameter '_oRulesReportService' simultaneously defines a private '_oRulesReportService' property
     * and identifies it as a RulesReportService injection site.
     * When Angular creates a the component, the Dependency Injection system
     * sets the service parameter to the singleton instance of the service class
     */
    constructor(
        private _oRulesReportService: RulesReportService
    )
    {
        console.log('StationComponent -> constructor');

    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');

        this._bIsDataLoading = true;
        LoadingScreen.show();
        this._oRulesReportService.getRules([])
            .subscribe(
            (aoRulesList) => {
                this._aoRulesList = aoRulesList;

                if( this._aoRulesList.length > 0)
                {
                    LoadingScreen.hide();
                }
            },
            ()=>{},
        ()=>{
                this._bIsDataLoading = false;

            }
        );
        console.log('StationComponent -> after request to the server');
    }


    public openEditRuleModal(oRule : Rule)
    {
        this._oRuleToEdit = oRule;

        if( Utils.isNullOrUndef(this._oModal) == true)
        {
            this._oModal = $("#editRuleModal");
        }
        this._oModal.modal('show');
    }

    public getRulesList() { return this._aoRulesList; }
    public getRuleToEdit(){ return this._oRuleToEdit; }
    public isRulesListLoading(){ return this._bIsDataLoading; }
    public showEmptyDataBox(): boolean{
        return (Utils.isNullOrUndef(this._aoRulesList) == true || this._aoRulesList.length == 0)
    } ;
}