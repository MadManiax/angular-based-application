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

        let oObserver = new Observable<Rule[]>(observer => {
            // Immediately return an empty array just to avoid
            // undefined or null array
            observer.next(aoRulesList);

            // Then perform request
            setTimeout(()=>{
                for (let i = 0; i < 10; i++)
                {
                    let fRand = Math.random();
                    if(fRand < 0.33){ aoRulesList.push(new TimingRule().fillWithDummyData()); }
                    else if(fRand < 0.66){ aoRulesList.push(new CounterRule().fillWithDummyData()); }
                    else{aoRulesList.push(new EventRule().fillWithDummyData());}
                }
                // set observer value and set it as 'completed'
                observer.next(aoRulesList);
                observer.complete();
            }, 5000);
        })
        return oObserver;
    }

    // public getRules(aoFilters : Filter[])
    // {
    //     let oPromise = new Promise((resolve, reject) => {
    //         if(xxx) {
    //             resolve('ok');
    //         } else {
    //             reject('error');
    //         }
    //     })
    //
    //     return oPromise;
    // }

}