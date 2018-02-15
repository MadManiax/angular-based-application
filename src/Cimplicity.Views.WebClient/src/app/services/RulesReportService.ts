///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/Rule.ts"/>
///<reference path="../../interfaces/IRestRulesReport.ts"/>
import { Injectable } from '@angular/core';
import Filter = ge.cim.models.Filter;
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import {Observable} from "rxjs/Observable";
import Rule = ge.cim.models.Rule;
import {of} from "rxjs/observable/of";
import IRestRulesReportRequest = ge.cim.IRestRulesReportRequest;
import IRestRulesReportResponse = ge.cim.IRestRulesReportResponse;

@Injectable()
export class RulesReportService
{

    constructor(/*protected _oHtpClient: HttpClient*/)
    {

    }


    public getRules(aoParams : IRestRulesReportRequest) : Observable<IRestRulesReportResponse>
    {
        //let aoRulesList: Rule[] = [] ;

        let oResponse : IRestRulesReportResponse = {
            TotalPages : 0,
            CurrentPage : aoParams.CurrentPage,
            RowsPerPage : aoParams.RowsPerPage,
            RulesList : []
        }

        let oObserver = new Observable<IRestRulesReportResponse>(observer => {
            // Immediately return an empty array just to avoid
            // undefined or null array
            observer.next(oResponse);

            // Then perform request
            setTimeout(()=>{

                oResponse.TotalPages = 10;
                for (let i = 0; i < aoParams.RowsPerPage; i++)
                {
                    let fRand = Math.random();
                    if(fRand < 0.33){ oResponse.RulesList.push(new TimingRule().fillWithDummyData()); }
                    else if(fRand < 0.66){ oResponse.RulesList.push(new CounterRule().fillWithDummyData()); }
                    else{oResponse.RulesList.push(new EventRule().fillWithDummyData());}
                }
                // set observer value and set it as 'completed'
                observer.next(oResponse);
                observer.complete();
            }, 1000);
        })
        return oObserver;
    }


    public saveRule(oRule:Rule) : Promise<boolean>
    {
        let oPromise = new Promise<boolean>((resolve, reject)=>{
            setTimeout(()=>{
                resolve(true);
            }, 1000);
        });

        return oPromise;
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