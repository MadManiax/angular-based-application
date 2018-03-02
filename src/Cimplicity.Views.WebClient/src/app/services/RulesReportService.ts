///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/Rule.ts"/>
///<reference path="../../interfaces/IRestRulesReport.ts"/>
///<reference path="../../classes/utils/Utils.ts"/>
///<reference path="../../dummy_data/report_dummy.ts"/>
import { Injectable } from '@angular/core';
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import {Observable} from "rxjs/Observable";
import Rule = ge.cim.models.Rule;
import IRestRulesReportRequest = ge.cim.IRestRulesReportRequest;
import IRestRulesReportResponse = ge.cim.IRestRulesReportResponse;
import Utils = jsutils.Utils;
import DummyReport = ge.cim.dummydata.DUMMY_REPORT;
import DUMMY_REPORT_FULL_RESPONSE = ge.cim.dummydata.DUMMY_REPORT_FULL_RESPONSE;
import IBaseServerResponse = ge.cim.IBaseServerResponse;

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

                // Generate fake data
                // splitting them into pages
                let iPage = 0;
                let iCounter = 0;

                // let oPages = [];
                // for (let i = 0; i < 100; i++)
                // {
                //     let oRule = null;
                //     let fRand = Math.random();
                //     if(fRand < 0.33){ oRule = new TimingRule().fillWithDummyData(); }
                //     else if(fRand < 0.66){ oRule = new CounterRule().fillWithDummyData(); }
                //     else{oRule = new EventRule().fillWithDummyData();}
                //
                //     if(Utils.isNullOrUndef(oPages[iPage]) == true)
                //     {
                //         oPages[iPage] = [];
                //     }
                //
                //     oPages[iPage].push(oRule);
                //
                //     // If current page has reached limit, add new page
                //     if(oPages[iPage].length == aoParams.RowsPerPage)
                //     {
                //         iCounter = 0;
                //         iPage++;
                //     }
                //
                // }
                // console.debug(JSON.stringify(oPages));

                // OLD DUMMY JSON
                // let oPages = DummyReport;
                // oResponse.TotalPages = oPages.length;
                // if( aoParams.CurrentPage < oResponse.TotalPages )
                // {
                //     let oPageInJson : any = oPages[aoParams.CurrentPage];
                //
                //     for(let i = 0; i < oPageInJson.length; i++)
                //     {
                //         let oRuleInJson = oPageInJson[i];
                //         if( EventRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new EventRule().fromJSON(oRuleInJson) ); }
                //         if( TimingRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new TimingRule().fromJSON(oRuleInJson) ); }
                //         if( CounterRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new CounterRule().fromJSON(oRuleInJson) ); }
                //     }
                // }


                // NEW DUMMY JSON (like the real one)
                let oReportResponse : IBaseServerResponse = DUMMY_REPORT_FULL_RESPONSE
                let oPageInJson : any = oReportResponse.Result;
                for(let i = 0; i < oPageInJson.length; i++)
                {
                    let oRuleInJson = oPageInJson[i];
                    if( EventRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new EventRule().fromJSON(oRuleInJson) ); }
                    if( TimingRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new TimingRule().fromJSON(oRuleInJson) ); }
                    if( CounterRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.RulesList.push( new CounterRule().fromJSON(oRuleInJson) ); }
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