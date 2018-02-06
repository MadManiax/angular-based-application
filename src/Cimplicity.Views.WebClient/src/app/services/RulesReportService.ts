///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/Rule.ts"/>
import { Injectable } from '@angular/core';
import Filter = ge.cim.models.Filter;
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import {Observable} from "rxjs/Observable";
import Rule = ge.cim.models.Rule;
import {of} from "rxjs/observable/of";

@Injectable()
export class RulesReportService
{

    constructor()
    {

    }


    public getRules(aoFilters : Filter[]) : Observable<Rule[]>
    {
        let aoRulesList: Rule[] = [] ;


        setTimeout(()=>{
            for (let i = 0; i < 10; i++)
            {
                let fRand = Math.random();
                if(fRand < 0.33){ aoRulesList.push(new TimingRule().fillWithDummyData()); }
                else if(fRand < 0.66){ aoRulesList.push(new CounterRule().fillWithDummyData()); }
                else{aoRulesList.push(new EventRule().fillWithDummyData());}
            }
        }, 2000);
        return of(aoRulesList);
    }

}