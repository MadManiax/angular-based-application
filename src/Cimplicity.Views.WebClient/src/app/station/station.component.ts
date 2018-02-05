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

@Component({
    selector: 'station',
    templateUrl: 'app/station/station.template.html'
})
export class StationComponent implements OnInit
{
    private _aoRulesList: ge.cim.models.Rule[];

    private _oModal : JQuery;
    private _oRuleToEdit : Rule;


    constructor()
    {
        console.log('StationComponent -> constructor');

        this._aoRulesList = [];
        for (let i = 0; i < 10; i++)
        {
            let fRand = Math.random();
            if(fRand < 0.33){ this._aoRulesList.push(new TimingRule().fillWithDummyData()); }
            else if(fRand < 0.66){ this._aoRulesList.push(new CounterRule().fillWithDummyData()); }
            else{this._aoRulesList.push(new EventRule().fillWithDummyData());}
        }

    }

    ngOnInit() {
        console.log('StationComponent -> ngOnInit');
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
}